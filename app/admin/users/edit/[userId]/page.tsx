import { prisma } from "@/config/db";
import EditUserForm from "./EditUserForm";

export default async function EditUserPage({ params }: { params: { userId: string } }) {
    const user = await prisma.user.findUnique({
        where: { id: params.userId },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
        },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    return <EditUserForm user={user} />;
} 