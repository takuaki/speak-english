import apiClient from "../index"

export namespace Questions{
	export interface Response{
		source: string,answer:string, words:string[]
	}
}

//THIS IS TEST METHOD
export const getQuestions:()=> Questions.Response[] = ()=>{
	const quentions:Questions.Response[] = [
		{
			source:'私の兄はバスで帰宅します',answer:"My brother gets home by bus",words:['brother','bus']
		},
		{
			source:'私の妹はアメリカの歴史について知りません。',answer:'My sister doesn\'t know about American history',
			words:['know','history']
		},
		{
			source:"マイクは時々ユミと話をします。",answer: 'Mike sometimes talks with Yumi.',
			words:['sometimes','talks']
		},
		{
			source:'私のカメラはどこですか。',answer:'Where is my camera?',
			words:['Where'],
		},
		{
			source: 'あなた達は金曜日の午後に何を勉強しますか',answer:'What do you study on Friday afternoon?',
			words:['study','Friday']
		}
	]
	return  quentions
}

