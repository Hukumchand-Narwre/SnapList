import { NextResponse } from "next/server";
import { openai } from "@/openai";
export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  const response = await openai.createChatCompletion({
    model: "gpt-2.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "when responding welcome the user always as Mr.Hukum and welcome to Todo App! Limit the response to 200 characters",
      },
      {
        role: "user",
        content: `Hi there,Provide a summary for the following todos.count how many todos are there in each category such as To do,in progress and done, then tell the user to have productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
    temperature: 0.8,
    n: 1,
    stream: false,
  });

  const { data } = response;
  console.log(data);
  return NextResponse.json(data.choices[0].message);
}
