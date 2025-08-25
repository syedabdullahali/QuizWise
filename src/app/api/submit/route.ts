import { NextResponse } from "next/server";
import { z } from "zod";
import ConnectMongoDb from "@/lib/db";
import Submission from "@/models/Submission";
import HandaleRecommendation from "@/lib/recommendation";
import { sendConfirmationEmail } from "@/lib/email";
// import { sendConfirmationEmail } from "@/lib/email";

const PayloadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  goal: z.string().optional(),
  experience: z.string().optional(),
  time: z.string().optional(),
  style: z.string().optional(),
  focus: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body)
    const parsed = PayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 })
    }
    const recommendation = HandaleRecommendation(parsed.data);
    await ConnectMongoDb();
    await sendConfirmationEmail(body.email, String(body.name), recommendation)
    const documentQuizTest = await Submission.create({ ...parsed.data, recommendation })

    return NextResponse.json({ ok: true, id: String(documentQuizTest._id), recommendation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}  