import { signOut } from "next-auth/react";

export const customSignOut = async () => {
  console.error();
    try {
      await signOut();
      // Optionally, perform additional actions after sign-out
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };