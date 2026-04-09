import { NextResponse } from "next/server";
import { getKeyTakeaways, getWhenToSeekHelp } from "@/lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const keyTakeaways = getKeyTakeaways(slug);
    const whenToSeekHelp = getWhenToSeekHelp(slug);
    return NextResponse.json({ keyTakeaways, whenToSeekHelp });
  } catch {
    return NextResponse.json({ keyTakeaways: [], whenToSeekHelp: [] }, { status: 404 });
  }
}
