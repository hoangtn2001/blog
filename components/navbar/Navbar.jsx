import Image from 'next/image';
import styles from './navbar.module.css';
import Link from 'next/link';
import AuthLink from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggles/ThemeToggle';
const Navbar = () => {
    const { container,social,logo,links, link } = styles;
  return (
    <div className={container}>
      <div className={social}>
<Image src="/images/facebook.png" alt="" width={24} height={24} />
<Image src="/images/youtube.png" alt="" width={24} height={24} />
<Image src="/images/tiktok.png" alt="" width={24} height={24} />
<Image src="/images/instagram.png" alt="" width={24} height={24} />
      </div>
      <div className={logo}>
YourBlog
      </div>
      <div className={links}>
        <ThemeToggle/>
<Link href="/" className={link}>Homepage</Link>
<Link href="/about" className={link}>About</Link>
<Link href="/contact" className={link}>Contact</Link>
<AuthLink/>
      </div>
    </div>
  )
}

export default Navbar