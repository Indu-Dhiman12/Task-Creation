"use client"
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginPage from "./auth/Registration/page";
import Dashboard from "./dashBoard/page";


export default function Home() {
  const router = useRouter();

  const token = window !== undefined && window.localStorage.getItem('token')


  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, []);

  return (
    <>
      {token ? (
        <>
          <Dashboard />
        </>
      ) : (<>
        <LoginPage />
      </>)}
    </>
  );
}
