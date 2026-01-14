import Image from "next/image";
import Link from "next/link";

import styles from "./categoryList.module.css";
import baseUrl from "../../utils/baseUrl";

const getData = async () => {
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  const { container, title, categories, category, image } = styles;
  return (
    <div className={container}>
      <h1 className={title}>Popular Categories</h1>
      <div className={categories}>
        {data?.map((item) => (
          <Link
            key={item.id}
            href={`/blog?cat=${item.slug}`}
            className={`${category} ${styles[item.slug]}`}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
