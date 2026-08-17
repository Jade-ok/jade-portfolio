export interface ProjectDetailContent {
	slug: string;
	index: string;
	eyebrow: string;
	title: string;
	lede: string;

	problem: string[];
	howItWorks?: {
		intro?: string;
		agents: { name: string; model: string; role: string }[];
	};
	features: {
		title: string;
		body: string;
		sub?: { name: string; desc: string }[];
	}[];
	owned: string[];
	challenges?: {
		intro?: string;
		cards: { title: string; credit: string; paras: string[] }[];
	};
	next?: string[];

	images: { src: string; alt: string; caption: string; after: string }[];
	stack: { label: string; items: string[] }[];
	stackAgents?: { role: string; model: string }[];
	links: { label: string; href: string; primary?: boolean }[];
	note?: { source: string; paras: string[] };
}

export const projectDetails: Record<string, ProjectDetailContent> = {
	"ai-mock-interview-coach": {
		slug: "ai-mock-interview-coach",
		index: "/01",
		eyebrow: "1ST PLACE · UBC CLOUD INNOVATION CENTRE · AUG 2026",
		title: "AI Mock Interview Coach",
		lede: "Interview practice that talks back — a hands-free, speech-to-speech coach powered by Amazon Nova 2 Sonic, built with four teammates over one hackathon and refined ever since.",

		problem: [
			"Interview prep is either a mirror or a friend's afternoon. Neither gives you structured feedback on the answers you actually gave — what you covered, what you missed, and what to say differently next time.",
		],

		howItWorks: {
			intro: "A hands-free, speech-to-speech web app running on three agents.",
			agents: [
				{
					name: "Analyst",
					model: "OPENAI GPT OSS 120B",
					role: "Reads the resume against the job description and builds the brief the other two work from.",
				},
				{
					name: "Interviewer",
					model: "NOVA 2 SONIC · BEDROCK AGENTCORE",
					role: "Runs the live, hands-free voice interview in real time.",
				},
				{
					name: "Evaluator",
					model: "OPENAI GPT OSS 120B",
					role: "Scores the answers and generates the final feedback report.",
				},
			],
		},

		features: [
			{
				title: "Resume and job description upload",
				body: "The Analyst reads both and builds a tailored brief, so every question and every score is grounded in your actual background and the actual posting.",
			},
			{
				title: "Real-time, hands-free practice",
				body: "Speech to speech. No typing, no clicking through — the conversation runs the way a real call does.",
			},
			{
				title: "Two interview modes",
				body: "Choose how much support you want.",
				sub: [
					{ name: "Practice Mode", desc: "guidance tied to your own experiences as you answer" },
					{ name: "Live Mode", desc: "a realistic virtual interview, start to finish, no help" },
				],
			},
			{
				title: "Personalized feedback report",
				body: "Question-level scoring rather than one vague summary — plus keyword coverage showing which terms from the posting you hit and which you never mentioned, and concrete guidance on what to say differently next time.",
			},
			{
				title: "Schema-validated output",
				body: "The Evaluator returns structured JSON, so the report renders reliably instead of hoping the model formatted its prose correctly.",
			},
		],

		owned: [
			"Designed the <strong>Evaluator</strong> — its prompt, output schema, and scoring logic.",
			"Implemented it as an <strong>AWS Lambda</strong> function invoking the model through Amazon Bedrock.",
			"Built the frontend <strong>feedback report</strong> page and wired the Evaluator's schema-validated output into it.",
			"Proposed the three-agent architecture and documented it for spec-driven development in <strong>Kiro</strong>, which carried the workflow throughout.",
		],

		challenges: {
			cards: [
				{
					title: "Turn-taking",
					credit: "MINE",
					paras: [
						"The voice model would cut in and grab the turn before the candidate had finished answering. Lowering the endpointing sensitivity and reshaping the prompt got us closer.",
						"But this is a genuinely hard problem for real-time speech models, and it is still the piece I am most eager to keep improving.",
					],
				},
				{
					title: "Wiring the agents into one pipeline",
					credit: "STEPHANIE XUE",
					paras: [
						"Getting three agents to act as a single system meant designing how they pass structured data to each other, keeping the audio stream synchronized with the transcript, and holding every piece together in one working pipeline.",
						"Stephanie built this integration layer. It is the part users never see and the part the whole thing rests on — when it slips, the interview stops feeling like a conversation.",
					],
				},
			],
		},

		next: [
			"A <strong>judge agent</strong> on the feedback side. Instead of sending generated feedback straight to the user, a judge would verify it first and send it back for another pass until it meets the bar.",
			"That self-correcting design is what got me into multi-agent systems in the first place — now I want to apply it here to raise the quality of the reports.",
		],

		images: [
			{
				src: "/project-img/mock-interview-coach/upload-screen-filled.png",
				alt: "AI Mock Interview Coach upload screen with resume and job description fields filled",
				caption: "Resume and job description upload flow",
				after: "problem",
			},
			{
				src: "/project-img/mock-interview-coach/interview-practice-mode.png",
				alt: "AI Mock Interview Coach practice mode interface",
				caption: "Practice mode with guided voice interview support",
				after: "features",
			},
			{
				src: "/project-img/mock-interview-coach/feedback-report.png",
				alt: "AI Mock Interview Coach feedback report screen",
				caption: "Feedback report page",
				after: "owned",
			},
			{
				src: "/project-img/mock-interview-coach/demo-feedback-each-question.gif",
				alt: "Question-level feedback animation from AI Mock Interview Coach",
				caption: "Question-level feedback",
				after: "owned",
			},
			{
				src: "/project-img/mock-interview-coach/aws-architecture-diagram-v2.png",
				alt: "AWS architecture diagram for the AI Mock Interview Coach system",
				caption: "AWS architecture diagram",
				after: "howItWorks",
			},
			{
				src: "/project-img/mock-interview-coach/cost-control-diagram.png",
				alt: "Cost control diagram for the AI Mock Interview Coach infrastructure",
				caption: "Cost control and monitoring setup",
				after: "challenges",
			},
		],

		stack: [
			{ label: "FRONTEND", items: ["React", "TypeScript", "CSS", "Vite"] },
			{ label: "BACKEND", items: ["FastAPI", "Python"] },
			{
				label: "INFRASTRUCTURE",
				items: ["AWS Lambda", "AWS CDK", "Amazon S3", "Docker"],
			},
			{ label: "DEPLOYMENT", items: ["Amazon CloudFront", "AWS Amplify"] },
			{
				label: "MONITORING & COST",
				items: ["Amazon DynamoDB", "CloudWatch", "Amazon SNS", "AWS Budgets"],
			},
			{ label: "PROCESS", items: ["Kiro", "Spec-driven dev"] },
		],
		stackAgents: [
			{ role: "ANALYST", model: "OpenAI GPT OSS 120B" },
			{ role: "INTERVIEWER", model: "Amazon Nova 2 Sonic · Bedrock AgentCore" },
			{ role: "EVALUATOR", model: "OpenAI GPT OSS 120B" },
		],

		links: [
			{ label: "Git Repository", href: "https://github.com/Jade-ok/CIC_mock-interview-coach", primary: true },
			{ label: "Live Demo", href: "https://main.dvppliwnm6u9g.amplifyapp.com/" },
		],

		note: {
			source: "ORIGINALLY POSTED ON LINKEDIN",
			paras: [
				"We won 1st place at the UBC Cloud Innovation Centre × Amazon Web Services Hackathon.",
				"This story actually started back in May. I joined my first CIC hackathon and used AWS for the first time. We didn't win, but I really wanted to learn this and put it to use. Around then I got into multi-agent systems through Hyunuk Lim's workshop, and in July I learned Kiro at the AWS ReachBack event in Amazon's Vancouver office. Then in August, ideas I shared based on what I'd been learning became part of what our team built together, and it was really rewarding.",
				"It's called <strong>AI Mock Interview Coach</strong>, a speech-to-speech interview prep web app powered by Amazon Nova 2 Sonic. It uses three AI agents — the <strong>Analyst</strong> reads the resume and job description (OpenAI GPT OSS 120B), the <strong>Interviewer</strong> runs the live hands-free voice interview (Amazon Nova 2 Sonic on Amazon Bedrock AgentCore), and the <strong>Evaluator</strong> scores the answers and generates the final feedback report (OpenAI GPT OSS 120B).",
				"I worked mainly on the Evaluator, designing its prompt, output schema, and scoring logic, then implementing it as an AWS Lambda function that invokes the model through Amazon Bedrock. I also built the frontend feedback page. Kiro's spec-driven workflow was a big help throughout.",
				"After the hackathon, as we kept refining the app, the problem I got most drawn into was turn-taking. The voice model would cut in and grab the turn before the candidate had even finished answering. Lowering the endpointing sensitivity and reshaping the prompt got us closer, but I also learned this is a genuinely hard problem for real-time speech models, and it's still the piece I'm most eager to keep improving.",
				"Looking further ahead, I want to add a judge agent on the feedback side. Instead of sending the generated feedback straight to the user, a judge would verify it first and send it back for another pass until it meets the bar. That self-correcting, judge-based design is what first got me into multi-agent systems at Hyunuk Lim's workshop, and now I want to apply it here to raise the quality of our feedback reports.",
				"So grateful to have built this with my amazing teammates Stephanie Xue, Hoonji Choi, Jena Chang, and Jianding Bai. Thank you to our mentors Ayush Srihari, Hrishi Logani, Jovan, and Rajrupa Sanyal, who were supportive every step of the way. Thanks also to our judges Christian Castro, Katja Krohn, Liana Leung, Anjali B., and Scott M., along with the UBC Cloud Innovation Centre × AWS team for creating the space to build and learn.",
			],
		},
	},

	"football-scouter": {
		slug: "football-scouter",
		index: "/02",
		eyebrow: "SIDE PROJECT · IN PROGRESS · JUN 2026 —",
		title: "AI Football Scout",
		lede: "An EPL scouting assistant that answers player-stat questions through an Orchestrator/Worker LLM pipeline, verifying every number against source data before it reaches the user.",

		problem: [
			"Asking an LLM a player-stat question is easy; trusting the number it returns is not. Models hallucinate stats and reasoning that sound plausible but aren't backed by the source data.",
		],

		features: [
			{
				title: "Orchestrator/Worker pipeline",
				body: "An Orchestrator routes stat questions to Worker LLM calls on Gemini 2.5 Flash, keeping each worker focused on a narrow, verifiable task.",
			},
			{
				title: "Dual judge verification",
				body: "Every answer passes through a deterministic numeric checker (pure code, zero LLM cost) and a structured-output LLM judge that catches unsupported numbers and reasoning, retrying failed answers automatically.",
			},
		],

		owned: [
			"Designed and built the <strong>Orchestrator/Worker pipeline</strong> solo, end to end.",
			"Built the <strong>dual verification layer</strong> — a deterministic numeric checker plus a structured-output LLM judge.",
		],

		next: ["Currently expanding coverage across EPL player stat questions and hardening the verification layer."],

		images: [],

		stack: [{ label: "STACK", items: ["Python", "Gemini 2.5 Flash", "SQLite", "pandas"] }],

		links: [{ label: "Git Repository", href: "https://github.com/Jade-ok/AI-Football-Scout", primary: true }],
	},

	prairiecalendar: {
		slug: "prairiecalendar",
		index: "/03",
		eyebrow: "SIDE PROJECT · LIVE IN THE CHROME WEB STORE · 2025 —",
		title: "PrairieCalendar",
		lede: "A Chrome extension that exports PrairieTest exam schedules straight to Google Calendar or an ICS file, live in the Web Store with 29 active users.",

		problem: [
			"PrairieTest lists exam times in its own dashboard with no calendar export, so students copy dates by hand and miss updates when a slot changes.",
		],

		features: [
			{
				title: "One-click export",
				body: "Reads the PrairieTest schedule and exports it to Google Calendar via the GCal API, or as a downloadable ICS file for any other calendar app.",
			},
		],

		owned: [
			"Built the <strong>extension</strong>, the <strong>sync logic</strong>, and the Chrome Web Store listing solo.",
		],

		next: ["An official endorsement from a UBC facility director is in progress."],

		images: [
			{
				src: "/project-img/prairiecalendar-img/real-usage-popup-overlay.png",
				alt: "PrairieCalendar popup open over the PrairieTest page",
				caption: "Popup running directly on PrairieTest",
				after: "problem",
			},
		],

		stack: [{ label: "STACK", items: ["Chrome Extension APIs", "OAuth 2.0", "Google Calendar API"] }],

		links: [
			{ label: "Git Repository", href: "https://github.com/Jade-ok/PrairieCalendar", primary: true },
			{
				label: "CHROME WEB STORE",
				href: "https://chromewebstore.google.com/detail/prairiecalendar/jfgdhmfkgejkgliebffeohcddbohldfk",
			},
		],
	},

	"smart-home-database": {
		slug: "smart-home-database",
		index: "/04",
		eyebrow: "ACADEMIC PROJECT · 2026",
		title: "Smart Home Database",
		lede: "A 3NF-normalized relational schema across 20+ tables, with Node.js/Oracle REST endpoints supporting CRUD, aggregation, division, and multi-table joins.",

		problem: [
			"Devices, rooms, residents, schedules, and usage logs all reference each other — a flat schema either duplicates data or can't answer real queries.",
		],

		features: [
			{
				title: "3NF-normalized schema",
				body: "Designed a 3NF-normalized schema across 20+ tables in Oracle, eliminating the redundancy a flatter design would carry.",
			},
			{
				title: "REST query layer",
				body: "Built Node.js REST endpoints for CRUD plus relational algebra operations — aggregation, division, and multi-table joins.",
			},
		],

		owned: [
			"Designed the full <strong>3NF schema</strong> across 20+ tables.",
			"Built the <strong>Node.js REST API</strong> and query layer, including relational-division queries.",
		],

		images: [
			{
				src: "/project-img/smart-home-database/er-diagram.png",
				alt: "Entity relationship diagram for the Smart Home Database schema",
				caption: "ER diagram",
				after: "problem",
			},
		],

		stack: [{ label: "STACK", items: ["Oracle Database", "Node.js", "REST APIs"] }],

		links: [{ label: "Git Repository", href: "https://github.com/Jade-ok", primary: true }],
	},
};

export function getProjectDetailContent(slug: string): ProjectDetailContent | undefined {
	return projectDetails[slug];
}
