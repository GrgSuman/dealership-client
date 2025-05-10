"use client"

import { useEffect, useState } from "react";
import { prisma } from "@/config/db";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/admin/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId: string) => {
        router.push(`/admin/users/edit/${userId}`);
    };

    const handleDelete = async (userId: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    setUsers(users.filter(user => user.id !== userId));
                } else {
                    console.error("Failed to delete user");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">First Name</th>
                        <th className="py-2 px-4 border-b text-center">Last Name</th>
                        <th className="py-2 px-4 border-b text-center">Email</th>
                        <th className="py-2 px-4 border-b text-center">Role</th>
                        <th className="py-2 px-4 border-b text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b text-center">{user.firstName}</td>
                            <td className="py-2 px-4 border-b text-center">{user.lastName}</td>
                            <td className="py-2 px-4 border-b text-center">{user.email}</td>
                            <td className="py-2 px-4 border-b text-center">{user.role}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button onClick={() => handleEdit(user.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 