"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, ChevronLeft } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  discountedPrice?: number;
  enrolledStudents: number;
  category: string;
  duration: string;
  lessons: number;
  level: string;
  rating: number;
  whatYouWillLearn: string[];
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to React",
    description:
      "Learn the basics of React and build your first app. This course covers everything from setting up your development environment to creating complex components and managing state.",
    instructor: "Jane Doe",
    price: 99.99,
    discountedPrice: 49.99,
    enrolledStudents: 1500,
    category: "Web Development",
    duration: "6 weeks",
    lessons: 42,
    level: "Beginner",
    rating: 4.7,
    whatYouWillLearn: [
      "Understand React fundamentals",
      "Build reusable components",
      "Manage state and props",
      "Work with React Hooks",
      "Implement routing in React applications",
    ],
  },
];

export default function CourseOverviewPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const course = mockCourses.find((c) => c.id === courseId);

  const [selectedTab, setSelectedTab] = useState("overview");

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-medium">Back to Marketplace</span>
      </button>

      {/* Course Title */}
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        {course.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <Badge variant="secondary">{course.category}</Badge>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <p className="mb-4">{course.description}</p>
                  <h3 className="font-semibold mb-2">What you'll learn:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {course.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="curriculum">
                  <p>Course curriculum content goes here...</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{course.enrolledStudents} students enrolled</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{course.lessons} lessons</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              {course.discountedPrice && (
                <p className="text-sm mb-2">
                  <span className="line-through text-gray-500 mr-2">${course.price.toFixed(2)}</span>
                  <span className="text-green-500 font-semibold">
                    Save ${(course.price - course.discountedPrice).toFixed(2)}!
                  </span>
                </p>
              )}
              <Button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600">
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
