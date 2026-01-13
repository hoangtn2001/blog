import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";

const Comments = () => {
  const {
    container,
    title,
    write,
    input,
    button,
    comments,
    comment,
    user,
    image,
    userInfo,
    username,
    date,
    desc,
  } = styles;
  const status = "authenticated";
  return (
    <div className={container}>
      <h1 className={title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={write}>
          <textarea placeholder="write a comment..." className={input} />
          <button className={button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <div className={comments}>
        <div className={comment}>
          <div className={user}>
            <Image
              className={image}
              src="/images/p1.jpeg"
              alt=""
              width={32}
              height={32}
            />
          </div>
          <div className={userInfo}>
            <span className={username}>John Doe</span>
            <span className={date}>1 day ago</span>
          </div>
        </div>
        <p className={desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default Comments;
