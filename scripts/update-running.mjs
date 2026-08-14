import fs from "node:fs/promises";

const {
  FITNESSSYNCER_CLIENT_ID,
  FITNESSSYNCER_CLIENT_SECRET,
  FITNESSSYNCER_REFRESH_TOKEN,
  FITNESSSYNCER_STRAVA_SOURCE_ID,
  FITNESSSYNCER_REDIRECT_URI = "https://personal.fitnesssyncer.com/",
  RUNNING_BASELINE_TOTAL_KM = "960",
  RUNNING_BASELINE_SYNCED_KM = "122.76",
} = process.env;

if (
  !FITNESSSYNCER_CLIENT_ID ||
  !FITNESSSYNCER_CLIENT_SECRET ||
  !FITNESSSYNCER_REFRESH_TOKEN ||
  !FITNESSSYNCER_STRAVA_SOURCE_ID
) {
  throw new Error("Missing FitnessSyncer environment variables.");
}

// 1. refresh token으로 새 access token 받기
const tokenResponse = await fetch(
  "https://api.fitnesssyncer.com/api/oauth/access_token",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: FITNESSSYNCER_REFRESH_TOKEN,
      client_id: FITNESSSYNCER_CLIENT_ID,
      client_secret: FITNESSSYNCER_CLIENT_SECRET,
      redirect_uri: FITNESSSYNCER_REDIRECT_URI,
    }),
  }
);

if (!tokenResponse.ok) {
  const body = await tokenResponse.text();

  throw new Error(
    [
      `Token refresh failed: ${tokenResponse.status} ${body}`,
      "",
      "Check .env:",
      "- FITNESSSYNCER_REFRESH_TOKEN must be the refresh_token, not access_token.",
      "- FITNESSSYNCER_REDIRECT_URI must match the redirect_uri used when the token was created.",
      `- Current redirect_uri: ${FITNESSSYNCER_REDIRECT_URI}`,
    ].join("\n")
  );
}

const tokenData = await tokenResponse.json();
const accessToken = tokenData.access_token;

// FitnessSyncer가 refresh할 때 새 refresh_token을 주면
// 다음 실행을 위해 .env의 값을 자동으로 교체
if (tokenData.refresh_token) {
  let env = await fs.readFile(".env", "utf8");

  if (/^FITNESSSYNCER_REFRESH_TOKEN=/m.test(env)) {
    env = env.replace(
      /^FITNESSSYNCER_REFRESH_TOKEN=.*$/m,
      `FITNESSSYNCER_REFRESH_TOKEN=${tokenData.refresh_token}`
    );
  } else {
    env += `\nFITNESSSYNCER_REFRESH_TOKEN=${tokenData.refresh_token}\n`;
  }

  await fs.writeFile(".env", env);
}

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

const baseUrl =
  `https://api.fitnesssyncer.com/api/providers/sources/` +
  `${FITNESSSYNCER_STRAVA_SOURCE_ID}/items/`;

// 2. Strava activity 목록 전부 가져오기
const items = [];

for (let offset = 0; ; offset += 100) {
  const response = await fetch(
    `${baseUrl}?limit=100&offset=${offset}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(
      `Activity list failed: ${response.status} ${await response.text()}`
    );
  }

  const data = await response.json();
  const page = data.items ?? [];

  items.push(...page);

  if (page.length < 100) {
    break;
  }
}

// 3. 각 activity 상세 데이터를 읽어서 Running만 합산
let totalKm = 0;
let totalDurationSeconds = 0;
let runCount = 0;
const runs = [];

for (const item of items) {
  const response = await fetch(
    `${baseUrl}${item.itemId}`,
    { headers }
  );

  if (!response.ok) {
    console.warn(`Skipping activity ${item.itemId}: ${response.status}`);
    continue;
  }

  const data = await response.json();
  const activity = data.item ?? data;

  if (activity.fitnessSyncerActivity === "Running") {
    const distanceKm = Number(activity.distanceKM ?? 0);
    const durationSeconds = Number(activity.duration ?? 0);
    const paceMinPerKm =
      Number(activity.pace) ||
      (distanceKm > 0 && durationSeconds > 0 ? durationSeconds / 60 / distanceKm : 0);

    totalKm += distanceKm;
    totalDurationSeconds += durationSeconds;
    runCount += 1;

    runs.push({
      id: item.itemId,
      title: activity.title ?? "Run",
      distanceKm,
      durationSeconds,
      paceMinPerKm: Number(paceMinPerKm.toFixed(2)),
      date: activity.date ?? null,
    });
  }
}

// 4. Astro에서 사용할 JSON 만들기
const baselineTotalKm = Number(RUNNING_BASELINE_TOTAL_KM);
const baselineSyncedKm = Number(RUNNING_BASELINE_SYNCED_KM);
const syncedKm = Number(totalKm.toFixed(2));
const sinceBaselineKm = Number((syncedKm - baselineSyncedKm).toFixed(2));
const averagePaceMinPerKm =
  totalKm > 0 && totalDurationSeconds > 0
    ? Number((totalDurationSeconds / 60 / totalKm).toFixed(2))
    : 0;

if (!Number.isFinite(baselineTotalKm)) {
  throw new Error("RUNNING_BASELINE_TOTAL_KM must be a number.");
}

if (!Number.isFinite(baselineSyncedKm)) {
  throw new Error("RUNNING_BASELINE_SYNCED_KM must be a number.");
}

const output = {
  baselineTotalKm,
  baselineSyncedKm,
  syncedKm,
  sinceBaselineKm,
  totalKm: Number((baselineTotalKm + sinceBaselineKm).toFixed(2)),
  runCount,
  averagePaceMinPerKm,
  totalDurationSeconds,
  source: "FitnessSyncer",
  updatedAt: new Date().toISOString(),
  runs,
};

await fs.mkdir("src/data", { recursive: true });

await fs.writeFile(
  "src/data/running.json",
  JSON.stringify(output, null, 2)
);

console.log(`Running activities: ${runCount}`);
console.log(`Synced running distance: ${syncedKm.toFixed(2)} km`);
console.log(`Average pace: ${averagePaceMinPerKm.toFixed(2)} min/km`);
console.log(`Displayed total distance: ${output.totalKm.toFixed(2)} km`);
console.log("Saved: src/data/running.json");
