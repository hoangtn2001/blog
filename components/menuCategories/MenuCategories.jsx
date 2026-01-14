import Link from "next/link";

import styles from "./menuCategories.module.css";
import { headers } from "next/headers";

const getData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const res = await fetch(`${baseUrl}/api/categories`, {
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
