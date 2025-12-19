import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWorkoutStats, getPersonalRecords } from "@/app/actions/workouts";
import LogoutButton from "@/components/LogoutButton";
import { User, Calendar, TrendingUp, Award } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  // Fetch user stats
  const statsResult = await getWorkoutStats();
  const stats = statsResult.success ? statsResult.data : null;

  const recordsResult = await getPersonalRecords();
  const records = recordsResult.success ? recordsResult.data : [];

  const joinDate = new Date(session.user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <LogoutButton />
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">
                  {session.user.name || 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">{session.user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</label>
                <p className="text-lg text-gray-900 dark:text-white mt-1">{joinDate}</p>
              </div>
            </div>

            {session.user.emailVerified && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300">Email Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Workout Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Workout Stats</h2>
          {stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalWorkouts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Workouts</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.workoutsThisWeek}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This Week</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalVolume.toLocaleString()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Volume (lbs)</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Start tracking workouts to see your stats!
              </p>
            </div>
          )}
        </div>

        {/* Personal Records */}
        {records.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Records</h2>
            <div className="space-y-3">
              {records.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{record.exercise.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(record.achievedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {record.weight} lbs
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {record.reps} reps
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
