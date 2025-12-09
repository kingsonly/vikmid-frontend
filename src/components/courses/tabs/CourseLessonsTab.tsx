// "use client"

// import { useState } from "react"
// import { ChevronDown, ChevronUp, Play, FileText, ImageIcon, File, Lock } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Lesson } from "@/store/course/interface/CourseInterface";
// interface CourseLessonsTabProps {
//     lessons: Lesson[]
// }

// export default function CourseLessonsTab({ lessons }: CourseLessonsTabProps) {
//     const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({})

//     // Toggle lesson expansion
//     const toggleLesson = (lessonId: string) => {
//         setExpandedLessons((prev) => ({
//             ...prev,
//             [lessonId]: !prev[lessonId],
//         }))
//     }

//     // Get icon based on segment type
//     const getSegmentIcon = (contentType: string) => {
//         switch (contentType.toLowerCase()) {
//             case "video":
//                 return <Play className="h-4 w-4 text-purple-400" />
//             case "text":
//                 return <FileText className="h-4 w-4 text-blue-400" />
//             case "image":
//                 return <ImageIcon className="h-4 w-4 text-green-400" />
//             default:
//                 return <File className="h-4 w-4 text-gray-400" />
//         }
//     }

//     // Sort lessons by order
//     const sortedLessons = [...lessons].sort((a, b) => a.order - b.order)

//     return (
//         <div className="space-y-4 animate-fadeIn">
//             <h3 className="text-xl font-semibold text-white mb-4">Course Content</h3>

//             <div className="text-sm text-gray-300 mb-6">
//                 <span className="font-medium text-white">{lessons.length}</span> lessons •{" "}
//                 <span className="font-medium text-white">
//                     {lessons.reduce((total, lesson) => total + lesson.lessonSegments.length, 0)}
//                 </span>{" "}
//                 segments
//             </div>

//             {sortedLessons.length === 0 ? (
//                 <Card className="bg-gray-800/50 border-gray-700 p-8 text-center">
//                     <p className="text-gray-400">No lessons have been added to this course yet.</p>
//                 </Card>
//             ) : (
//                 <div className="space-y-3">
//                     {sortedLessons.map((lesson) => (
//                         <Card key={lesson.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
//                             {/* Lesson Header */}
//                             <button
//                                 onClick={() => toggleLesson(lesson.id)}
//                                 className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
//                             >
//                                 <div className="flex items-center">
//                                     <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
//                                         <span className="text-sm font-medium text-purple-400">{lesson.order + 1}</span>
//                                     </div>
//                                     <div>
//                                         <h4 className="font-medium text-white">{lesson.title}</h4>
//                                         <p className="text-sm text-gray-400">{lesson.lessonSegments.length} segments</p>
//                                     </div>
//                                 </div>
//                                 {expandedLessons[lesson.id] ? (
//                                     <ChevronUp className="h-5 w-5 text-gray-400" />
//                                 ) : (
//                                     <ChevronDown className="h-5 w-5 text-gray-400" />
//                                 )}
//                             </button>

//                             {/* Lesson Segments */}
//                             {expandedLessons[lesson.id] && (
//                                 <div className="border-t border-gray-700">
//                                     {lesson.lessonSegments
//                                         .sort((a, b) => a.order - b.order)
//                                         .map((segment) => (
//                                             <div
//                                                 key={segment.id}
//                                                 className="flex items-center p-3 pl-6 hover:bg-gray-700/30 transition-colors border-b border-gray-700 last:border-b-0"
//                                             >
//                                                 <div className="mr-3">{getSegmentIcon(segment.contentType)}</div>
//                                                 <div className="flex-grow">
//                                                     <p className="text-sm text-gray-300">
//                                                         {segment.description || segment.content.substring(0, 50)}
//                                                     </p>
//                                                     <p className="text-xs text-gray-500 mt-1 capitalize">{segment.contentType}</p>
//                                                 </div>
//                                                 {!segment.previewable && (
//                                                     <div className="flex items-center text-xs text-gray-400">
//                                                         <Lock className="h-3 w-3 mr-1" />
//                                                         <span>Premium</span>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ))}
//                                 </div>
//                             )}
//                         </Card>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }




"use client"

