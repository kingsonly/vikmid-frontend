import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Types for courses
interface Course {
    id: string
    slug: string
    title: string
    description: string
    image: string
    price: number
    createdAt: string
    updatedAt: string
}

interface UserProfile {
    id: string
    username: string
    displayName: string
    themeColors: string
}

// This would be replaced with your actual API call
async function getUserCourses(username: string): Promise<{ profile: UserProfile; courses: Course[] } | null> {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
        // Mock data - replace with actual API call
        return {
            profile: {
                id: "user-123",
                username: username,
                displayName: username.charAt(0).toUpperCase() + username.slice(1),
                themeColors: JSON.stringify({
                    background: "#000000",
                    text: "#ffffff",
                    accent: "#9333ea",
                }),
            },
            courses: [
                {
                    id: "course-1",
                    slug: "web-development-basics",
                    title: "Web Development Basics",
                    description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
                    image: "/placeholder.svg?height=400&width=600",
                    price: 49.99,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: "course-2",
                    slug: "advanced-react",
                    title: "Advanced React",
                    description: "Master React with advanced patterns, hooks, and state management.",
                    image: "/placeholder.svg?height=400&width=600",
                    price: 79.99,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: "course-3",
                    slug: "money",
                    title: "Money Management",
                    description: "Learn how to manage your finances and build wealth.",
                    image: "/placeholder.svg?height=400&width=600",
                    price: 29.99,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ],
        }
    } catch (error) {
        return null
    }
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    const data = await getUserCourses(params.username)

    if (!data) {
        return {
            title: "Courses Not Found",
            description: "The requested courses could not be found.",
        }
    }

    return {
        title: `${data.profile.displayName}'s Courses | VIKMID`,
        description: `Explore courses by ${data.profile.displayName}`,
        openGraph: {
            title: `${data.profile.displayName}'s Courses | VIKMID`,
            description: `Explore courses by ${data.profile.displayName}`,
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.profile.displayName}'s Courses | VIKMID`,
            description: `Explore courses by ${data.profile.displayName}`,
        },
    }
}

export default async function CoursesPage({ params }: { params: { username: string } }) {
    const data = await getUserCourses(params.username)

    if (!data) {
        notFound()
    }

    // Parse theme colors
    let themeColors = { background: "#000000", text: "#ffffff", accent: "#9333ea" }
    try {
        if (data.profile.themeColors) {
            themeColors = JSON.parse(data.profile.themeColors)
        }
    } catch (error) {
        console.error("Error parsing theme colors:", error)
    }

    return (
        <div
            className="min-h-screen p-6 flex flex-col"
            style={{ backgroundColor: themeColors.background, color: themeColors.text }}
        >
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">{data.profile.displayName}'s Courses</h1>
                <p className="text-lg opacity-80">Explore and enroll in my courses</p>
                <div className="mt-4">
                    <Button
                        asChild
                        variant="outline"
                        className="border-opacity-30 hover:bg-opacity-10"
                        style={{
                            borderColor: themeColors.text,
                            color: themeColors.text,
                            backgroundColor: "transparent",
                        }}
                    >
                        <Link href="/">Back to Bio</Link>
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.courses.map((course) => (
                    <Card
                        key={course.id}
                        className="overflow-hidden transition-transform hover:scale-105"
                        style={{
                            backgroundColor: `${themeColors.background}CC`,
                            borderColor: `${themeColors.text}30`,
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <div className="relative h-48 w-full">
                            <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                        </div>
                        <CardHeader>
                            <CardTitle style={{ color: themeColors.text }}>{course.title}</CardTitle>
                            <CardDescription style={{ color: `${themeColors.text}99` }}>${course.price.toFixed(2)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p style={{ color: `${themeColors.text}CC` }}>{course.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                asChild
                                className="w-full"
                                style={{
                                    backgroundColor: themeColors.accent,
                                    color: "#ffffff",
                                }}
                            >
                                <Link href={`/course/${course.slug}`}>View Course</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {data.courses.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl opacity-70">No courses available yet.</p>
                </div>
            )}

            <footer className="mt-auto pt-8 text-center text-sm opacity-50">
                <p>Powered by VIKMID</p>
            </footer>
        </div>
    )
}

