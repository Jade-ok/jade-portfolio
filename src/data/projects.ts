export interface Project {
	slug: string;
	title: string;
	year: string;
	statusLabel: string;
	eyebrow: string;
	meta: string;
	desc: string;
	tech: string[];
	coverImage?: string;
	featured?: boolean;
	href: string;
	detail: {
		kicker: string;
		lede: string;
		stats: { label: string; value: string }[];
		narrative: { label: string; title: string; body: string }[];
		links: { label: string; href: string }[];
	};
}

export const projects: Project[] = [
	{
		slug: "ai-mock-interview-coach",
		title: "AI Mock Interview Coach",
		year: "Aug 2026",
		statusLabel: "1st Place · CIC × AWS Hackathon",
		eyebrow: "Hackathon",
		meta: "Hackathon · 2026",
		desc: "Speech-to-speech interview practice powered by Amazon Nova 2 Sonic, built in a team of five. Proposed a three-agent architecture and owned the Evaluator - prompt, schema, and scoring logic - as an AWS Lambda service on Bedrock.",
		tech: ["Bedrock", "AWS Lambda", "FastAPI", "React"],
		coverImage: "/project-img/mock-interview-coach/thumbnail.png",
		featured: true,
		href: "/projects/ai-mock-interview-coach",
		detail: {
			kicker: "Hackathon · UBC Cloud Innovation Centre × AWS · 2026",
			lede: "Speech-to-speech interview prep app powered by Amazon Nova 2 Sonic, coordinating three AI agents to run a live hands-free voice interview and generate a structured feedback report.",
			stats: [
				{
					label: "My Role",
					value: "Evaluator agent - prompt, scoring logic, AWS Lambda + feedback frontend",
				},
				{ label: "Built With", value: "Kiro spec-driven workflow" },
				{ label: "Team", value: "5" },
			],
			narrative: [
				{
					label: "01 · Problem",
					title: "Interview prep has no real feedback loop",
					body: "Mock interviews are hard to practice alone - there's no one to run the interview hands-free or score the answers against the actual job description.",
				},
				{
					label: "02 · Build",
					title: "Three agents, one voice interview",
					body: "An Analyst agent (GPT OSS 120B) reads the resume and job description; an Interviewer agent (Amazon Nova 2 Sonic on Bedrock AgentCore) runs the live voice interview; an Evaluator agent (GPT OSS 120B) scores answers and writes the feedback report. I built the Evaluator as a Lambda function invoking Bedrock, plus the feedback frontend.",
				},
				{
					label: "03 · Result",
					title: "Shipped, still improving turn-taking",
					body: "The team's hackathon ideas and AWS ReachBack Kiro training came together into a working app. The hardest remaining problem is voice turn-taking - next up is a judge agent that verifies feedback before it reaches the user.",
				},
			],
			links: [],
		},
	},
	{
		slug: "football-scouter",
		title: "AI Football Scout",
		year: "2026-",
		statusLabel: "In Progress",
		eyebrow: "Side",
		meta: "Side · 2026-",
		desc: "EPL scouting assistant on an Orchestrator-Worker LLM pipeline, with a dual judge layer verifying every number.",
		tech: ["Gemini", "pandas"],
		href: "/projects/football-scouter",
		detail: {
			kicker: "Side Project · In Progress · Jun 2026 -",
			lede: "AI scouting assistant for EPL player evaluation, answering player-stat questions with an Orchestrator/Worker LLM pipeline and verifying every answer against source data before it reaches the user.",
			stats: [
				{ label: "My Role", value: "Solo - pipeline design, judge verification layer" },
				{ label: "Stack", value: "Python, Gemini 2.5 Flash, SQLite, pandas" },
				{ label: "Status", value: "In Progress" },
			],
			narrative: [
				{
					label: "01 · Problem",
					title: "LLM stat answers aren't trustworthy by default",
					body: "Asking an LLM a player-stat question is easy; trusting the number it returns is not - models hallucinate stats and reasoning that sound plausible but aren't backed by the source data.",
				},
				{
					label: "02 · Build",
					title: "Orchestrator/Worker pipeline, dual judge",
					body: "An Orchestrator routes stat questions to Worker LLM calls on Gemini 2.5 Flash. Answers pass through a dual verification layer: a deterministic numeric checker (pure code, zero LLM cost) and a structured-output LLM judge that catches unsupported numbers and reasoning and retries failed answers.",
				},
				{
					label: "03 · Result",
					title: "In progress",
					body: "Currently building out the verification layer and expanding coverage across EPL player stat questions.",
				},
			],
			links: [],
		},
	},
	{
		slug: "prairiecalendar",
		title: "PrairieCalendar",
		year: "2025-",
		statusLabel: "Shipped · 29 Users",
		eyebrow: "Side",
		meta: "Side · 2025-",
		desc: "Chrome extension exporting PrairieTest exam schedules to Google Calendar and ICS.",
		tech: ["Chrome Ext", "OAuth 2.0"],
		coverImage: "/project-img/prairiecalendar-img/thumbnail.png",
		href: "/projects/prairiecalendar",
		detail: {
			kicker: "Side Project · Live in the Chrome Web Store · 2025-",
			lede: "Chrome Extension exporting PrairieTest exam schedules to Google Calendar & ICS. Live in the Web Store, serving 29 active users.",
			stats: [
				{ label: "My Role", value: "Solo - extension, sync logic, Web Store listing" },
				{ label: "Users", value: "29" },
				{ label: "Status", value: "Live" },
			],
			narrative: [
				{
					label: "01 · Problem",
					title: "Exam schedules trapped in a portal",
					body: "PrairieTest lists exam times in its own dashboard with no calendar export, so students copy dates by hand and miss updates when a slot changes.",
				},
				{
					label: "02 · Build",
					title: "One-click export",
					body: "A Chrome extension reads the PrairieTest schedule and exports it to Google Calendar via the GCal API, or as a downloadable ICS file for any other calendar app.",
				},
				{
					label: "03 · Result",
					title: "29 active users",
					body: "Shipped to the Chrome Web Store and in active use by 29 students, with an official endorsement from a UBC facility director in progress.",
				},
			],
			links: [{ label: "GitHub ↗", href: "#" }],
		},
	},
	{
		slug: "smart-home-database",
		title: "Smart Home Database",
		year: "2026",
		statusLabel: "Academic",
		eyebrow: "Academic",
		meta: "Academic · 2026",
		desc: "3NF-normalized schema of 20+ tables with Node.js/Oracle REST endpoints.",
		tech: ["Oracle", "Node.js"],
		coverImage: "/project-img/smart-home-database/er-diagram.png",
		href: "/projects/smart-home-database",
		detail: {
			kicker: "Academic Project · 2026",
			lede: "3NF-normalized relational schema across 20+ tables, with Node.js/Oracle REST endpoints supporting CRUD, aggregation, division & multi-table joins.",
			stats: [
				{ label: "My Role", value: "Schema design, REST API, query layer" },
				{ label: "Tables", value: "20+" },
				{ label: "Stack", value: "Oracle, Node.js" },
			],
			narrative: [
				{
					label: "01 · Problem",
					title: "A smart home has a lot of state",
					body: "Devices, rooms, residents, schedules, and usage logs all reference each other - a flat schema either duplicates data or can't answer real queries.",
				},
				{
					label: "02 · Build",
					title: "3NF schema, REST layer",
					body: "Designed a 3NF-normalized schema across 20+ tables in Oracle, then built Node.js REST endpoints for CRUD plus relational algebra operations - aggregation, division, multi-table joins.",
				},
				{
					label: "03 · Result",
					title: "Course project",
					body: "The schema and API held up under every query the course threw at it, including relational-division queries that break naively normalized designs.",
				},
			],
			links: [{ label: "GitHub ↗", href: "#" }],
		},
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
