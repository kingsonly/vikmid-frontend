import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, Lesson, LessonSegment } from './interface/CourseInterface';

interface SelectedCourseState {
    course: Course | null;
}

const initialState: SelectedCourseState = {
    course: null,
};

const selectedCourseSlice = createSlice({
    name: 'selectedCourse',
    initialState,
    reducers: {
        setSelectedCourse(state, action: PayloadAction<Course>) {
            state.course = action.payload;
        },
        clearSelectedCourse(state) {
            state.course = null;
        },
        updateSelectedCourse(state, action: PayloadAction<Partial<Course>>) {
            if (state.course) {
                state.course = {
                    ...state.course,
                    ...action.payload,
                };
            }
        },

        addLessonToSelectedCourse(state, action: PayloadAction<Lesson>) {
            if (state.course) {
                state.course.lessons.push(action.payload);
            }
        },
        updateLessonInSelectedCourse(state, action: PayloadAction<Lesson>) {
            if (state.course) {
                const index = state.course.lessons.findIndex(l => l.id === action.payload.id);
                if (index !== -1) {
                    state.course.lessons[index] = {
                        ...state.course.lessons[index],
                        ...action.payload,
                    };
                }
            }
        },
        deleteLessonFromSelectedCourse(
            state,
            action: PayloadAction<string> // lessonId
        ) {
            if (state.course) {
                state.course.lessons = state.course.lessons.filter(
                    lesson => lesson.id !== action.payload
                );
            }
        },
        addSegmentToLessonInSelectedCourse(
            state,
            action: PayloadAction<{ lessonId: string; segment: LessonSegment }>
        ) {
            if (state.course) {
                const lesson = state.course.lessons.find(l => l.id === action.payload.lessonId);
                if (lesson) {
                    lesson.lessonSegments.push(action.payload.segment);
                }
            }
        },
        updateSegmentInLessonInSelectedCourse(
            state,
            action: PayloadAction<{ lessonId: string; segment: LessonSegment }>
        ) {
            if (state.course) {
                const lesson = state.course.lessons.find(l => l.id === action.payload.lessonId);
                if (lesson) {
                    const segIndex = lesson.lessonSegments.findIndex(
                        s => s.id === action.payload.segment.id
                    );
                    if (segIndex !== -1) {
                        lesson.lessonSegments[segIndex] = {
                            ...lesson.lessonSegments[segIndex],
                            ...action.payload.segment,
                        };
                    }
                }
            }
        },
    },
});

export const {
    setSelectedCourse,
    clearSelectedCourse,
    updateSelectedCourse,
    addLessonToSelectedCourse,
    updateLessonInSelectedCourse,
    addSegmentToLessonInSelectedCourse,
    updateSegmentInLessonInSelectedCourse,
    deleteLessonFromSelectedCourse,
} = selectedCourseSlice.actions;

export default selectedCourseSlice.reducer;
