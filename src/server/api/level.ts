import json from "@/assets/static/level-description.json";

interface Description {
	grade: { en: string; ja: string };
	vocabrary: { start: number; end: number };
	description: string;
}

export const correspondWith: (level: number) => Description = (
	level: number
) => {
	const key = level.toString();
	return json[key];
};
