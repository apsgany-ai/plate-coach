import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { meal } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are PlateCoach, an AI nutritionist for South Asian meals.
Return the analysis ONLY in this exact structured format, no markdown, no asterisks:

Calories: ~XXX kcal
Carbohydrates: XXg
Protein: XXg
Fat: XXg
Fiber: XXg

Glucose Impact
- (brief summary)

Glycemic Index and Glycemic Load
- Glycemic Index: ...
- Glycemic Load: ...
- Interpretation: ...

Adjusted Portion Plate
- Bullet points for each adjustment

Quick Summary
- 1 short paragraph of advice.
          `,
        },
        { role: "user", content: meal },
      ],
    });

    const result = response.choices[0].message?.content || "No result received.";
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
