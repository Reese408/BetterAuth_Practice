'use client';

import { useFormState } from 'react-dom';
import { updateProfileAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, AtSign, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  username?: string | null;
};

interface ProfileEditFormProps {
  user: User;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(updateProfileAction, null);

  // Redirect to profile on success
  useEffect(() => {
    if (state?.success) {
      router.push('/profile');
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      {/* Success Message */}
      {state?.success && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-700 dark:text-green-300">
            Profile updated successfully! Redirecting...
          </p>
        </div>
      )}

      {/* Error Message */}
      {state?.error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-700 dark:text-red-300">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Name Field */}
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>Name</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name || ''}
            placeholder="Your name"
            className="w-full"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This is your public display name
          </p>
        </div>

        {/* Username Field */}
        <div>
          <Label htmlFor="username" className="flex items-center gap-2 mb-2">
            <AtSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>Username</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              @
            </span>
            <Input
              id="username"
              name="username"
              type="text"
              defaultValue={(user as any).username || ''}
              placeholder="username"
              className="w-full pl-8"
              maxLength={30}
              pattern="[a-zA-Z0-9_]+"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Letters, numbers, and underscores only
          </p>
        </div>

        {/* Bio Field */}
        <div>
          <Label htmlFor="bio" className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>Bio</span>
          </Label>
          <textarea
            id="bio"
            name="bio"
            defaultValue={(user as any).bio || ''}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
            rows={4}
            maxLength={500}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Brief description for your profile (max 500 characters)
          </p>
        </div>

        {/* Email (Read-only) */}
        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
            <span>Email</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(cannot be changed)</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={user.email}
            disabled
            className="w-full bg-gray-100 dark:bg-gray-900 cursor-not-allowed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/profile')}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
