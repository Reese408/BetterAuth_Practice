import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-8 w-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Check Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We've sent you a verification email. Please check your inbox and click
          the verification link to activate your account.
        </p>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> The email may take a few minutes to arrive.
            Don't forget to check your spam folder!
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
