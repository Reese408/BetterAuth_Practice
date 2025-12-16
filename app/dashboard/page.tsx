import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signOutAction } from "../actions/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">User Information</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">User ID:</span>{" "}
                <span className="font-mono text-blue-600">{session.user.id}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                <span className="text-gray-700">{session.user.email}</span>
              </p>
              {session.user.name && (
                <p className="text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  <span className="text-gray-700">{session.user.name}</span>
                </p>
              )}
              <p className="text-sm">
                <span className="font-medium">Email Verified:</span>{" "}
                <span className="text-gray-700">
                  {session.user.emailVerified ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Session Information</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Session ID:</span>{" "}
                <span className="font-mono text-xs text-gray-600">{session.session.id}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Expires:</span>{" "}
                <span className="text-gray-700">
                  {new Date(session.session.expiresAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <form action={signOutAction} className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
