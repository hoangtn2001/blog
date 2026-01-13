"use client";
import { signOut, useSession } from "next-auth/react";
import styles from "./AuthLink.module.css";
import Link from "next/link";
import { useState } from "react";

const AuthLinks = () => {
  const { link1, link, burger, line, responsiveMenu } = styles;
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={link1}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={link1}>
            Write
          </Link>
          <span className={link1} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={burger} onClick={() => setOpen(!open)}>
        <div className={line}></div>
        <div className={line}></div>
        <div className={line}></div>
      </div>
      {open && (
        <div className={responsiveMenu}>
          <Link href="/" className={link}>
            Homepage
          </Link>
          <Link href="/about" className={link}>
            About
          </Link>
          <Link href="/contact" className={link}>
            Contact
          </Link>
          {status === "notauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
