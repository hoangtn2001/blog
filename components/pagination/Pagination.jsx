"use client";

import styles from "./pagination.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { container, button } = styles;

  const navigate = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={container}>
      <button
        className={button}
        disabled={!hasPrev}
        onClick={() => navigate(page - 1)}
      >
        Previous
      </button>
      <button
        className={button}
        disabled={!hasNext}
        onClick={() => navigate(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
