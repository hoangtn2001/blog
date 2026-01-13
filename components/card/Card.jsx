import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  const {
    container,
    imageContainer,
    image,
    textContainer,
    detail,
    date,
    category,
    desc,
    link,
  } = styles;
  return (
    <div className={container}>
      {item.img && (
        <div className={imageContainer}>
          <Image src={item.img} alt="" fill className={image} />
        </div>
      )}
      <div className={textContainer}>
        <div className={detail}>
          <span className={date}>{item.createdAt.substring(0, 10)} - </span>
          <span className={category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div
          className={desc}
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }}
        />
        <Link href={`/posts/${item.slug}`} className={link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
