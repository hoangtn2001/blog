import Image from "next/image";
import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ withImage }) => {
  const {
    items,
    item,
    imageContainer,
    image,
    textContainer,
    category,
    travel,
    culture,
    postTitle,
    detail,
    username,
    date,
    food,
    fashion,
  } = styles;
  return (
    <div className={items}>
      <Link href="/" className={item}>
        {withImage && (
          <div className={imageContainer}>
            <Image src="/images/p1.jpeg" alt="" fill className={image} />
          </div>
        )}
        <div className={textContainer}>
          <span className={`${category} ${travel}`}>Travel</span>
          <h3 className={postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={detail}>
            <span className={username}>John Doe</span>
            <span className={date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={item}>
        {withImage && (
          <div className={imageContainer}>
            <Image src="/images/p1.jpeg" alt="" fill className={image} />
          </div>
        )}
        <div className={textContainer}>
          <span className={`${category} ${culture}`}>Culture</span>
          <h3 className={postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={detail}>
            <span className={username}>John Doe</span>
            <span className={date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={item}>
        {withImage && (
          <div className={imageContainer}>
            <Image src="/images/p1.jpeg" alt="" fill className={image} />
          </div>
        )}
        <div className={textContainer}>
          <span className={`${category} ${food}`}>Food</span>
          <h3 className={postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={detail}>
            <span className={username}>John Doe</span>
            <span className={date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={item}>
        {withImage && (
          <div className={imageContainer}>
            <Image src="/images/p1.jpeg" alt="" fill className={image} />
          </div>
        )}
        <div className={textContainer}>
          <span className={`${category} ${fashion}`}>Fashion</span>
          <h3 className={postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={detail}>
            <span className={username}>John Doe</span>
            <span className={date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
