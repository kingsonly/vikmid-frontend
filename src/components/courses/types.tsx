export type Lesson = {
    id: string
    title: string
    type: "video" | "pdf" | "mcq"
    duration?: number
    size?: string
    url?: string
    questions?: number
  }
  
  export type Topic = {
    id: string
    title: string
    lessons: Lesson[]
  }
  
  export type Course = {
    id: number
    title: string
    description: string
    price: number
    banner: string
    content: Topic[]
    totalStudents: number
    totalBatches: number
    lastUpdated: string
    students: { id: number; name: string; email: string; progress: number; joinedDate: string }[]
    batches: any[]
    comments: any[]
  }
  
  