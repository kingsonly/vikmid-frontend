"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Book, Video, FileAudio, FileText, List, Users, Calendar, BadgeCheck, MessageSquare, Plus, Pencil, Trash2, Eye, ArrowUpDown, DollarSign, ImageIcon, ChevronLeft } from 'lucide-react';
import Image from "next/image";

export default function Course() {
  const [courses, setCourses] = useState<any[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 0,
    banner: "/placeholder.svg?height=400&width=800",
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const observerRef = useRef<any>(null);

  const loadMoreCourses = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const nextCourses = courses.slice(displayedCourses.length, displayedCourses.length + 10);
      setDisplayedCourses(prevCourses => [...prevCourses, ...nextCourses]);
      setLoading(false);
    }, 1000);
  }, [loading, courses, displayedCourses.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && displayedCourses.length < courses.length) {
          loadMoreCourses();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      alert(123)
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMoreCourses, loading, displayedCourses.length, courses.length]);

  useEffect(() => {
    setDisplayedCourses(courses.slice(0, 10));
  }, [courses]);

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.price) {
      const course = {
        id: Date.now(),
        ...newCourse,
        totalStudents: 0,
        totalBatches: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        students: [],
        batches: [],
        content: [],
        comments: [],
      };
      setCourses(prevCourses => [...prevCourses, course]);
      setNewCourse({
        title: "",
        description: "",
        price: 0,
        banner: "/placeholder.svg?height=400&width=800",
      });
      setIsCreatingCourse(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(prevCourses => prevCourses.filter((course) => course.id !== id));
    setDisplayedCourses(prevDisplayed => prevDisplayed.filter((course) => course.id !== id));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse({ ...newCourse, banner: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCourseList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Courses</h2>
        <Button
          onClick={() => setIsCreatingCourse(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Create New Course
        </Button>
      </div>

      {displayedCourses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">You haven't created any courses yet.</p>
          <p className="text-gray-500 mt-2">Click the 'Create New Course' button to get started!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map((course) => (
            <Card key={course.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Image
                  src={course.banner}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-40"
                />
                <CardTitle className="mt-4">{course.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {course.description.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-purple-500 text-white">
                    ₦{course.price}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {course.students.length} students
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCourse(course)}
                >
                  Manage
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {courses.length > 10 && (
        <div ref={observerRef} className="flex justify-center py-4">
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          )}
        </div>
      )}
    </div>
  );

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <Button onClick={() => setSelectedCourse(null)} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Courses
      </Button>
      <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black text-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          {/* <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <div>
                <Label htmlFor="edit-course-title">Course Title</Label>
                <Input
                  id="edit-course-title"
                  value={selectedCourse.title}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
                      title: e.target.value,
                    })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="edit-course-description">
                  Course Description
                </Label>
                <Textarea
                  id="edit-course-description"
                  value={selectedCourse.description}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
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
                  value={selectedCourse.price}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label>Course Banner</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Image
                    src={selectedCourse.banner}
                    alt="Course banner"
                    width={200}
                    height={100}
                    className="rounded-lg object-cover"
                  />
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
                  {selectedCourse.content.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        {item.type === "video" && (
                          <Video className="h-4 w-4 inline mr-2" />
                        )}
                        {item.type === "pdf" && (
                          <FileText className="h-4 w-4 inline mr-2" />
                        )}
                        {item.type === "mcq" && (
                          <List className="h-4 w-4 inline mr-2" />
                        )}
                        {item.type}
                      </TableCell>
                      <TableCell>
                        {item.duration ||
                          item.size ||
                          `${item.questions} questions`}
                      </TableCell>
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
                  {selectedCourse.students.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
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
                  {selectedCourse.batches.map((batch: any) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">
                        {batch.name}
                      </TableCell>
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
                      {selectedCourse.comments.map((comment: any) => (
                        <TableRow key={comment.id}>
                          <TableCell className="font-medium">
                            {comment.user}
                          </TableCell>
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
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 w-full">
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto ">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Course Management
          </h1>
          {selectedCourse ? renderCourseManagement() : renderCourseList()}

          <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
            <DialogContent className="bg-gray-800 text-white overflow-auto sm:max-w-[425px] max-w-[90vw] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">
                  Create New Course
                </DialogTitle>
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
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder="Enter course title"
                    className="bg-gray-700 border-gray-600 mt-1 w-full"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="course-description"
                    className="text-sm font-medium"
                  >
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
                    className="bg-gray-700 border-gray-600 mt-1 w-full"
                  />
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
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Enter course price"
                    className="bg-gray-700 border-gray-600 mt-1 w-full"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="course-banner"
                    className="text-sm font-medium"
                  >
                    Course Banner
                  </Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
                    <Image
                      src={newCourse.banner}
                      alt="Course banner"
                      width={100}
                      height={50}
                      className="rounded-lg object-cover"
                    />
                    <Button
                      onClick={() => fileInputRef.current.click()}
                      className="w-full sm:w-auto"
                    >
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
              <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  onClick={() => setIsCreatingCourse(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCourse}
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Create Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

