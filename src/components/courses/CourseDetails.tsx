"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, Users, Calendar, BookOpen, Info, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import CourseDetailsTab from "./tabs/CourseDetailsTab"
import CourseLessonsTab from "./tabs/CourseLessonsTab"
import CourseBatchesTab from "./tabs/CourseBatchesTab"
import CourseEnrollmentsTab from "./tabs/CourseEnrollmentsTab"
import { useApiCall } from "@/utils/useApiCall"
import { useDispatch, useSelector } from "react-redux";
import { Course } from "@/store/course/interface/CourseInterface";

interface courseDetailsInterface {
  course: Course
}
type Tab = {
  id: string
  label: string
  icon: React.ReactNode
}

const tabs: Tab[] = [
  { id: "details", label: "Details", icon: <Info className="w-4 h-4" /> },
  { id: "lessons", label: "Lessons", icon: <BookOpen className="w-4 h-4" /> },
  { id: "batches", label: "Batches", icon: <Calendar className="w-4 h-4" /> },
  { id: "enrollments", label: "Enrollments", icon: <Users className="w-4 h-4" /> },
]



export default function CourseDetails({ course }: courseDetailsInterface) {
  const { apiCall } = useApiCall()
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userDetails);
  const selectedCourse = useSelector((state: any) => state.selectedCourse.course);
  const hubId = user?.activeHub;
  const creatorId = user?.id;

  const [activeTab, setActiveTab] = useState("details")
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  // Check if tabs need scroll buttons
  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
        setShowLeftScroll(scrollLeft > 0)
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    checkScroll()
    window.addEventListener("resize", checkScroll)

    const tabsElement = tabsRef.current
    if (tabsElement) {
      tabsElement.addEventListener("scroll", checkScroll)
    }

    return () => {
      window.removeEventListener("resize", checkScroll)
      if (tabsElement) {
        tabsElement.removeEventListener("scroll", checkScroll)
      }
    }
  }, [])

  // Scroll tabs left or right
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200
      const newScrollLeft =
        direction === "left" ? tabsRef.current.scrollLeft - scrollAmount : tabsRef.current.scrollLeft + scrollAmount

      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Format price with currency
  const formatPrice = (price: string | null) => {
    if (!price) return "Free"
    return `₦${Number.parseFloat(price).toLocaleString()}`
  }

  if (!selectedCourse) return <div></div>
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Course Header */}
      <div className="relative h-64 md:h-80">
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${course?.file || "/placeholder.svg?height=400&width=800"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div> */}
        <div className="relative w-full h-96 overflow-hidden">
          {selectedCourse.withTrailer
            ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={selectedCourse.file}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${selectedCourse?.file || "/placeholder.svg?height=400&width=800"})`,
                }}
              />
            )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div>


        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {selectedCourse.courseType}
                </span>
                {selectedCourse.status ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-300 border border-gray-500/30">
                    Draft
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedCourse.title}</h1>

              <div className="flex items-center space-x-2 text-gray-300">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-medium">
                    {selectedCourse?.creator?.firstName.charAt(0)}
                  </div>
                  <span className="ml-2 text-sm">
                    {selectedCourse?.creator?.firstName} {selectedCourse?.creator?.lastName}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm">{selectedCourse?.lessons?.length} lessons</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg px-4 py-2 text-white font-bold shadow-lg">
                {selectedCourse.withDiscount ? formatPrice(selectedCourse.discountPrice) : formatPrice(selectedCourse.price)}
              </div>
              {selectedCourse.withDiscount && selectedCourse.discountPrice && (
                <div className="text-sm text-gray-400 line-through mt-1">{formatPrice(selectedCourse.price)}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="relative border-b border-gray-800">
        {/* Left scroll button */}
        {showLeftScroll && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-gray-900 to-transparent flex items-center"
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </button>
        )}

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="flex overflow-x-auto scrollbar-hide px-4 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center whitespace-nowrap px-4 py-2 mx-1 rounded-md transition-all",
                activeTab === tab.id
                  ? "bg-gray-800/60 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30",
              )}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
              {tab.id === "lessons" && (
                <span className="ml-1 text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">
                  {selectedCourse?.lessons?.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right scroll button */}
        {showRightScroll && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-gray-900 to-transparent flex items-center"
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        )}

        {/* Active tab indicator */}
        <div className="relative">
          {tabs.map((tab) => (
            <div
              key={`indicator-${tab.id}`}
              className={cn(
                "absolute bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300",
                activeTab === tab.id ? "opacity-100" : "opacity-0",
              )}
              style={{
                left:
                  0,
                width:
                  tabsRef.current?.querySelector(`button:nth-child(${tabs.findIndex((t) => t.id === tab.id) + 1})`)
                    ?.clientWidth || 0,
                transform: activeTab === tab.id ? "scaleX(1)" : "scaleX(0)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-grow p-4 md:p-6">

        {activeTab === "details" && <CourseDetailsTab course={selectedCourse} />}
        {activeTab === "lessons" && <CourseLessonsTab courseId={selectedCourse.id} lessons={selectedCourse.lessons} />}
        {activeTab === "batches" && <CourseBatchesTab courseId={selectedCourse.id} withBatch={selectedCourse.withBatch} />}
        {activeTab === "enrollments" && <CourseEnrollmentsTab courseId={selectedCourse.id} />}
      </div>
    </div>
  )
}

