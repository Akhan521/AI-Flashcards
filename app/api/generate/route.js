import { NextResponse } from "next/server";
import OpenAI from "openai";



const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or idea.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, explanations, applications, and examples.
6. Avoid overly complex or ambiguous phrasing in both the questions and answers.
7. When appropriate, use mnemonics, acronyms, or other memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information to create the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards at a time to maintain focus and clarity.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format: 
{
    "flashcards": [{
        "front": str,
        "back": str
    }]
}
`

export async function POST(req){
    const openai = new OpenAI();
    const data = await req.text();

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        response_format: {type: 'json_object'}
    })

    console.log(completion.choices[0].message.content);

    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards.flashcards);
}
