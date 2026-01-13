import styles from "./blogPage.module.css";
import CardList from "../../components/cardList/CardList";
import Menu from "../../components/menu/Menu";

const BlogPage = async ({ searchParams }) => {
  const { container, title, content } = styles;
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const cat = params?.cat || null;
  return (
    <div className={container}>
      <h1 className={title}>{cat} Blog</h1>
      <div className={content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
