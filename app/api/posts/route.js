import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
// GET POSTS
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const cat = searchParams.get("cat");
    const POST_PER_PAGE = 2;

    const where = {
      ...(cat && { catSlug: cat }),
    };

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where,
        include: {
          cat: true, // optional
          //   user: true, // optional
        },
      }),
      prisma.post.count({ where }),
    ]);
    return NextResponse.json({ posts, count });
  } catch (err) {
    console.error("API POSTS ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json(
  //     { message: "Not Authenticated!" },
  //     { status: 401 }
  //   );
  // }

  const body = await req.json();
  console.log(body);

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug: body.slug,
      desc: body.desc,
      img: body.img || null,
      catSlug: body.catSlug,
      userEmail: "trinhnam011a@gmail.com",
    },
  });

  return NextResponse.json(post);
};
