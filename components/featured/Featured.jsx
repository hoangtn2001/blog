import Image from 'next/image';
import styles from './featured.module.css';

const Featured = () => {
  const {container, title, post, imgContainer, textContainer, postTitle, postDesc, postButton, bold} = styles;
  return (
    <div className={container}>
      <h1 className={title}>
     <b className={bold}> Hey, Your blog is here!</b> So share your story and creative ideas
      </h1>
      <div className={post}>
<div className={imgContainer}>
<Image src = "/images/p1.jpeg" alt="" fill />
</div>
<div className={textContainer}>
<h2 className={postTitle}>Lorem ipsum dolor sit amet</h2>
<p className={postDesc}>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod
</p>
<button className={postButton}>Read More</button>
</div>
      </div>
    </div>
  )
}

export default Featured