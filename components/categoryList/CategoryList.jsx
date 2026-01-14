"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./categoryList.module.css";
import { useState, useEffect } from "react";
const CategoryList = () => {
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
