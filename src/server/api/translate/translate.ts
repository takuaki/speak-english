import apiClient from "../index"

export namespace Questions{
	export interface Response{
		source:{
			sentence: string,
			words:string[]
		},
		answer:{
			sentence:string,
			words:string[],
			hints:string[]
		}
	}
}

export const getQuestions:()=> Questions.Response[] = ()=>{
	const quentions:Questions.Response[] = [
		{
			source:{sentence:'私の兄はバスで帰宅します',words:['兄','バス'] },
			answer:{sentence:"My brother gets home by bus",words:['brother','bus'],hints:['兄','バス']}
		},
		{
			source:{sentence:'私の妹はアメリカの歴史について知りません。',words:['知り','歴史']},
			answer:{sentence:'My sister doesn\'t know about American history',words:['know','history'],hints:['知っている','歴史']}
		},
		/*{
			source:{sentence:"マイクは時々ユミと話をします。",words:['時々','']},answer: 'Mike sometimes talks with Yumi.',
			words:['sometimes','talks']
		},
		{
			source:'私のカメラはどこですか。',answer:'Where is my camera?',
			words:['Where'],
		},
		{
			source: 'あなた達は金曜日の午後に何を勉強しますか',answer:'What do you study on Friday afternoon?',
			words:['study','Friday']
		}*/
	]
	return  quentions
}

