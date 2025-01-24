"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@radix-ui/react-progress"
import { Button } from "@/components/ui/button"
import { Book, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
}

interface StudentDashboardProps {
  courses: Course[]
}

export function StudentDashboard({ courses }: StudentDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100">{course.title}</CardTitle>
            <CardDescription className="text-gray-400">{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Progress</span>
                <span className="text-sm font-medium text-gray-300">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="w-full" />
            </div>
            <p className="text-sm text-gray-400">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 p-4 border-t border-gray-700">
            <Button
              variant="default"
              size="sm"
              asChild
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
            >
              <Link href={`/courses/${course.id}`}>
                <Book className="mr-2 h-4 w-4" />
                Continue
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Link href={`/courses/${course.id}/discussion`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Discussion
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Link href={`/courses/${course.id}/materials`}>
                <FileText className="mr-2 h-4 w-4" />
                Materials
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

