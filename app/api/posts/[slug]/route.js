import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  const params = await context.params;

  const { slug } = params;
  try {
    // Lấy lại post sau khi tăng views
    const post = await prisma.post.findUnique({
      where: { slug },
    });
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: { views: post.views + 1 },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
