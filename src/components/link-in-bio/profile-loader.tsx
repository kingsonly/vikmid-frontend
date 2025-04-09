export default function ProfileLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-800 animate-pulse mb-4"></div>
                <div className="h-6 w-40 bg-gray-800 animate-pulse mb-2 rounded"></div>
                <div className="h-4 w-24 bg-gray-800 animate-pulse mb-8 rounded"></div>

                <div className="space-y-4 w-full max-w-sm">
                    <div className="h-12 bg-gray-800 animate-pulse rounded"></div>
                    <div className="h-12 bg-gray-800 animate-pulse rounded"></div>
                    <div className="h-12 bg-gray-800 animate-pulse rounded"></div>
                </div>
            </div>
        </div>
    )
}

