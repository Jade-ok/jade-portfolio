import os
import requests

access_token = os.environ["ACCESS_TOKEN"]
source_id = os.environ["STRAVA_ID"]

headers = {
    "Authorization": f"Bearer {access_token}"
}

base_url = f"https://api.fitnesssyncer.com/api/providers/sources/{source_id}/items/"

all_items = []

# 100개 + 나머지 가져오기
for offset in (0, 100):
    response = requests.get(
        base_url,
        headers=headers,
        params={"limit": 100, "offset": offset}
    )
    response.raise_for_status()

    items = response.json().get("items", [])
    all_items.extend(items)

    if len(items) < 100:
        break

runs = []
total_km = 0

for item in all_items:
    item_id = item["itemId"]

    response = requests.get(
        f"{base_url}{item_id}",
        headers=headers
    )
    response.raise_for_status()

    data = response.json()

    # 응답이 {"item": {...}} 형태인 경우 처리
    activity = data.get("item", data)

    if activity.get("fitnessSyncerActivity") == "Running":
        distance = activity.get("distanceKM", 0) or 0

        runs.append({
            "title": activity.get("title"),
            "distanceKM": distance
        })

        total_km += distance

print(f"Running activities: {len(runs)}")
print(f"Total running distance: {total_km:.2f} km")

for run in runs:
    print(f'{run["title"]}: {run["distanceKM"]:.2f} km')
