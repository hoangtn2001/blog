import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const cat = params?.cat || null;
  const { container, content } = styles;
  return (
    <div className={container}>
      <Featured />
      <CategoryList />
      <div className={content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
}
