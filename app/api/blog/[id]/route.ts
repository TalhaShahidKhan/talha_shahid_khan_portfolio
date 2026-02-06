import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id: string = (await params).id;
  const body = await request.json();
  try {
    const dataUpdate = await prisma.post.updateMany({
      where: { id },

      data: { ...body },
    });
    if (dataUpdate) {
      return NextResponse.json({
        message: "Post updated",
      });
    }
    return NextResponse.json({
      message: "Failed to update post",
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id: string = (await params).id;
  try {
    const deleteData = await prisma.post.delete({ where: { id } });
    if (deleteData) {
      return NextResponse.json({
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message });
  }
}
