import { Suspense } from "react"
import UserFormPage from "../../addEdit/page"

export default function EditUserPage({ params }: { params: { userId: string } }) {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        }>
            <UserFormPage />
        </Suspense>
    )
} 