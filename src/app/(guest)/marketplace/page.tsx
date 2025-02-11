"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Users } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  enrolledStudents: number
  category: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React and build your first app",
    instructor: "Jane Doe",
    price: 49.99,
    enrolledStudents: 1500,
    category: "Web Development",
  },
  {
    id: "2",
    title: "Advanced JavaScript Techniques",
    description: "Master advanced JavaScript concepts and patterns",
    instructor: "John Smith",
    price: 79.99,
    enrolledStudents: 1200,
    category: "Programming",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Create beautiful and user-friendly interfaces",
    instructor: "Alice Johnson",
    price: 59.99,
    enrolledStudents: 2000,
    category: "Design",
  },
  // Add more mock courses as needed
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = mockCourses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-black"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <Badge variant="secondary">{course.category}</Badge>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{course.description}</p>
              <p className="text-sm font-semibold">Instructor: {course.instructor}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                {course.enrolledStudents} students
              </div>
              <p className="font-bold">${course.price.toFixed(2)}</p>
            </CardFooter>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href={`/marketplace/${course.id}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Course
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

