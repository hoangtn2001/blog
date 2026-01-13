import MenuCategories from "../menuCategories/MenuCategories";
import MenuPosts from "../menuPosts/MenuPosts";
import styles from "./menu.module.css";

const Menu = () => {
  const { container, subtitle, title } = styles;
  return (
    <div className={container}>
      <h2 className={subtitle}>{"What's hot"}</h2>
      <h1 className={title}>Most Popular</h1>
      <MenuPosts withImage={false} />
      <h2 className={subtitle}>Discover by topic</h2>
      <h1 className={title}>Categories</h1>
      <MenuCategories />
      <h2 className={subtitle}>Chosen by the editor</h2>
      <h1 className={title}>Editors Pick</h1>
      <MenuPosts withImage={true} />
    </div>
  );
};

export default Menu;
