"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "../loader/Loader"
import { AnimatePresence, motion } from "framer-motion"

interface MobileBottomSheetProps {
    isOpen: boolean
    onClose: () => void
    title?: string | (() => React.ReactNode)
    withFooter?: boolean
    handleAction?: () => void
    loader?: boolean
    children: React.ReactNode
    actionTitle?: string
}

export function MobileBottomSheet({
    isOpen,
    onClose,
    title,
    withFooter,
    handleAction,
    loader,
    children,
    actionTitle,
}: MobileBottomSheetProps) {
    const [isRendered, setIsRendered] = useState(false)

    // Handle body scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    // Handle component mounting
    useEffect(() => {
        setIsRendered(true)
        return () => setIsRendered(false)
    }, [])

    // Don't render anything on the server
    if (!isRendered) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50 touch-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 z-50 max-h-[60vh] bg-background rounded-t-xl overflow-hidden flex flex-col"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Pull indicator */}
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2" />

                        {/* Content */}
                        <div className="overflow-y-auto p-4 flex-1">
                            {title && (
                                <div className="mb-4 text-xl font-semibold">{typeof title === "function" ? title() : title}</div>
                            )}

                            {children}
                        </div>

                        {/* Footer */}
                        {withFooter && (
                            <div className="p-4 border-t flex justify-end gap-2 bg-background">
                                <Button variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                {!loader ? (
                                    <Button variant="destructive" onClick={handleAction}>
                                        {actionTitle}
                                    </Button>
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

