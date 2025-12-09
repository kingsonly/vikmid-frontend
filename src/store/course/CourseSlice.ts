import { LessonSegment, Lesson, Creator, Course, CourseState } from './interface/CourseInterface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: CourseState = {
    courses: [],
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<Course[]>) {
            state.courses = action.payload;
        },
        addCourse(state, action: PayloadAction<Course>) {
            state.courses = [action.payload, ...state.courses];
        },
        appendCourses(state, action: PayloadAction<Course[]>) {
            state.courses = [...state.courses, ...action.payload];
        },
        clearCourses(state) {
            state.courses = [];
        },
        updateCourseDetails(state, action: PayloadAction<Course>) {

            const index = state.courses.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.courses[index] = { ...state.courses[index], ...action.payload };
            }
        },
        deleteCourse(state, action: PayloadAction<string>) {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
        addLesson(state, action: PayloadAction<{ courseId: string; lesson: Lesson }>) {
            const course = state.courses.find(c => c.id === action.payload.courseId);
            if (course) {
                course.lessons.push(action.payload.lesson);
            }
        },
        updateLesson(
            state,
            action: PayloadAction<{ courseId: string; lesson: Lesson }>
        ) {
            const { courseId, lesson } = action.payload;
            const course = state.courses.find(c => c.id === courseId);
            if (course) {
                const index = course.lessons.findIndex(l => l.id === lesson.id);
                if (index !== -1) {
                    course.lessons[index] = { ...course.lessons[index], ...lesson };
                }
            }
        },
        deleteLesson(
            state,
            action: PayloadAction<{ courseId: string; lessonId: string }>
        ) {
            const { courseId, lessonId } = action.payload;
            const course = state.courses.find(c => c.id === courseId);
            if (course) {
                course.lessons = course.lessons.filter(l => l.id !== lessonId);
            }
        },
        addLessonSegment(
            state,
            action: PayloadAction<{ courseId: string; lessonId: string; segment: LessonSegment }>
        ) {
            const course = state.courses.find(c => c.id === action.payload.courseId);
            const lesson = course?.lessons.find(l => l.id === action.payload.lessonId);
            if (lesson) {
                lesson.lessonSegments.push(action.payload.segment);
            }
        },
    },
});

export const {
    setCourses,
    clearCourses,
    updateCourseDetails,
    addLesson,
    addLessonSegment,
    appendCourses,
    addCourse,
    deleteCourse,
    deleteLesson,
    updateLesson,
} = courseSlice.actions;

export default courseSlice.reducer;
