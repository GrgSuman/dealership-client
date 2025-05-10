"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import VehicleGrid from '@/components/sections/VehicleGrid'

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "ADMIN") {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <div>
      <VehicleGrid />
    </div>
  )
}

export default Home