"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function signUpAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
      return { error: "All fields are required." };
    }

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Extract meaningful error message
      const message = error.message.toLowerCase();
      if (message.includes("already exists") || message.includes("duplicate")) {
        return { error: "An account with this email already exists." };
      }
      if (message.includes("password")) {
        return { error: "Password does not meet requirements." };
      }
      if (message.includes("email")) {
        return { error: "Invalid email address." };
      }
      return { error: error.message };
    }
    return { error: "Failed to create account. Please try again." };
  }

  redirect("/check-email");
}

export async function signInAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required." };
    }

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Extract meaningful error message
      const message = error.message.toLowerCase();
      if (message.includes("not verified") || message.includes("verify your email")) {
        return { error: "Please verify your email before signing in. Check your inbox for the verification link." };
      }
      if (message.includes("invalid") || message.includes("incorrect") || message.includes("credentials")) {
        return { error: "Invalid email or password." };
      }
      if (message.includes("not found") || message.includes("no user")) {
        return { error: "No account found with this email." };
      }
      return { error: error.message };
    }
    return { error: "Failed to sign in. Please try again." };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
    await auth.api.signOut({
      headers: await headers(),
    });

    redirect("/");
}