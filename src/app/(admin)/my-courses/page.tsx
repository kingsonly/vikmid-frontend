"use client"

import { StudentDashboard } from "@/components/courses/StudentDashboard"

// This is mock data. In a real application, you would fetch this data from your API.
const mockCourses = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React and build your first app",
    progress: 60,
    totalLessons: 10,
    completedLessons: 6,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts",
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
  },
  {
    id: "3",
    title: "Node.js Fundamentals",
    description: "Build server-side applications with Node.js",
    progress: 80,
    totalLessons: 12,
    completedLessons: 10,
  },
]

export default function MyCoursesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Courses</h1>
          <StudentDashboard courses={mockCourses} />
        </div>
      </main>
    </div>
  )
}

