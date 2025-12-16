"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resendVerificationEmail } from "../actions/email-verification";

export default function ResendVerificationPage() {
  const [state, formAction, isPending] = useActionState(
    resendVerificationEmail,
    null
  );

  if (state?.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h1>
          <p className="text-gray-600 mb-6">
            We've sent a new verification email. Please check your inbox and click
            the verification link.
          </p>
          <Link
            href="/signin"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Resend Verification Email
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address and we'll send you a new verification link.
        </p>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{state.error}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Sending..." : "Send Verification Email"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
