"use client";
import { disconnect } from "process";
import styles from "./loginPage.module.css";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { container, wrapper, socialButton, loading } = styles;
  const { data, status } = useSession();
  const route = useRouter();
  if (status === "loading") {
    return <div className={loading}>Loading...</div>;
  }
  if (status === "authenticated") {
    route.push("/");
  }
  return (
    <div className={container}>
      <div className={wrapper}>
        <div className={socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div className={socialButton}>Sign in with Github</div>
        <div className={socialButton}>Sign in with Facebook</div>
      </div>
    </div>
  );
};

export default LoginPage;
