"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";


export default function UserSync() {

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
    }

    syncUser();
  }, [isSignedIn]);

  return null;
}