import { useState } from "react"
import {
    ChevronDown,
    ChevronUp,
    Play,
    FileText,
    ImageIcon,
    File,
    Lock,
    Plus,
    Edit,
    Trash2,
    FileQuestion,
    FilePlus,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import type { Lesson } from "@/store/course/interface/CourseInterface"
import ModalComponent from "@/components/ModalComponent/ModalComponent"
import { useSelector } from "react-redux"
import { useApiCall } from "@/utils/useApiCall"
import { useDispatch } from "react-redux"
import { addLesson, deleteLesson, updateLesson } from "@/store/course/CourseSlice"
import { addLessonToSelectedCourse, deleteLessonFromSelectedCourse, updateLessonInSelectedCourse } from "@/store/course/selectedCourseSlice"
import DeleteConfirm from "@/components/DeleteConfirm/DeleteConfirm"

interface CourseLessonsTabProps {
    lessons: Lesson[]
    courseId: string
    onLessonAdded?: (lesson: Lesson) => void
    onLessonUpdated?: (lesson: Lesson) => void
    onLessonDeleted?: (lessonId: string) => void
    onSegmentAdded?: (lessonId: string, segment: any) => void
    onSegmentUpdated?: (lessonId: string, segment: any) => void
    onSegmentDeleted?: (lessonId: string, segmentId: string) => void
}

// Lesson form schema
const lessonFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
})

// Segment form schema
const segmentFormSchema = z.object({
    type: z.string().min(1, "Type is required"),
    content: z.string().min(1, "Content is required"),
    contentType: z.enum(["pdf", "engagement", "poll", "video", "text"]),
    description: z.string().min(1, "Description is required"),
    order: z.number().int().min(0, "Order must be a positive number"),
    hubId: z.string().min(1, "Hub ID is required"),
    status: z.boolean(),
    previewable: z.boolean(),
})

