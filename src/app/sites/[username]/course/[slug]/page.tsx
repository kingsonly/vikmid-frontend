import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types for course
interface CourseSection {
    id: string
    title: string
    description: string
    videoUrl?: string
    order: number
}

interface Course {
    id: string
    slug: string
    title: string
    description: string
    image: string
    price: number
    sections: CourseSection[]
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
async function getCourseDetails(
    username: string,
    slug: string,
): Promise<{ profile: UserProfile; course: Course } | null> {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
        // Mock data - replace with actual API call
        if (slug === "money") {
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
                course: {
                    id: "course-3",
                    slug: "money",
                    title: "Money Management",
                    description:
                        "Learn how to manage your finances and build wealth. This comprehensive course covers budgeting, investing, saving, and planning for the future.",
                    image: "/placeholder.svg?height=400&width=600",
                    price: 29.99,
                    sections: [
                        {
                            id: "section-1",
                            title: "Introduction to Personal Finance",
                            description: "Learn the basics of personal finance and why it matters.",
                            videoUrl: "https://example.com/video1.mp4",
                            order: 1,
                        },
                        {
                            id: "section-2",
                            title: "Budgeting Strategies",
                            description: "Master different budgeting techniques to control your spending.",
                            videoUrl: "https://example.com/video2.mp4",
                            order: 2,
                        },
                        {
                            id: "section-3",
                            title: "Investment Fundamentals",
                            description: "Understand how to start investing and growing your wealth.",
                            videoUrl: "https://example.com/video3.mp4",
                            order: 3,
                        },
                    ],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            }
        }

        // For other slugs, return a generic course
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
            course: {
                id: "course-generic",
                slug: slug,
                title: `Course: ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
                description:
                    "This is a sample course description. In a real application, this would be fetched from your database.",
                image: "/placeholder.svg?height=400&width=600",
                price: 49.99,
                sections: [
                    {
                        id: "section-1",
                        title: "Introduction",
                        description: "Getting started with the basics.",
                        videoUrl: "https://example.com/video1.mp4",
                        order: 1,
                    },
                    {
                        id: "section-2",
                        title: "Core Concepts",
                        description: "Understanding the fundamental principles.",
                        videoUrl: "https://example.com/video2.mp4",
                        order: 2,
                    },
                ],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        }
    } catch (error) {
        return null
    }
}

// Generate metadata for the page
export async function generateMetadata({
    params,
}: {
    params: { username: string; slug: string }
}): Promise<Metadata> {
    const data = await getCourseDetails(params.username, params.slug)

    if (!data) {
        return {
            title: "Course Not Found",
            description: "The requested course could not be found.",
        }
    }

    return {
        title: `${data.course.title} | ${data.profile.displayName}`,
        description: data.course.description,
        openGraph: {
            title: `${data.course.title} | ${data.profile.displayName}`,
            description: data.course.description,
            images: [data.course.image],
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.course.title} | ${data.profile.displayName}`,
            description: data.course.description,
            images: [data.course.image],
        },
    }
}

export default async function CoursePage({
    params,
}: {
    params: { username: string; slug: string }
}) {
    const data = await getCourseDetails(params.username, params.slug)

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
        <div className="min-h-screen p-6" style={{ backgroundColor: themeColors.background, color: themeColors.text }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
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
                        <Link href="/course">Back to Courses</Link>
                    </Button>

                    <h1 className="text-2xl md:text-3xl font-bold">{data.course.title}</h1>

                    <Button
                        className="ml-auto"
                        style={{
                            backgroundColor: themeColors.accent,
                            color: "#ffffff",
                        }}
                    >
                        Enroll for ${data.course.price.toFixed(2)}
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="relative h-64 md:h-80 w-full mb-6 rounded-lg overflow-hidden">
                            <Image
                                src={data.course.image || "/placeholder.svg"}
                                alt={data.course.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full mb-6" style={{ backgroundColor: `${themeColors.text}20` }}>
                                <TabsTrigger
                                    value="overview"
                                    className="flex-1"
                                    style={{
                                        color: themeColors.text,
                                        // data: {
                                        //     state: {
                                        //         active: {
                                        //             backgroundColor: themeColors.accent,
                                        //             color: "#ffffff",
                                        //         },
                                        //     },
                                        // },
                                    }}
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="curriculum"
                                    className="flex-1"
                                    style={{
                                        color: themeColors.text,
                                        // data: {
                                        //     state: {
                                        //         active: {
                                        //             backgroundColor: themeColors.accent,
                                        //             color: "#ffffff",
                                        //         },
                                        //     },
                                        // },
                                    }}
                                >
                                    Curriculum
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview">
                                <Card
                                    style={{
                                        backgroundColor: `${themeColors.background}CC`,
                                        borderColor: `${themeColors.text}30`,
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle style={{ color: themeColors.text }}>About this course</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p style={{ color: `${themeColors.text}CC` }}>{data.course.description}</p>

                                        <div className="mt-6">
                                            <h3 className="text-lg font-medium mb-2" style={{ color: themeColors.text }}>
                                                What you'll learn
                                            </h3>
                                            <ul className="list-disc pl-5 space-y-1" style={{ color: `${themeColors.text}CC` }}>
                                                {data.course.sections.map((section) => (
                                                    <li key={section.id}>{section.title}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="curriculum">
                                <Card
                                    style={{
                                        backgroundColor: `${themeColors.background}CC`,
                                        borderColor: `${themeColors.text}30`,
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle style={{ color: themeColors.text }}>Course Content</CardTitle>
                                        <CardDescription style={{ color: `${themeColors.text}99` }}>
                                            {data.course.sections.length} sections • Approximately 5 hours
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {data.course.sections.map((section, index) => (
                                                <div
                                                    key={section.id}
                                                    className="p-4 rounded-lg"
                                                    style={{ backgroundColor: `${themeColors.text}10` }}
                                                >
                                                    <h3 className="text-lg font-medium mb-1" style={{ color: themeColors.text }}>
                                                        {index + 1}. {section.title}
                                                    </h3>
                                                    <p style={{ color: `${themeColors.text}99` }}>{section.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div>
                        <Card
                            className="sticky top-6"
                            style={{
                                backgroundColor: `${themeColors.background}CC`,
                                borderColor: `${themeColors.text}30`,
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            <CardHeader>
                                <CardTitle style={{ color: themeColors.text }}>Course Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium mb-1" style={{ color: `${themeColors.text}99` }}>
                                        Instructor
                                    </h3>
                                    <p style={{ color: themeColors.text }}>{data.profile.displayName}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-1" style={{ color: `${themeColors.text}99` }}>
                                        Price
                                    </h3>
                                    <p className="text-xl font-bold" style={{ color: themeColors.text }}>
                                        ${data.course.price.toFixed(2)}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-1" style={{ color: `${themeColors.text}99` }}>
                                        Includes
                                    </h3>
                                    <ul className="space-y-1" style={{ color: themeColors.text }}>
                                        <li>• Full lifetime access</li>
                                        <li>• Access on mobile and desktop</li>
                                        <li>• Certificate of completion</li>
                                    </ul>
                                </div>

                                <Button
                                    className="w-full mt-4"
                                    style={{
                                        backgroundColor: themeColors.accent,
                                        color: "#ffffff",
                                    }}
                                >
                                    Enroll Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <footer className="mt-12 text-center text-sm opacity-50">
                <p>Powered by VIKMID</p>
            </footer>
        </div>
    )
}

