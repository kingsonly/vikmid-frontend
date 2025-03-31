'use client'

import React, { useState } from 'react'
import { ErrorBoundary } from "react-error-boundary"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function DragAndDropWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary
            fallback={<div className="p-4 text-red-500">An error occurred with drag and drop. Please refresh the page.</div>}
        >
            <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </ErrorBoundary>
    )
}