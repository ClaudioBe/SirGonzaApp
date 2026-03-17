"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const admin=useSelector(state=>state.user.admin);
  const router=useRouter();

  useEffect(() =>{if(admin)router.push("/Perfil")},[admin, router]);
  return (
    <div className={styles.page}>
      
    </div>
  );
}
