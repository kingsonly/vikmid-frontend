"use client"

import type React from "react"
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Trash2, Plus, HelpCircle, FileUp, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useApiCall } from "@/utils/useApiCall"
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "@/store/course/CourseSlice"
// Define the CourseType enum to match your backend
enum CourseType {
  ON_DEMAND = "on-demand",
  COHORT = "cohort",
  CHALLENGE = "challenge",
}

// Define the question type for enrollment questions
const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  required: z.boolean().default(false),
  type: z.enum(["text", "multiple_choice", "checkbox"]),
  options: z.array(z.string()).optional(),
})

// Define the form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number.parseFloat(val)), { message: "Price must be a valid number" }),
  status: z.boolean().default(false),
  withTrailer: z.boolean().default(false),
  courseType: z.nativeEnum(CourseType),
  withDiscount: z.boolean().default(false),
  discountPrice: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number.parseFloat(val)), { message: "Discount price must be a valid number" }),
  file: z.instanceof(FileList).refine((files) => files.length === 1, { message: "Course image/video is required" }),
  withBatch: z.boolean().default(false),
  withCertificate: z.boolean().default(false),
  enrollmentQuestions: z.array(questionSchema).optional(),
})

type FormValues = z.infer<typeof formSchema>
interface courseInterface {
  onClose: () => void
}
export default function CreateNewCourse({ onClose }: courseInterface) {
  const { apiCall } = useApiCall()
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.userDetails);
  const hubId = user?.activeHub;
  const creatorId = user?.id;
  const [filePreview, setFilePreview] = useState<string | null>(null)

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      courseType: CourseType.ON_DEMAND,
      withDiscount: false,
      discountPrice: "",
      withBatch: false,
      withCertificate: false,
      enrollmentQuestions: [],
    },
  })

  // Set up field array for dynamic enrollment questions
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "enrollmentQuestions",
  })

  // Watch the withTrailer value to determine file type
  const withTrailer = form.watch("withTrailer")

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      // Create a preview URL for the file
      const fileUrl = URL.createObjectURL(file)
      setFilePreview(fileUrl)
    }
  }

  // Add a new enrollment question
  const addEnrollmentQuestion = () => {
    append({
      question: "",
      required: false,
      type: "text",
      options: [],
    })
  }

  // Add a new option to a multiple choice question
  const addOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`enrollmentQuestions.${questionIndex}.options`) || []
    form.setValue(`enrollmentQuestions.${questionIndex}.options`, [...currentOptions, ""])
  }

  // Remove an option from a multiple choice question
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = form.getValues(`enrollmentQuestions.${questionIndex}.options`) || []
    const newOptions = currentOptions.filter((_, i) => i !== optionIndex)
    form.setValue(`enrollmentQuestions.${questionIndex}.options`, newOptions)
  }

  const onSubmit = async (data: FormValues) => {
    const file = data.file[0];
    const formData = new FormData();

    // Append file (if present)
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }
    if (data.enrollmentQuestions && data.enrollmentQuestions.length > 0) {
      formData.append("enrollmentQuestions", JSON.stringify(data.enrollmentQuestions));
    }

    // Append other form fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("courseType", data.courseType);

    formData.append("hubId", hubId.toString());
    formData.append("creatorId", creatorId.toString());

    // Convert booleans and numbers to strings
    formData.append("withBatch", data.withBatch ? "true" : "false");
    formData.append("status", "false");

    if (data.price) {
      formData.append("price", parseFloat(data.price).toString());
    }

    if (data.withDiscount) {
      formData.append("withDiscount", "true");
      if (data.discountPrice) {
        formData.append("discountPrice", parseFloat(data.discountPrice).toString());
      }
    } else {
      formData.append("withDiscount", "false");
    }

    if (file.type.startsWith('image/')) {
      formData.append("withTrailer", "false");
      console.log("image")
    } else if (file.type.startsWith('video/')) {
      formData.append("withTrailer", "true");
      console.log("video")
    } else {
      formData.append("withTrailer", "false");
      console.log("image")
    }

    if (data.withCertificate) {
      formData.append("withCertificate", "true");
    }

    try {

      const response = await apiCall({
        endpoint: `/courses`,
        method: "post",
        showToast: true,
        data: formData, // ✅ send FormData
        successMessage: `Created new page`,
        headers: {
          "Content-Type": "multipart/form-data" // often optional in browsers, but safe to add
        }
      });

      if (response) {
        dispatch(addCourse(response.data.data))
        onClose();
        console.log("new course", fields);
      }
    } catch (error) {
      console.error("Error creating new course :", error);
    }
  };


  return (
    <div className="max-w-3xl">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="bg-black  ">
            <CardContent className="">
              <div className="space-y-6">
                {/* Basic Course Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Basic Information</h2>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Course Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. NestJS for Beginners"
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white focus:border-purple-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what students will learn in this course"
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Course Type */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Course Type</h2>

                  <FormField
                    control={form.control}
                    name="courseType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-white">Select Course Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={CourseType.ON_DEMAND} id="on-demand" />
                              <Label htmlFor="on-demand" className="flex flex-col cursor-pointer">
                                <span className="font-medium text-white">On-Demand Course</span>
                                <span className="text-xs text-gray-300">Self-paced, always available</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={CourseType.COHORT} id="cohort" />
                              <Label htmlFor="cohort" className="flex flex-col cursor-pointer">
                                <span className="font-medium text-white">Cohort Course</span>
                                <span className="text-xs text-gray-300">Time-bound with batches</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={CourseType.CHALLENGE} id="challenge" />
                              <Label htmlFor="challenge" className="flex flex-col cursor-pointer">
                                <span className="font-medium text-white">Challenge Course</span>
                                <span className="text-xs text-gray-300">Gamified learning experience</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Pricing</h2>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Price</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="px-3 py-2 rounded-l-md bg-gray-600 text-gray-200">₦</span>
                            <Input
                              type="text"
                              placeholder="0.00"
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 rounded-l-none"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-gray-300">Set to 0 for a free course</FormDescription>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="withDiscount"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base text-white">Offer Discount</FormLabel>
                          <FormDescription className="text-gray-300">
                            Enable to offer a discounted price
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("withDiscount") && (
                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Discount Price</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="px-3 py-2 rounded-l-md bg-gray-600 text-gray-200">₦</span>
                              <Input
                                type="text"
                                placeholder="0.00"
                                {...field}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 rounded-l-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Course Features */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">Course Features</h2>

                  <div className="grid grid-cols-1  gap-4">
                    <FormField
                      control={form.control}
                      name="withCertificate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-white">Certificate</FormLabel>
                            <FormDescription className="text-gray-300">Offer completion certificate</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("courseType") !== CourseType.ON_DEMAND && (
                    <FormField
                      control={form.control}
                      name="withBatch"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-white">Enable Batches</FormLabel>
                            <FormDescription className="text-gray-300">Group students into batches</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* File Upload - Always required */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white">
                    Course Image / Video
                  </h2>

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Upload  Course Image / Video
                          <span className="text-red-300 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-center justify-center w-full">
                            <label
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-600 hover:border-purple-400 bg-gray-700/50"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileUp className="w-8 h-8 mb-3 text-purple-300" />
                                <p className="mb-2 text-sm text-gray-200">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-300">
                                  JPG, PNG,  WebP, MP4, WebM or MOV (MAX. 5MB)
                                </p>
                              </div>
                              <input
                                id="file-upload"
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={(e) => {
                                  onChange(e.target.files)
                                  handleFileChange(e)
                                }}
                                {...fieldProps}
                              />
                            </label>
                          </div>
                        </FormControl>
                        {filePreview && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-300 mb-2">File selected:</p>
                            <div className="flex items-center p-2 bg-gray-700/50 rounded-md">
                              <FileUp className="w-5 h-5 mr-2 text-purple-300" />
                              <span className="text-sm text-gray-200 truncate">
                                {value && (value as FileList)[0]?.name}
                              </span>
                            </div>
                          </div>
                        )}
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Enrollment Questions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Enrollment Questions</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-4 w-4 text-gray-300" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-gray-800 text-white border-gray-700">
                          <p>Questions that students must answer before enrolling in your course.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="border border-gray-700 rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">Question {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-8 w-8 text-red-300 hover:text-red-200 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name={`enrollmentQuestions.${index}.question`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Question Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. What is your experience level?"
                                {...field}
                                className="bg-gray-700 border-gray-600 text-white focus:border-purple-400"
                              />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`enrollmentQuestions.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Question Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-purple-400">
                                  <SelectValue placeholder="Select question type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`enrollmentQuestions.${index}.required`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                            <FormLabel className="text-base text-white">Required Question</FormLabel>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Options for multiple choice or checkbox questions */}
                      {(form.watch(`enrollmentQuestions.${index}.type`) === "multiple_choice" ||
                        form.watch(`enrollmentQuestions.${index}.type`) === "checkbox") && (
                          <div className="space-y-3">
                            <FormLabel className="text-white">Options</FormLabel>
                            {(form.watch(`enrollmentQuestions.${index}.options`) || []).map((_, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <Input
                                  placeholder={`Option ${optionIndex + 1}`}
                                  value={form.watch(`enrollmentQuestions.${index}.options.${optionIndex}`) || ""}
                                  onChange={(e) => {
                                    const newOptions = [...(form.getValues(`enrollmentQuestions.${index}.options`) || [])]
                                    newOptions[optionIndex] = e.target.value
                                    form.setValue(`enrollmentQuestions.${index}.options`, newOptions)
                                  }}
                                  className="bg-gray-700 border-gray-600 text-white focus:border-purple-400"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(index, optionIndex)}
                                  className="h-8 w-8 text-red-300 hover:text-red-200 hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(index)}
                              className="mt-2 border-gray-700 hover:bg-gray-700 text-gray-200 hover:text-white"
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add Option
                            </Button>
                          </div>
                        )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addEnrollmentQuestion}
                    className="w-full border-gray-700 hover:bg-gray-700 text-gray-200 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Enrollment Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white hover:opacity-90 transition-opacity px-8"
            >
              Create Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
