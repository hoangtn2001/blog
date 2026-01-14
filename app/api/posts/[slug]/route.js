import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        user: true,
        cat: true,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.post.update({
      where: { slug },
      data: { views: post.views + 1 },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
