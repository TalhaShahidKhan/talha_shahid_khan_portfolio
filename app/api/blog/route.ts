import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.post.findMany();
    if (data) {
      return NextResponse.json({
        message: "All Posts fetched",
        status: 200,
        data: data,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: 404,
    });
  }
}

export async function POST(request: Request) {
  const postData = await request.json();
  try {
    const data = await prisma.post.create({
      data: postData,
    });
    if (data) {
      return NextResponse.json({
        message: "Post Created successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
    });
  }
}
