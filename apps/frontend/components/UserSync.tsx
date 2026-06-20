"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserSync() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    async function syncUser() {
      if (!isSignedIn) return;

      const token = await getToken();

      await fetch("http://localhost:5050/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/dashboard");
    }

    syncUser();
  }, [isSignedIn]);

  return null;
}