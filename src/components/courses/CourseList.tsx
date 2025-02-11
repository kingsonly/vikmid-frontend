import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus } from "lucide-react"
import Image from "next/image"
import type { Course } from "@/components/courses/types"

interface CourseListProps {
  courses: Course[]
  isPageLoading: boolean
  onCreateCourse: () => void
  onManageCourse: (course: Course) => void
  onDeleteCourse: (id: number) => void
}

export const CourseList: React.FC<CourseListProps> = ({
  courses,
  isPageLoading,
  onCreateCourse,
  onManageCourse,
  onDeleteCourse,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Courses</h2>
        <Button
          onClick={onCreateCourse}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Create New Course
        </Button>
      </div>

      {isPageLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">You haven't created any courses yet.</p>
          <p className="text-gray-500 mt-2">Click the 'Create New Course' button to get started!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Image
                  src={course.banner || "/placeholder.svg"}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-40"
                />
                <CardTitle className="mt-4 text-lg font-medium text-gray-100 truncate">{course.title}</CardTitle>
                <CardDescription className="text-gray-400 line-clamp-3">
                  {course.description.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-purple-500 text-white">
                    ₦{course.price}
                  </Badge>
                  <span className="text-sm text-gray-400">{course.students.length} students</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => onManageCourse(course)}>
                  Manage
                </Button>
                <Button variant="destructive" onClick={() => onDeleteCourse(course.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

