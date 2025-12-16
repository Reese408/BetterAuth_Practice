import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-col items-center gap-8 p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Better Auth
          </h1>
          <p className="text-gray-600">
            A complete authentication system for Next.js
          </p>
        </div>

        {session ? (
          <div className="w-full space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 text-center">
                Signed in as <span className="font-semibold">{session.user.email}</span>
              </p>
            </div>
            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-3">
            <Link
              href="/signin"
              className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full px-6 py-3 bg-white text-blue-600 text-center rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Create Account
            </Link>
          </div>
        )}

        <div className="text-center text-sm text-gray-500">
          <p>Built with Better Auth + Prisma + PostgreSQL</p>
        </div>
      </main>
    </div>
  );
}
