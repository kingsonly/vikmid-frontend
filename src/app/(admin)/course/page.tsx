'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, Video, FileAudio, FileText, List, Users, Calendar, BadgeCheck, MessageSquare, Plus, Pencil, Trash2, Eye, ArrowUpDown, DollarSign, ImageIcon, ChevronLeft } from 'lucide-react'
import Image from 'next/image'

// Mock data (same as before)
const mockCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
    price: 49.99,
    students: 120,
    batches: 2,
    lastUpdated: "2023-06-15",
    banner: "/placeholder.svg?height=400&width=800",
    content: [
      { id: 1, title: "Introduction to HTML", type: "video", duration: "15:30" },
      { id: 2, title: "CSS Basics", type: "video", duration: "20:45" },
      { id: 3, title: "JavaScript Fundamentals", type: "pdf", size: "2.5 MB" },
      { id: 4, title: "Web Development Quiz", type: "mcq", questions: 10 },
    ],
    batches: [
      { id: 1, name: "Summer 2023", startDate: "2023-06-01", endDate: "2023-08-31", students: 50 },
      { id: 2, name: "Fall 2023", startDate: "2023-09-01", endDate: "2023-11-30", students: 70 },
    ],
    students: [
      { id: 1, name: "John Doe", email: "john@example.com", progress: 75, joinedDate: "2023-05-10" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", progress: 90, joinedDate: "2023-05-15" },
    ],
    comments: [
      { id: 1, user: "Alice", content: "Great explanation of CSS flexbox!", date: "2023-06-20", replies: 2 },
      { id: 2, user: "Charlie", content: "Could you provide more examples for JavaScript closures?", date: "2023-06-22", replies: 1 },
    ],
  },
  // Add more mock courses here...
]

export default function Course() {
  const [courses, setCourses] = useState(mockCourses)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 0,
    banner: "/placeholder.svg?height=400&width=800",
  })
  const fileInputRef = useRef(null)

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.price) {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        students: [],
        batches: [],
        content: [],
        comments: [],
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      setCourses([...courses, course])
      setNewCourse({ title: "", description: "", price: 0, banner: "/placeholder.svg?height=400&width=800" })
      setIsCreatingCourse(false)
    }
  }

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewCourse({ ...newCourse, banner: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const renderCourseList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Courses</h2>
        <Button onClick={() => setIsCreatingCourse(true)} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
          <Plus className="w-4 h-4 mr-2" /> Create New Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <Image src={course.banner} alt={course.title} width={400} height={200} className="rounded-lg object-cover w-full h-40" />
              <CardTitle className="mt-4">{course.title}</CardTitle>
              <CardDescription className="text-gray-400">{course.description.substring(0, 100)}...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="bg-purple-500 text-white">₦{course.price}</Badge>
                <span className="text-sm text-gray-400">{course.students.length} students</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedCourse(course)}>Manage</Button>
              <Button variant="destructive" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => setSelectedCourse(null)} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Courses
      </Button>
      <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
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
                  value={selectedCourse.title}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="edit-course-description">Course Description</Label>
                <Textarea
                  id="edit-course-description"
                  value={selectedCourse.description}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="edit-course-price">Course Price (₦)</Label>
                <Input
                  id="edit-course-price"
                  type="number"
                  value={selectedCourse.price}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, price: parseFloat(e.target.value) })}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label>Course Banner</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Image src={selectedCourse.banner} alt="Course banner" width={200} height={100} className="rounded-lg object-cover" />
                  <Button variant="outline">
                    <ImageIcon className="w-4 h-4 mr-2" /> Change Image
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" /> Add New Content
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration/Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCourse.content.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        {item.type === 'video' && <Video className="h-4 w-4 inline mr-2" />}
                        {item.type === 'pdf' && <FileText className="h-4 w-4 inline mr-2" />}
                        {item.type === 'mcq' && <List className="h-4 w-4 inline mr-2" />}
                        {item.type}
                      </TableCell>
                      <TableCell>{item.duration || item.size || `${item.questions} questions`}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
                  {selectedCourse.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
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
        <TabsContent value="batches">
          <Card>
            <CardHeader>
              <CardTitle>Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" /> Create New Batch
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Batch Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCourse.batches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">{batch.name}</TableCell>
                      <TableCell>{batch.startDate}</TableCell>
                      <TableCell>{batch.endDate}</TableCell>
                      <TableCell>{batch.students}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="comments" className="w-full">
                <TabsList>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="mcq">MCQ Results</TabsTrigger>
                </TabsList>
                <TabsContent value="comments">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">User</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Replies</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedCourse.comments.map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell className="font-medium">{comment.user}</TableCell>
                          <TableCell>{comment.content}</TableCell>
                          <TableCell>{comment.date}</TableCell>
                          <TableCell>{comment.replies}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="mcq">
                  <p>MCQ results and analytics will be displayed here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 w-full">
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          Course Management
        </h1>

        {selectedCourse ? renderCourseManagement() : renderCourseList()}

        <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new course.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Enter course title"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea
                  id="course-description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Enter course description"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="course-price">Course Price (₦)</Label>
                <Input
                  id="course-price"
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
                  placeholder="Enter course price"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="course-banner">Course Banner</Label>
                <div className="flex items-center space-x-4">
                  <Image src={newCourse.banner} alt="Course banner" width={100} height={50} className="rounded-lg object-cover" />
                  <Button onClick={() => fileInputRef.current.click()} variant="outline">
                    <ImageIcon className="w-4 h-4 mr-2" /> Upload Image
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatingCourse(false)}>Cancel</Button>
              <Button onClick={handleCreateCourse} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">Create Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}