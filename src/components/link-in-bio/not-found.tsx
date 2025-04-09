import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="text-center max-w-md">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Profile Not Found
                </h1>
                <p className="text-lg mb-8 text-gray-300">The profile you're looking for doesn't exist or has been removed.</p>
                <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                    <Link href="https://vikmid.com">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}

