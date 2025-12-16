"use client";

import { useActionState } from "react";

type ActionState = {
  error?: string;
  success?: boolean;
} | null;

interface AuthFormProps {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  type: "signup" | "signin";
}

export function AuthForm({ action, type }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-md">
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

      {type === "signup" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending
          ? type === "signup"
            ? "Creating account..."
            : "Signing in..."
          : type === "signup"
          ? "Create account"
          : "Sign in"}
      </button>
    </form>
  );
}
