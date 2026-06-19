"use client";

import { useAuth } from "@clerk/nextjs";
import { Token } from "@clerk/nextjs/server";

export default function TestPage() {
  const { getToken } = useAuth();

  const showToken = async () => {
   const token = await getToken();
 console.log(token);
    console.log(token);
    alert("Token printed in browser console");
  };

  return (
    <div>
      <button onClick={showToken}>Get Clerk Token</button>
    </div>
  );
}
