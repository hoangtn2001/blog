import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
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

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("POST SLUG API ERROR:", err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
