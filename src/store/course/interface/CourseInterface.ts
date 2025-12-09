export interface LessonSegment {
    id: string;
    type: string;
    content: string;
    contentType: string;
    description: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    hubId: string;
    status: boolean;
    previewable: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    content: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    hubId: string;
    lessonSegments: LessonSegment[];
}

export interface Creator {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isCreator: boolean;
    planId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    withTrailer: boolean;
    courseType: string;
    withDiscount: boolean;
    enrollmentQuestions: string | null;
    discountPrice: string | null;
    file: string;
    withBatch: boolean;
    withCertificate: boolean;
    hubId: number;
    creator: Creator;
    lessons: Lesson[];
}

export interface CourseState {
    courses: Course[];
}