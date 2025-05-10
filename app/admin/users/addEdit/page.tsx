"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
}

enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

export default function UserFormPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    const params = useParams()
    const isEditMode = params?.userId !== undefined

    useEffect(() => {
        if (isEditMode) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`/api/admin/users/${params.userId}`)
                    if (!response.ok) {
                        throw new Error("Failed to fetch user")
                    }
                    const data = await response.json()
                    setUser(data)
                } catch (error) {
                    console.error("Error fetching user:", error)
                    toast.error("Failed to fetch user details")
                    router.push("/admin/users")
                }
            }

            fetchUser()
        }
    }, [isEditMode, params.userId, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            role: formData.get("role"),
        }

        try {
            const url = isEditMode ? `/api/admin/users/${params.userId}` : "/api/admin/users"
            const method = isEditMode ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || (isEditMode ? "Failed to update user" : "Failed to create user"))
            }

            toast.success(isEditMode ? "User updated successfully" : "User created successfully")
            router.push("/admin/users")
        } catch (error) {
            console.error("Error:", error)
            toast.error(error instanceof Error ? error.message : (isEditMode ? "Failed to update user" : "Failed to create user"))
        } finally {
            setIsLoading(false)
        }
    }

    if (isEditMode && !user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">{isEditMode ? "Edit User" : "Add New User"}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                defaultValue={user?.firstName}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                defaultValue={user?.lastName}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user?.email}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue={user?.role} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(UserRole).map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/users")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create User")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
} 