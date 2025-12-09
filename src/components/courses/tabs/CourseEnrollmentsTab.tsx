"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Calendar, ArrowUpRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Mock enrollment type - replace with your actual type
interface Enrollment {
    id: string
    studentId: string
    studentName: string
    studentEmail: string
    enrollmentDate: string
    progress: number
    lastActivity: string
    avatar?: string
}

interface CourseEnrollmentsTabProps {
    courseId: string
}

export default function CourseEnrollmentsTab({ courseId }: CourseEnrollmentsTabProps) {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)

    // Fetch enrollments - replace with your actual API call
    useEffect(() => {
        // Mock API call - replace with your actual data fetching
        const fetchEnrollments = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch(`/api/courses/${courseId}/enrollments`);
                // const data = await response.json();

                // Mock data for demonstration
                const mockEnrollments: Enrollment[] = [
                    {
                        id: "enroll-1",
                        studentId: "student-1",
                        studentName: "Alex Johnson",
                        studentEmail: "alex@example.com",
                        enrollmentDate: "2023-02-15T10:30:00Z",
                        progress: 75,
                        lastActivity: "2023-04-10T14:22:00Z",
                        avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                        id: "enroll-2",
                        studentId: "student-2",
                        studentName: "Jamie Smith",
                        studentEmail: "jamie@example.com",
                        enrollmentDate: "2023-02-16T09:15:00Z",
                        progress: 45,
                        lastActivity: "2023-04-12T08:45:00Z",
                        avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                        id: "enroll-3",
                        studentId: "student-3",
                        studentName: "Taylor Wilson",
                        studentEmail: "taylor@example.com",
                        enrollmentDate: "2023-02-18T11:20:00Z",
                        progress: 90,
                        lastActivity: "2023-04-15T16:30:00Z",
                        avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                        id: "enroll-4",
                        studentId: "student-4",
                        studentName: "Morgan Lee",
                        studentEmail: "morgan@example.com",
                        enrollmentDate: "2023-02-20T14:45:00Z",
                        progress: 30,
                        lastActivity: "2023-04-08T10:15:00Z",
                        avatar: "/placeholder.svg?height=40&width=40",
                    },
                    {
                        id: "enroll-5",
                        studentId: "student-5",
                        studentName: "Casey Brown",
                        studentEmail: "casey@example.com",
                        enrollmentDate: "2023-02-22T08:30:00Z",
                        progress: 60,
                        lastActivity: "2023-04-14T09:20:00Z",
                        avatar: "/placeholder.svg?height=40&width=40",
                    },
                ]

                setEnrollments(mockEnrollments)
                setFilteredEnrollments(mockEnrollments)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching enrollments:", error)
                setLoading(false)
            }
        }

        fetchEnrollments()
    }, [courseId])

    // Filter enrollments based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredEnrollments(enrollments)
            return
        }

        const query = searchQuery.toLowerCase()
        const filtered = enrollments.filter(
            (enrollment) =>
                enrollment.studentName.toLowerCase().includes(query) || enrollment.studentEmail.toLowerCase().includes(query),
        )

        setFilteredEnrollments(filtered)
    }, [searchQuery, enrollments])

    // Format date to readable format
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    // Get progress color based on percentage
    const getProgressColor = (progress: number) => {
        if (progress >= 75) return "bg-green-500"
        if (progress >= 50) return "bg-blue-500"
        if (progress >= 25) return "bg-yellow-500"
        return "bg-red-500"
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">Student Enrollments</h3>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Enrollment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Students</p>
                            <p className="text-2xl font-bold text-white">{enrollments.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Users className="h-5 w-5 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Average Progress</p>
                            <p className="text-2xl font-bold text-white">
                                {enrollments.length > 0
                                    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
                                    : 0}
                                %
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Active This Week</p>
                            <p className="text-2xl font-bold text-white">
                                {
                                    enrollments.filter((e) => {
                                        const lastActivity = new Date(e.lastActivity)
                                        const weekAgo = new Date()
                                        weekAgo.setDate(weekAgo.getDate() - 7)
                                        return lastActivity >= weekAgo
                                    }).length
                                }
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Enrollment List */}
            {loading ? (
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-1/3 bg-gray-700" />
                                        <Skeleton className="h-3 w-1/4 bg-gray-700" />
                                    </div>
                                    <Skeleton className="h-8 w-20 bg-gray-700" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : filteredEnrollments.length === 0 ? (
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-400">
                            {searchQuery ? "No students match your search." : "No students enrolled yet."}
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-700">
                            {filteredEnrollments.map((enrollment) => (
                                <div key={enrollment.id} className="p-4 hover:bg-gray-700/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                                {enrollment.avatar ? (
                                                    <img
                                                        src={enrollment.avatar || "/placeholder.svg"}
                                                        alt={enrollment.studentName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-purple-500/20 text-purple-400 font-medium">
                                                        {enrollment.studentName.charAt(0)}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <p className="font-medium text-white">{enrollment.studentName}</p>
                                                <p className="text-sm text-gray-400">{enrollment.studentEmail}</p>
                                            </div>
                                        </div>

                                        <button className="text-purple-400 hover:text-purple-300 p-1 rounded-full hover:bg-purple-500/20 transition-colors">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-xs text-gray-400">Enrolled: {formatDate(enrollment.enrollmentDate)}</span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`absolute top-0 left-0 h-full ${getProgressColor(enrollment.progress)}`}
                                                    style={{ width: `${enrollment.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-white">{enrollment.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

// Missing components
function Users(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function Activity(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    )
}

function Clock(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
