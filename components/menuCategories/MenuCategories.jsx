import Link from "next/link";

import styles from "./menuCategories.module.css";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuCategories = async () => {
  const data = await getData();
  const {
    categoryList,
    categoryItem,
    style,
    fashion,
    food,
    travel,
    culture,
    coding,
  } = styles;

  return (
    <div className={categoryList}>
      {data?.map((item) => (
        <Link
          key={item.id}
          href={`/blog?cat=${item.slug}`}
          className={`${categoryItem} ${styles[item.slug]}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
