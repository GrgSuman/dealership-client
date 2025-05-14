"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Heart, History, Settings, Car } from "lucide-react";

interface AuthGuardProps {
  title?: string;
  description?: string;
}

export default function AuthGuard({
  title = "Sign in to Continue",
  description = "Create an account or sign in to access personalized features.",
}: AuthGuardProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-5xl shadow-none border-none">
        <CardHeader className="space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {title}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {description}
            </CardDescription>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Save Favorite Cars</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Keep track of your favorite vehicles and compare them easily
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Personalized Preferences</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Set your preferences for a tailored car browsing experience
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <History className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View History</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Access your browsing history and recently viewed vehicles
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Smart Recommendations</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get personalized car recommendations based on your preferences
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 pt-6">
          <Button
            onClick={() => router.push("/signin")}
            className="w-full h-11 text-base font-medium bg-green-600 hover:bg-green-700"
          >
            Sign In to Continue
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            New to The Final Group?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Create an account
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}