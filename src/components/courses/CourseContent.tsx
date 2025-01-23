import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, Pencil, Video, FileText, List, Eye } from "lucide-react"
import type { Topic, Lesson } from "@/components/courses/types"

interface CourseContentProps {
  content: Topic[]
  expandedTopics: string[]
  onAddTopic: () => void
  onAddLesson: (topicId: string) => void
  onDeleteTopic: (topicId: string) => void
  onToggleTopicExpansion: (topicId: string) => void
  onEditLesson: (lesson: Lesson) => void
  onDeleteLesson: (lessonId: string) => void
  onLessonClick: (lesson: Lesson) => void
}

export const CourseContent: React.FC<CourseContentProps> = ({
  content,
  expandedTopics,
  onAddTopic,
  onAddLesson,
  onDeleteTopic,
  onToggleTopicExpansion,
  onEditLesson,
  onDeleteLesson,
  onLessonClick,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onAddTopic} className="mb-4 bg-gray-700 text-white hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" /> Add New Topic
        </Button>
        {content.map((topic) => (
          <div key={topic.id} className="border rounded-lg p-4 mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onToggleTopicExpansion(topic.id)}
            >
              <h3 className="text-lg font-semibold">{topic.title}</h3>
              <div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddLesson(topic.id)
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteTopic(topic.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedTopics.includes(topic.id) ? "transform rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
            {expandedTopics.includes(topic.id) && (
              <div className="mt-4">
                <div className="space-y-2">
                  {topic.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex justify-between items-center p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                      onClick={() => onLessonClick(lesson)}
                    >
                      <span>{lesson.title}</span>
                      <span>
                        {lesson.type === "video" && <Video className="h-4 w-4 inline mr-2" />}
                        {lesson.type === "pdf" && <FileText className="h-4 w-4 inline mr-2" />}
                        {lesson.type === "mcq" && <List className="h-4 w-4 inline mr-2" />}
                        {lesson.type}
                      </span>
                      <span className="text-sm text-gray-400">
                        {lesson.type === "video" && lesson.duration && (
                          <>
                            {Math.floor(lesson.duration / 60)} min {lesson.duration % 60} sec
                          </>
                        )}
                        {lesson.type === "pdf" && lesson.size && <>{lesson.size} MB</>}
                        {lesson.type === "mcq" && lesson.questions && <>Questions: {lesson.questions}</>}
                      </span>
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEditLesson(lesson)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteLesson(lesson.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

