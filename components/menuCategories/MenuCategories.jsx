"use client";
import Link from "next/link";

import styles from "./menuCategories.module.css";
import { useState, useEffect } from "react";

const MenuCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
