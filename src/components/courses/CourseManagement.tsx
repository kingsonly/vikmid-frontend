"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  Loader2,
  Eye,
  Book,
  Video,
  FileAudio,
  FileText,
  List,
  Users,
  Calendar,
  BadgeCheck,
  MessageSquare,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  DollarSign,
  ImageIcon,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { getFileSize, getVideoDuration } from "@/components/courses/utils/fileUtils"
import { VideoPlayer } from "@/components/courses/video-player"
import type { Course, Topic, Lesson } from "@/components/courses/types"
import { CourseList } from "@/components/courses/CourseList"
import { CourseContent } from "@/components/courses/CourseContent"

type ContentItem = {
  id: string
  title: string
  type: "video" | "pdf" | "mcq"
  duration?: number
  size?: string
  file?: File | null
  url?: string
  questions?: number
  lessons?: ContentItem[]
}

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 0,
    banner: "/placeholder.svg?height=400&width=800",
  })
  const [isAddingTopic, setIsAddingTopic] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: "" })
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [newLesson, setNewLesson] = useState<Omit<Lesson, "id">>({
    title: "",
    type: "video",
    duration: 0,
    size: "",
    url: "",
  })
  const [selectedLesson, setSelectedLesson] = useState<ContentItem | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [expandedTopics, setExpandedTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const observerRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
  })
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isConfirminglessonDelete, setIsConfirmingLessonDelete] = useState(false)
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null)
  const [lessonToDelete, setLessonToDelete] = useState<string | null>(null)
  const [isCreatingCourseLoading, setIsCreatingCourseLoading] = useState(false)
  const [isAddingTopicLoading, setIsAddingTopicLoading] = useState(false)
  const [isAddingLessonLoading, setIsAddingLessonLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isCourseManagementLoading, setIsCourseManagementLoading] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      setIsPageLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        // In a real application, you would fetch courses from your API here
        const fetchedCourses: Course[] = [] // Replace with actual fetched courses
        setCourses(fetchedCourses)
        setDisplayedCourses(fetchedCourses.slice(0, 10))
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        setStatusMessage({
          message: "Failed to load courses. Please try again.",
          type: "error",
        })
      } finally {
        setIsPageLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const loadMoreCourses = useCallback(() => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      const nextCourses = courses.slice(displayedCourses.length, displayedCourses.length + 10)
      setDisplayedCourses((prevCourses) => [...prevCourses, ...nextCourses])
      setLoading(false)
    }, 1000)
  }, [loading, courses, displayedCourses.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && displayedCourses.length < courses.length) {
          loadMoreCourses()
        }
      },
      { threshold: 1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loadMoreCourses, loading, displayedCourses.length, courses.length])

  const handleCreateCourse = async () => {
    const newErrors: any = {}

    if (!newCourse.title.trim()) {
      newErrors.title = "Course title is required."
    }
    if (!newCourse.description.trim()) {
      newErrors.description = "Course description is required."
    }
    if (!newCourse.price || newCourse.price <= 0) {
      newErrors.price = "Course price must be greater than 0."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (newCourse.title && newCourse.description && newCourse.price) {
      setIsCreatingCourseLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const course: Course = {
          id: Date.now(),
          ...newCourse,
          totalStudents: 0,
          totalBatches: 0,
          lastUpdated: new Date().toISOString().split("T")[0],
          students: [],
          batches: [],
          content: [],
          comments: [],
        }
        setCourses((prevCourses) => [...prevCourses, course])
        setDisplayedCourses((prevDisplayed) => [...prevDisplayed, course])
        setNewCourse({
          title: "",
          description: "",
          price: 0,
          banner: "/placeholder.svg?height=400&width=800",
        })
        setErrors({ title: "", description: "", price: "" })
        setIsCreatingCourse(false)
        setStatusMessage({
          message: "Course created successfully!",
          type: "success",
        })

        setTimeout(() => {
          setStatusMessage(null)
        }, 2000)
      } catch (error) {
        console.error("Failed to create course:", error)
        setStatusMessage({
          message: "Failed to create course. Please try again.",
          type: "error",
        })

        setTimeout(() => {
          setStatusMessage(null)
        }, 3000)
      } finally {
        setIsCreatingCourseLoading(false)
      }
    }
  }

  const handleDeleteCourse = (id: number) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id))
    setDisplayedCourses((prevDisplayed) => prevDisplayed.filter((course) => course.id !== id))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewCourse({ ...newCourse, banner: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTopic = async () => {
    if (!selectedCourse || !newTopic.title.trim()) return

    setIsAddingTopicLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newTopicItem: Topic = { id: Date.now().toString(), title: newTopic.title, lessons: [] }
      const updatedCourse: Course = {
        ...selectedCourse,
        content: [...selectedCourse.content, newTopicItem],
      }

      setSelectedCourse(updatedCourse)
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
      )

      setNewTopic({ title: "" })
      setIsAddingTopic(false)
      setStatusMessage({
        message: "Topic added successfully!",
        type: "success",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } catch (error) {
      console.error("Failed to add topic:", error)
      setStatusMessage({
        message: "Failed to add topic. Please try again.",
        type: "error",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } finally {
      setIsAddingTopicLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileUrl = URL.createObjectURL(file)

    if (newLesson.type === "video") {
      const videoElement = document.createElement("video")
      videoElement.src = fileUrl
      videoElement.onloadedmetadata = () => {
        const duration = Math.round(videoElement.duration)
        setNewLesson((prevLesson) => ({
          ...prevLesson,
          duration,
          url: fileUrl,
        }))
      }
    } else if (newLesson.type === "pdf") {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      setNewLesson((prevLesson) => ({
        ...prevLesson,
        size: fileSizeInMB,
        url: fileUrl,
      }))
    }
  }

  const handleLessonClick = (lesson: ContentItem) => {
    if (lesson.type === "video" && lesson.url) {
      setSelectedLesson(lesson)
    } else if (lesson.type === "pdf" && lesson.url) {
      window.open(lesson.url, "_blank")
    } else if (lesson.type === "mcq") {
      alert(`Displaying MCQ for: ${lesson.title}`)
    } else {
      alert("Content not available.")
    }
  }

  const handleAddOrEditLesson = async () => {
    if (!selectedCourse || !selectedTopicId || !newLesson.title.trim()) return

    if ((newLesson.type === "video" || newLesson.type === "pdf") && !newLesson.url && !editingLesson) {
      alert(`Please select a ${newLesson.type} file.`)
      return
    }

    setIsAddingLessonLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const updatedCourse: Course = {
        ...selectedCourse,
        content: selectedCourse.content.map((topic) =>
          topic.id === selectedTopicId
            ? {
                ...topic,
                lessons: editingLesson
                  ? topic.lessons.map((lesson) =>
                      lesson.id === editingLesson.id ? { ...lesson, ...newLesson } : lesson,
                    )
                  : [
                      ...topic.lessons,
                      {
                        id: Date.now().toString(),
                        ...newLesson,
                      },
                    ],
              }
            : topic,
        ),
      }

      setSelectedCourse(updatedCourse)
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
      )

      setNewLesson({
        title: "",
        type: "video",
        duration: 0,
        size: "",
        url: "",
      })
      setEditingLesson(null)
      setIsAddingLesson(false)
      setStatusMessage({
        message: editingLesson ? "Lesson updated successfully!" : "Lesson added successfully!",
        type: "success",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } catch (error) {
      console.error("Failed to add/edit lesson:", error)
      setStatusMessage({
        message: "Failed to add/edit lesson. Please try again.",
        type: "error",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } finally {
      setIsAddingLessonLoading(false)
    }
  }

  const toggleTopicExpansion = (topicId: string) => {
    setExpandedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleDeleteTopic = async () => {
    if (!selectedCourse || !topicToDelete) return

    setIsCourseManagementLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const updatedCourse = {
        ...selectedCourse,
        content: selectedCourse.content.filter((topic) => topic.id !== topicToDelete),
      }

      setSelectedCourse(updatedCourse)
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
      )

      setTopicToDelete(null)
      setIsConfirmingDelete(false)
      setStatusMessage({
        message: "Topic deleted successfully!",
        type: "success",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } catch (error) {
      console.error("Failed to delete topic:", error)
      setStatusMessage({
        message: "Failed to delete topic. Please try again.",
        type: "error",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } finally {
      setIsCourseManagementLoading(false)
    }
  }

  const handleDeleteLesson = async () => {
    if (!selectedCourse || !lessonToDelete) return

    setIsCourseManagementLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const updatedCourse = {
        ...selectedCourse,
        content: selectedCourse.content.map((topic) => ({
          ...topic,
          lessons: topic.lessons.filter((lesson) => lesson.id !== lessonToDelete),
        })),
      }

      setSelectedCourse(updatedCourse)
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
      )

      setLessonToDelete(null)
      setIsConfirmingLessonDelete(false)
      setStatusMessage({
        message: "Lesson deleted successfully!",
        type: "success",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } catch (error) {
      console.error("Failed to delete lesson:", error)
      setStatusMessage({
        message: "Failed to delete lesson. Please try again.",
        type: "error",
      })

      setTimeout(() => {
        setStatusMessage(null)
      }, 2000)
    } finally {
      setIsCourseManagementLoading(false)
    }
  }

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <Button onClick={() => setSelectedCourse(null)} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Courses
      </Button>
      <h2 className="text-2xl font-semibold truncate w-full max-w-[600px]">{selectedCourse?.title}</h2>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black text-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="edit-course-title">Course Title</Label>
                <Input
                  id="edit-course-title"
                  value={selectedCourse?.title}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse!,
                      title: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="edit-course-description">Course Description</Label>
                <Textarea
                  id="edit-course-description"
                  value={selectedCourse?.description}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse!,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="edit-course-price">Course Price (₦)</Label>
                <Input
                  id="edit-course-price"
                  type="number"
                  value={selectedCourse?.price}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse!,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label>Course Banner</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Image
                    src={selectedCourse?.banner || "/placeholder.svg"}
                    alt="Course banner"
                    width={200}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <CourseContent
            content={selectedCourse?.content || []}
            expandedTopics={expandedTopics}
            onAddTopic={() => setIsAddingTopic(true)}
            onAddLesson={(topicId) => {
              setSelectedTopicId(topicId)
              setIsAddingLesson(true)
            }}
            onDeleteTopic={(topicId) => {
              setTopicToDelete(topicId)
              setIsConfirmingDelete(true)
            }}
            onToggleTopicExpansion={toggleTopicExpansion}
            onEditLesson={(lesson) => {
              setEditingLesson(lesson)
              setNewLesson({
                title: lesson.title,
                type: lesson.type,
                duration: lesson.duration || 0,
                size: lesson.size || "",
                url: lesson.url || "",
                questions: lesson.questions,
              })
              setIsAddingLesson(true)
            }}
            onDeleteLesson={(lessonId) => {
              setLessonToDelete(lessonId)
              setIsConfirmingLessonDelete(true)
            }}
            onLessonClick={handleLessonClick}
          />
        </TabsContent>
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCourse?.students.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>{student.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Topic Modal */}
      <Dialog open={isAddingTopic} onOpenChange={setIsAddingTopic}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="topic-title">Topic Title</Label>
              <Input
                id="topic-title"
                value={newTopic.title}
                onChange={(e) => setNewTopic({ title: e.target.value })}
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingTopic(false)} disabled={isAddingTopicLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddTopic} disabled={isAddingTopicLoading}>
              {isAddingTopicLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Topic"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lesson Modal */}
      <Dialog
        open={isAddingLesson}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingLesson(false)
            setEditingLesson(null)
            setNewLesson({
              title: "",
              type: "video",
              duration: 0,
              size: "",
              url: "",
            })
          }
        }}
      >
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>{editingLesson ? "Edit Lesson" : "Add New Lesson"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="lesson-title">Lesson Title</Label>
              <Input
                id="lesson-title"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="lesson-type">Lesson Type</Label>
              <select
                id="lesson-type"
                value={newLesson.type}
                onChange={(e) =>
                  setNewLesson({
                    ...newLesson,
                    type: e.target.value as "video" | "pdf" | "mcq",
                  })
                }
                className="w-full bg-gray-700 border-gray-600 rounded-md p-2"
              >
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="mcq">MCQ</option>
              </select>
            </div>
            {newLesson.type !== "mcq" && (
              <div>
                <Label htmlFor="lesson-file">{newLesson.type === "video" ? "Video File" : "PDF File"}</Label>
                <Input
                  id="lesson-file"
                  type="file"
                  accept={newLesson.type === "video" ? "video/*" : "application/pdf"}
                  onChange={handleFileChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            )}
            {newLesson.type === "mcq" && (
              <div>
                <Label htmlFor="lesson-questions">Number of Questions</Label>
                <Input
                  id="lesson-questions"
                  type="number"
                  value={newLesson.questions || ""}
                  onChange={(e) =>
                    setNewLesson({
                      ...newLesson,
                      questions: Number.parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddingLesson(false)} disabled={isAddingLessonLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddOrEditLesson} disabled={isAddingLessonLoading}>
              {isAddingLessonLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingLesson ? "Updating..." : "Adding..."}
                </>
              ) : editingLesson ? (
                "Update Lesson"
              ) : (
                "Add Lesson"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 w-full">
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto ">
          {statusMessage && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-md ${
                statusMessage.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {statusMessage.message}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Course Management
          </h1>
          {selectedCourse ? (
            renderCourseManagement()
          ) : (
            <CourseList
              courses={displayedCourses}
              isPageLoading={isPageLoading}
              onCreateCourse={() => setIsCreatingCourse(true)}
              onManageCourse={setSelectedCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
            <DialogContent className="bg-gray-800 text-white overflow-auto sm:max-w-[425px] max-w-[90vw] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">Create New Course</DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Fill in the details to create a new course.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="course-title" className="text-sm font-medium">
                    Course Title
                  </Label>
                  <Input
                    id="course-title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="Enter course title"
                    className={`bg-gray-700 border-gray-600 mt-1 w-full ${errors.title ? "border-red-500" : ""}`}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                </div>
                <div>
                  <Label htmlFor="course-description" className="text-sm font-medium">
                    Course Description
                  </Label>
                  <Textarea
                    id="course-description"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter course description"
                    className={`bg-gray-700 border-gray-600 mt-1 w-full ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                </div>
                <div>
                  <Label htmlFor="course-price" className="text-sm font-medium">
                    Course Price (₦)
                  </Label>
                  <Input
                    id="course-price"
                    type="number"
                    value={newCourse.price}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                    placeholder="Enter course price"
                    className={`bg-gray-700 border-gray-600 mt-1 w-full ${errors.price ? "border-red-500" : ""}`}
                  />
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                </div>
                <div>
                  <Label htmlFor="course-banner" className="text-sm font-medium">
                    Course Banner
                  </Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
                    {newCourse.banner && (
                      <Image
                        src={newCourse.banner || "/placeholder.svg"}
                        alt="Course banner"
                        width={100}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <Button onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto">
                      Upload Image
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  onClick={() => setIsCreatingCourse(false)}
                  className="w-full sm:w-auto"
                  disabled={isCreatingCourseLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCourse}
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={isCreatingCourseLoading}
                >
                  {isCreatingCourseLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Course"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {selectedLesson && selectedLesson.type === "video" && (
            <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
              <DialogContent className="bg-gray-800 text-white max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{selectedLesson.title}</DialogTitle>
                </DialogHeader>
                <video src={selectedLesson.url} controls className="w-full" />
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this topic? This action cannot be undone.</p>
              <DialogFooter>
                <Button onClick={() => setIsConfirmingDelete(false)} disabled={isCourseManagementLoading}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteTopic} disabled={isCourseManagementLoading}>
                  {isCourseManagementLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isConfirminglessonDelete} onOpenChange={setIsConfirmingLessonDelete}>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this Lesson? This action cannot be undone.</p>
              <DialogFooter>
                <Button onClick={() => setIsConfirmingLessonDelete(false)} disabled={isCourseManagementLoading}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteLesson} disabled={isCourseManagementLoading}>
                  {isCourseManagementLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}

