"use server";

import { auth } from "@/lib/auth";

type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function resendVerificationEmail(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return { error: "Email is required." };
    }

    await auth.api.sendVerificationEmail({
      body: {
        email,
      },
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      if (message.includes("already verified")) {
        return { error: "This email is already verified. You can sign in." };
      }
      if (message.includes("not found")) {
        return { error: "No account found with this email." };
      }
      return { error: error.message };
    }
    return { error: "Failed to send verification email. Please try again." };
  }
}