export default function CourseLessonsTab({
    lessons,
    courseId,
    onLessonAdded,
    onLessonUpdated,
    onLessonDeleted,
    onSegmentAdded,
    onSegmentUpdated,
    onSegmentDeleted,
}: CourseLessonsTabProps) {
    const { apiCall } = useApiCall()
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userDetails);
    const hubId = user?.activeHub;
    const currentCourse = useSelector((state: any) => state.selectedCourse.course);
    const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({})
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
    const [isAddLessonLoader, setIsAddLessonLoader] = useState(false)
    const [isEditLessonOpen, setIsEditLessonOpen] = useState(false)
    const [isDeleteLessonOpen, setIsDeleteLessonOpen] = useState(false)
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
    const [isAddSegmentOpen, setIsAddSegmentOpen] = useState(false)
    const [isEditSegmentOpen, setIsEditSegmentOpen] = useState(false)
    const [currentSegment, setCurrentSegment] = useState<any | null>(null)
    const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)
    const [deleteLessonLoader, setDeleteLessonLoader] = useState<boolean>(false)
    //const { toast } = useToast()

    // Lesson form
    const lessonForm = useForm<z.infer<typeof lessonFormSchema>>({
        resolver: zodResolver(lessonFormSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    // Segment form
    const segmentForm = useForm<z.infer<typeof segmentFormSchema>>({
        resolver: zodResolver(segmentFormSchema),
        defaultValues: {
            type: "",
            content: "",
            contentType: "text",
            description: "",
            order: 0,
            hubId: "",
            status: true,
            previewable: false,
        },
    })

    // Toggle lesson expansion
    const toggleLesson = (lessonId: string) => {
        setExpandedLessons((prev) => ({
            ...prev,
            [lessonId]: !prev[lessonId],
        }))
    }

    // Get icon based on segment type
    const getSegmentIcon = (contentType: string) => {
        switch (contentType.toLowerCase()) {
            case "video":
                return <Play className="h-4 w-4 text-purple-400" />
            case "text":
                return <FileText className="h-4 w-4 text-blue-400" />
            case "image":
                return <ImageIcon className="h-4 w-4 text-green-400" />
            case "pdf":
                return <File className="h-4 w-4 text-red-400" />
            case "engagement":
                return <FileQuestion className="h-4 w-4 text-yellow-400" />
            case "poll":
                return <FileQuestion className="h-4 w-4 text-green-400" />
            default:
                return <File className="h-4 w-4 text-gray-400" />
        }
    }

    // Handle add lesson
    const handleAddLesson = async (data: z.infer<typeof lessonFormSchema>) => {
        // Create new lesson object
        const newLesson = {
            title: data.title,
            content: data.content,
            hubId: hubId,
            courseId: courseId,
        }

        try {
            const res = await apiCall({
                endpoint: `/courses/lessons`,
                method: "post",
                data: newLesson,
            })
            dispatch(addLesson({ courseId: courseId, lesson: res.data }))
            dispatch(addLessonToSelectedCourse(res.data))

        } catch (err) {
            console.error("Failed to update course:", err)
        }

        // Reset form and close dialog
        lessonForm.reset()
        setIsAddLessonOpen(false)

        // Show success toast
        // toast({
        //     title: "Lesson Added",
        //     description: "The lesson has been successfully added.",
        // })
    }

    // Handle edit lesson
    const handleEditLesson = async (data: z.infer<typeof lessonFormSchema>) => {
        if (!currentLesson) return

        // Create updated lesson object
        const updatedLesson = {
            title: data.title,
            content: data.content,
            courseId: currentCourse.id
        }

        try {
            const res = await apiCall({
                endpoint: `/courses/lessons/${currentLesson.id}`,
                method: "patch",
                data: updatedLesson,

            })


            dispatch(updateLessonInSelectedCourse(res.data))
            dispatch(updateLesson({ courseId: currentCourse.id, lesson: res.data }))
            lessonForm.reset()
            setIsEditLessonOpen(false)
            setCurrentLesson(null)
        } catch (err) {
            console.error("Failed to update course:", err)
        }
    }

    // Handle delete lesson


    // Handle add segment
    const handleAddSegment = (data: z.infer<typeof segmentFormSchema>) => {
        if (!currentLessonId) return

        // Create new segment object
        const newSegment = {
            id: `temp-${Date.now()}`, // This would be replaced by the ID from the backend
            type: data.type,
            content: data.content,
            contentType: data.contentType,
            description: data.description,
            order: data.order,
            hubId: data.hubId,
            status: data.status,
            previewable: data.previewable,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        // Call the onSegmentAdded callback
        if (onSegmentAdded) {
            onSegmentAdded(currentLessonId, newSegment)
        }

        // Reset form and close dialog
        segmentForm.reset()
        setIsAddSegmentOpen(false)
        setCurrentLessonId(null)

        // Show success toast
        // toast({
        //     title: "Segment Added",
        //     description: "The lesson segment has been successfully added.",
        // })
    }

    // Handle edit segment
    const handleEditSegment = (data: z.infer<typeof segmentFormSchema>) => {
        if (!currentLessonId || !currentSegment) return

        // Create updated segment object
        const updatedSegment = {
            ...currentSegment,
            type: data.type,
            content: data.content,
            contentType: data.contentType,
            description: data.description,
            order: data.order,
            hubId: data.hubId,
            status: data.status,
            previewable: data.previewable,
            updatedAt: new Date().toISOString(),
        }

        // Call the onSegmentUpdated callback
        if (onSegmentUpdated) {
            onSegmentUpdated(currentLessonId, updatedSegment)
        }

        // Reset form and close dialog
        segmentForm.reset()
        setIsEditSegmentOpen(false)
        setCurrentLessonId(null)
        setCurrentSegment(null)

        // Show success toast
        // toast({
        //     title: "Segment Updated",
        //     description: "The lesson segment has been successfully updated.",
        // })
    }

    // Handle delete segment
    const handleDeleteSegment = (lessonId: string, segmentId: string) => {
        // Call the onSegmentDeleted callback
        if (onSegmentDeleted) {
            onSegmentDeleted(lessonId, segmentId)
        }

        // Show success toast
        // toast({
        //     title: "Segment Deleted",
        //     description: "The lesson segment has been successfully deleted.",
        // })
    }

    // Open edit lesson dialog
    const openEditLessonDialog = (lesson: Lesson) => {
        setCurrentLesson(lesson)
        lessonForm.reset({
            title: lesson.title,
            content: lesson.content,
        })
        setIsEditLessonOpen(true)
    }

    // Open add segment dialog
    const openAddSegmentDialog = (lessonId: string) => {
        setCurrentLessonId(lessonId)
        segmentForm.reset({
            type: "",
            content: "",
            contentType: "text",
            description: "",
            order: 0,
            hubId: "",
            status: true,
            previewable: false,
        })
        setIsAddSegmentOpen(true)
    }

    // Open edit segment dialog
    const openEditSegmentDialog = (lessonId: string, segment: any) => {
        setCurrentLessonId(lessonId)
        setCurrentSegment(segment)
        segmentForm.reset({
            type: segment.type,
            content: segment.content,
            contentType: segment.contentType,
            description: segment.description,
            order: segment.order,
            hubId: segment.hubId,
            status: segment.status,
            previewable: segment.previewable,
        })
        setIsEditSegmentOpen(true)
    }

    // Sort lessons by order
    const sortedLessons = [...lessons].sort((a, b) => a.order - b.order)

    const isDeleteLessonOpenSetter = (lesson: Lesson) => {
        setCurrentLesson(lesson)
        setIsDeleteLessonOpen(true)
    }

    const isDeleteLessonOpenCloser = () => {
        setIsDeleteLessonOpen(false)
        setCurrentLesson(null)
    }

    const handleDeleteLesson = async () => {
        if (!currentLesson) return
        setDeleteLessonLoader(true)

        try {
            const res = await apiCall({
                endpoint: `/courses/lessons/delete/${currentLesson.id}`,
                method: "delete",
            })
            dispatch(deleteLesson({ courseId: res.data.course.id, lessonId: res.data.id }))
            dispatch(deleteLessonFromSelectedCourse(res.data.id))
            setCurrentLesson(null)
            setDeleteLessonLoader(false)
            setIsDeleteLessonOpen(false)
        } catch (err) {
            console.error("Failed to update course:", err)
            setDeleteLessonLoader(false)
        }
    }
    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Course Content</h3>
                <Button onClick={() => setIsAddLessonOpen(true)} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" /> Add Lesson
                </Button>

            </div>

            <div className="text-sm text-gray-300 mb-6">
                <span className="font-medium text-white">{lessons.length}</span> lessons •{" "}
                <span className="font-medium text-white">
                    {lessons.reduce((total, lesson) => total + lesson.lessonSegments.length, 0)}
                </span>{" "}
                segments
            </div>

            {sortedLessons.length === 0 ? (
                <Card className="bg-gray-800/50 border-gray-700 p-8 text-center">
                    <p className="text-gray-400">No lessons have been added to this course yet.</p>
                </Card>
            ) : (
                <div className="space-y-3">
                    {sortedLessons.map((lesson) => (
                        <Card key={lesson.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                            {/* Lesson Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                <button
                                    onClick={() => toggleLesson(lesson.id)}
                                    className="flex items-center flex-grow text-left hover:bg-gray-700/30 transition-colors rounded-md p-2"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                            <span className="text-sm font-medium text-purple-400">{lesson.order}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">{lesson.title}</h4>
                                            <p className="text-sm text-gray-400">{lesson.lessonSegments.length} segments</p>
                                        </div>
                                    </div>
                                    {expandedLessons[lesson.id] ? (
                                        <ChevronUp className="h-5 w-5 text-gray-400 ml-auto" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-400 ml-auto" />
                                    )}
                                </button>
                                <div className="flex items-center space-x-2 ml-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openAddSegmentDialog(lesson.id)}
                                        className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                                    >
                                        <FilePlus className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditLessonDialog(lesson)}
                                        className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                        onClick={() => isDeleteLessonOpenSetter(lesson)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>


                                </div>
                            </div>

                            {/* Lesson Segments */}
                            {expandedLessons[lesson.id] && (
                                <div className="border-t border-gray-700">
                                    {lesson.lessonSegments.length === 0 ? (
                                        <div className="p-4 text-center text-gray-400">
                                            <p>No segments in this lesson.</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openAddSegmentDialog(lesson.id)}
                                                className="mt-2 border-gray-700 hover:bg-gray-700 text-gray-300"
                                            >
                                                <Plus className="h-4 w-4 mr-2" /> Add Segment
                                            </Button>
                                        </div>
                                    ) : (
                                        lesson.lessonSegments
                                            .sort((a, b) => a.order - b.order)
                                            .map((segment) => (
                                                <div
                                                    key={segment.id}
                                                    className="flex items-center p-3 pl-6 hover:bg-gray-700/30 transition-colors border-b border-gray-700 last:border-b-0 group"
                                                >
                                                    <div className="mr-3">{getSegmentIcon(segment.contentType)}</div>
                                                    <div className="flex-grow">
                                                        <p className="text-sm text-gray-300">
                                                            {segment.description || segment.content.substring(0, 50)}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1 capitalize">{segment.contentType}</p>
                                                    </div>
                                                    {!segment.previewable && (
                                                        <div className="flex items-center text-xs text-gray-400 mr-2">
                                                            <Lock className="h-3 w-3 mr-1" />
                                                            <span>Premium</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => openEditSegmentDialog(lesson.id, segment)}
                                                            className="h-7 w-7 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-white">Delete Segment</AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-400">
                                                                        Are you sure you want to delete this segment? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                                                        Cancel
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDeleteSegment(lesson.id, segment.id)}
                                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}




            {/* Add Segment Dialog */}
            <Dialog open={isAddSegmentOpen} onOpenChange={setIsAddSegmentOpen}>
                <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-white">Add New Segment</DialogTitle>
                    </DialogHeader>
                    <Form {...segmentForm}>
                        <form onSubmit={segmentForm.handleSubmit(handleAddSegment)} className="space-y-4">
                            <Tabs defaultValue="basic" className="w-full">
                                <TabsList className="grid grid-cols-2 bg-gray-800 border-gray-700">
                                    <TabsTrigger value="basic" className="text-white data-[state=active]:bg-gray-700">
                                        Basic Info
                                    </TabsTrigger>
                                    <TabsTrigger value="content" className="text-white data-[state=active]:bg-gray-700">
                                        Content
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="basic" className="space-y-4 mt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={segmentForm.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Type</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter segment type"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={segmentForm.control}
                                            name="contentType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Content Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                                <SelectValue placeholder="Select content type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                            <SelectItem value="text">Text</SelectItem>
                                                            <SelectItem value="video">Video</SelectItem>
                                                            <SelectItem value="pdf">PDF</SelectItem>
                                                            <SelectItem value="engagement">Engagement</SelectItem>
                                                            <SelectItem value="poll">Poll</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={segmentForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Description</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter segment description"
                                                        {...field}
                                                        className="bg-gray-800 border-gray-700 text-white"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={segmentForm.control}
                                            name="order"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Order</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={segmentForm.control}
                                            name="hubId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Hub ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter hub ID"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={segmentForm.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                                                    <div>
                                                        <FormLabel className="text-white">Status</FormLabel>
                                                        <p className="text-xs text-gray-400">Is this segment active?</p>
                                                    </div>
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={segmentForm.control}
                                            name="previewable"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                                                    <div>
                                                        <FormLabel className="text-white">Previewable</FormLabel>
                                                        <p className="text-xs text-gray-400">Can users preview this segment?</p>
                                                    </div>
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="content" className="space-y-4 mt-4">
                                    <FormField
                                        control={segmentForm.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Content</FormLabel>
                                                <FormControl>
                                                    {segmentForm.watch("contentType") === "video" ? (
                                                        <div className="space-y-2">
                                                            <Input
                                                                placeholder="Enter video URL"
                                                                {...field}
                                                                className="bg-gray-800 border-gray-700 text-white"
                                                            />
                                                            <p className="text-xs text-gray-400">Enter a YouTube, Vimeo, or direct video URL</p>
                                                        </div>
                                                    ) : segmentForm.watch("contentType") === "pdf" ? (
                                                        <div className="space-y-2">
                                                            <Input
                                                                placeholder="Enter PDF URL"
                                                                {...field}
                                                                className="bg-gray-800 border-gray-700 text-white"
                                                            />
                                                            <p className="text-xs text-gray-400">Enter a URL to a PDF document</p>
                                                        </div>
                                                    ) : (
                                                        <Textarea
                                                            placeholder="Enter content"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                                                        />
                                                    )}
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>
                            </Tabs>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                                    Add Segment
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Edit Segment Dialog */}
            <Dialog open={isEditSegmentOpen} onOpenChange={setIsEditSegmentOpen}>
                <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-white">Edit Segment</DialogTitle>
                    </DialogHeader>
                    <Form {...segmentForm}>
                        <form onSubmit={segmentForm.handleSubmit(handleEditSegment)} className="space-y-4">
                            <Tabs defaultValue="basic" className="w-full">
                                <TabsList className="grid grid-cols-2 bg-gray-800 border-gray-700">
                                    <TabsTrigger value="basic" className="text-white data-[state=active]:bg-gray-700">
                                        Basic Info
                                    </TabsTrigger>
                                    <TabsTrigger value="content" className="text-white data-[state=active]:bg-gray-700">
                                        Content
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="basic" className="space-y-4 mt-4">
                                    {/* Same fields as Add Segment Dialog */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={segmentForm.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Type</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter segment type"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={segmentForm.control}
                                            name="contentType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Content Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                                <SelectValue placeholder="Select content type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                            <SelectItem value="text">Text</SelectItem>
                                                            <SelectItem value="video">Video</SelectItem>
                                                            <SelectItem value="pdf">PDF</SelectItem>
                                                            <SelectItem value="engagement">Engagement</SelectItem>
                                                            <SelectItem value="poll">Poll</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={segmentForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Description</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter segment description"
                                                        {...field}
                                                        className="bg-gray-800 border-gray-700 text-white"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={segmentForm.control}
                                            name="order"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Order</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={segmentForm.control}
                                            name="hubId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Hub ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter hub ID"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-700 text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={segmentForm.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                                                    <div>
                                                        <FormLabel className="text-white">Status</FormLabel>
                                                        <p className="text-xs text-gray-400">Is this segment active?</p>
                                                    </div>
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={segmentForm.control}
                                            name="previewable"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                                                    <div>
                                                        <FormLabel className="text-white">Previewable</FormLabel>
                                                        <p className="text-xs text-gray-400">Can users preview this segment?</p>
                                                    </div>
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="content" className="space-y-4 mt-4">
                                    <FormField
                                        control={segmentForm.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Content</FormLabel>
                                                <FormControl>
                                                    {segmentForm.watch("contentType") === "video" ? (
                                                        <div className="space-y-2">
                                                            <Input
                                                                placeholder="Enter video URL"
                                                                {...field}
                                                                className="bg-gray-800 border-gray-700 text-white"
                                                            />
                                                            <p className="text-xs text-gray-400">Enter a YouTube, Vimeo, or direct video URL</p>
                                                        </div>
                                                    ) : segmentForm.watch("contentType") === "pdf" ? (
                                                        <div className="space-y-2">
                                                            <Input
                                                                placeholder="Enter PDF URL"
                                                                {...field}
                                                                className="bg-gray-800 border-gray-700 text-white"
                                                            />
                                                            <p className="text-xs text-gray-400">Enter a URL to a PDF document</p>
                                                        </div>
                                                    ) : (
                                                        <Textarea
                                                            placeholder="Enter content"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                                                        />
                                                    )}
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>
                            </Tabs>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                                    Update Segment
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            {/* Create Lesson Dialog */}
            <ModalComponent
                dialogDisplay={isAddLessonOpen}
                dialogDisplaySetter={() => setIsAddLessonOpen(false)}
                title={"Add New Lesson"}
            >
                <div>
                    <Form {...lessonForm}>
                        <form onSubmit={lessonForm.handleSubmit(handleAddLesson)} className="space-y-4">
                            <FormField
                                control={lessonForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter lesson title"
                                                {...field}
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={lessonForm.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter lesson content"
                                                {...field}
                                                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4 justify-end">

                                <Button type="button" onClick={() => setIsAddLessonOpen(false)} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                    Cancel
                                </Button>

                                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                                    Add Lesson
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </ModalComponent>
            {/* Edit Lesson Dialog */}
            <ModalComponent
                dialogDisplay={isEditLessonOpen}
                dialogDisplaySetter={() => setIsEditLessonOpen(false)}
                title={"Edit Lesson"}
            >
                <div >
                    <Form {...lessonForm}>
                        <form onSubmit={lessonForm.handleSubmit(handleEditLesson)} className="space-y-4">
                            <FormField
                                control={lessonForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter lesson title"
                                                {...field}
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={lessonForm.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter lesson content"
                                                {...field}
                                                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4 justify-end">

                                <Button type="button" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                    Cancel
                                </Button>

                                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                                    Update Lesson
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </ModalComponent>
            <DeleteConfirm
                dialogDisplay={isDeleteLessonOpen}
                dialogDisplaySetter={isDeleteLessonOpenCloser}
                handleDelete={handleDeleteLesson}
                loader={deleteLessonLoader}
                text={"Are you sure you want to delete this lesson? This action cannot be undone and will also delete all segments within this lesson."}
            />

            {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Lesson</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to delete this lesson? This action cannot be undone and will also delete
                            all segments within this lesson.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-800">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    )
}
