import Image from "next/image";
import styles from "./singlePage.module.css";
import Menu from "../../../components/menu/Menu";
import Comments from "../../../components/comments/Comments";
import { headers } from "next/headers";
const getData = async (slug) => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const {
    container,
    infoContainer,
    textContainer,
    user,
    userImageContainer,
    userTextContainer,
    avatar,
    date,
    imageContainer,
    image,
    content,
    post,
    description,
    title,
    username,
    comment,
  } = styles;
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <div className={container}>
      <div className={infoContainer}>
        <div className={textContainer}>
          <h1 className={title}>{data?.title}</h1>
          <div className={user}>
            {data?.user?.image && (
              <div className={userImageContainer}>
                <Image src={data.user.image} alt="" fill className={avatar} />
              </div>
            )}
            <div className={userTextContainer}>
              <span className={username}>{data?.userEmail}</span>
              <span className={date}>{data?.createdAt}</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={imageContainer}>
            <Image src={data.img} alt="" fill className={image} />
          </div>
        )}
      </div>
      <div className={content}>
        <div className={post}>
          <div
            className={description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
