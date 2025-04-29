"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      // Add your Google authentication logic here
      // Example: await signInWithGoogle()
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="absolute top-8 left-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-green-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-green-600"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">AutoDealer</span>
        </div>
      </div>

      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Continue with Google</CardTitle>
          <CardDescription>
            Sign in to access your dealership dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              className="relative h-12"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.0362 19.252 6.3106 17.1399 5.3646 14.3003H1.3916V17.3912C3.37038 21.4434 7.48078 24.0008 12.24 24.0008Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.36451 14.3003C4.87332 12.8099 4.87332 11.1961 5.36451 9.70575V6.61481H1.39157C-0.465551 10.0056 -0.465551 14.0004 1.39157 17.3912L5.36451 14.3003Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.0999 1.0855 15.2207 -0.034466 12.24 0.000808666C7.48078 0.000808666 3.37038 2.55822 1.3916 6.61481L5.36454 9.70575C6.30637 6.86173 9.03454 4.74966 12.24 4.74966Z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Sign up with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}