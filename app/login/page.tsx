"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important for cookies
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to login")
            }

            // Store user data and token in localStorage
            const userData = {
                id: data.user.id,
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                token: data.token // Add token to localStorage
            }
            localStorage.setItem("user", JSON.stringify(userData))
            window.dispatchEvent(new Event("userChanged"))

            toast.success("Login successful")
            router.push("/")
        } catch (error) {
            console.error("Login error:", error)
            setError(error instanceof Error ? error.message : "Failed to login")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container max-w-md mx-auto py-12">
            <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    )
} 