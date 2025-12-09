import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Image from "next/image"
import type { Course } from "@/components/courses/types"
import { PageLoader } from "../loader/PageLoader"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useApiCall } from "@/utils/useApiCall"
import { useDispatch } from "react-redux"
import { appendCourses, setCourses } from "@/store/course/CourseSlice"
import InfiniteScroll from 'react-infinite-scroller';
import { Course as CourseInterface } from "@/store/course/interface/CourseInterface"


interface CourseListProps {
  onCreateCourse: () => void
  deleteCourse: (data: CourseInterface) => void
  manageCourse: (data: CourseInterface) => void

}

export const CourseList: React.FC<CourseListProps> = ({
  onCreateCourse,
  deleteCourse,
  manageCourse,
}) => {
  const { apiCall } = useApiCall();
  const dispatch = useDispatch();
  const courses = useSelector((state: any) => state.courses.courses);
  const user = useSelector((state: any) => state.userDetails);
  const activeHub = user?.activeHub;
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
  const [next, setNext] = useState<string | null>(null)
  const [moreCourseLoader, setMoreCourseLoader] = useState(false)
  useEffect(() => {
    loadCourses()
  }, [])
  const loadCourses = async () => {
    if (courses.length < 1) setIsPageLoading(true)
    // load course
    try {
      const response = await apiCall({
        endpoint: `/courses/all-hub-courses/${activeHub}`,
        method: "get",
      }
      );
      if (response.data.links.next) {
        setNext(response.data.links.next)
      }
      dispatch(setCourses(response.data.data))
      setIsPageLoading(false)

    } catch (error: any) {
      console.log(error);
      setIsPageLoading(false)

    }

  }
  const fetchMoreCourses = async () => {

    if (moreCourseLoader) {
      return;
    }
    if (!next) return
    setMoreCourseLoader(true)

    try {

      const response = await apiCall({
        endpoint: `${next}`,
        method: "get",
        "showToast": false,
      }
      );
      if (response) {
        dispatch(appendCourses(response.data.data))

        if (response.data.links.next) {
          setNext(response.data.links.next)
        } else {
          setNext(null)

        }

      }
      setMoreCourseLoader(false)

    } catch (error) {
      setMoreCourseLoader(false)
      console.error("Error fetching courses:", error);
    }

  }
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
        <PageLoader />
      ) : courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">You haven't created any courses yet.</p>
          <p className="text-gray-500 mt-2">Click the 'Create New Course' button to get started!</p>
        </div>
      ) : (
        <InfiniteScroll
          pageStart={1}
          loadMore={fetchMoreCourses}
          hasMore={moreCourseLoader == false && next ? true : false}

          useWindow={false}

        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {courses.map((course) => (
              <Card key={course.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  {
                    !course.withTrailer ?
                      <Image
                        src={course.file}
                        alt={course.title}
                        width={400}
                        height={200}
                        className="rounded-lg object-cover w-full h-40"
                      /> :
                      <video
                        className="rounded-lg object-cover w-full h-40"
                        src={course.file}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                  }
                  <CardTitle className="mt-4 text-lg font-medium text-gray-100 truncate">{course.title}</CardTitle>
                  <CardDescription className="text-gray-400 line-clamp-3 h-20">
                    {course.description.substring(0, 300)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center">
                    <Badge variant={course.withDiscount ? "default" : "secondary"} className={`${course.withDiscount ? "line-through" : "bg-purple-500"}  text-white`}>

                      ₦{Number.parseFloat(course.price).toLocaleString()}
                    </Badge>
                    {course.withDiscount && (
                      <Badge className="bg-purple-500 text-white">
                        ₦{Number.parseFloat(course.discountPrice).toLocaleString()}
                      </Badge>
                    )}

                    {/* <span className="text-sm text-gray-400">{course.students.length} students</span> */}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => manageCourse(course)} >
                    Manage
                  </Button>
                  <Button variant="destructive" onClick={() => deleteCourse(course)} >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

