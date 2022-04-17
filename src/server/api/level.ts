import { levels } from "@/assets/static/level-description.json";

function correspondWith(level: number) {
	return levels.find(({ level: l }) => l === level);
}

export { correspondWith, levels };
