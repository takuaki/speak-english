declare module "*/translate-examples.json" {
	const sentences: {
		source: string;
		answer: string;
		question: number;
	}[];
}

declare module "*/level-description.json" {
	interface Description {
		grade: { en: string; ja: string };
		vocabrary: { start: number; end: number };
		description: string;
	}
	type Level = { [level: number]: Description };
	export default Level;
}
