"use client"
import type { SocialLink } from "../../store/link-in-bio/interface/linkInBioInterface"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useDrag, useDrop } from "react-dnd"
import { Trash2, BarChartBigIcon as ChartColumnBig, Pencil, GripVertical } from "lucide-react"
import { getSocialPlatform } from "@/utils/helpers"

interface DraggableSocialAccountProps {
    account: SocialLink
    index: number
    onMove: (dragIndex: number, hoverIndex: number) => void
    onDelete: (account: SocialLink) => void
    handleEditClick: (account: SocialLink) => void
    handleViewStatsClick: (account: SocialLink) => void
}

interface DragItem {
    type: string
    id: string
    originalIndex: number
}

export default function SocialLinkList({
    account,
    index,
    onMove,
    onDelete,
    handleEditClick,
    handleViewStatsClick,
}: DraggableSocialAccountProps) {
    const [{ isDragging }, drag] = useDrag({
        type: "SOCIAL_ACCOUNT",
        item: { type: "SOCIAL_ACCOUNT", id: account.id, originalIndex: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "SOCIAL_ACCOUNT",
        drop: (item: DragItem) => {
            if (item.originalIndex !== index) {
                onMove(item.originalIndex, index)
                item.originalIndex = index
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const socialIcon = (socialNetworkName: string) => {
        const icon = getSocialPlatform(socialNetworkName)
        if (!icon) return null
        return <icon.icon className="h-5 w-5 flex-shrink-0" />
    }

    return (
        <motion.div
            ref={(node) => {
                if (node) {
                    drag(drop(node));
                }
            }}
            layout
            style={{ opacity: isDragging ? 0.5 : 1 }}
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
        >
            <Card className="bg-gray-700 hover:bg-gray-600/80 transition-colors">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between">
                        {/* Drag handle and social info */}
                        <div className="flex items-center space-x-3 cursor-move">
                            <GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0 hidden sm:block" />

                            <div className="flex items-center space-x-3 overflow-hidden">
                                {socialIcon(account.socialNetworkName)}

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium text-base">{account.socialNetworkName}</h3>
                                    <p className="text-sm text-muted-foreground truncate max-w-[150px] sm:max-w-[250px]">
                                        {account.link}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons - Larger on mobile */}
                        <div className="flex justify-end items-center gap-1 sm:gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-400"
                                aria-label="Analytics"
                                onClick={() => handleViewStatsClick(account)}
                            >
                                <ChartColumnBig className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500"
                                onClick={() => handleEditClick(account)}
                                aria-label="Edit"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                                onClick={() => onDelete(account)}
                                aria-label="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Drop indicator */}
            {isOver && canDrop && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 50 }}
                    exit={{ height: 0 }}
                    className="bg-green-500 border border-green-500 rounded-md mb-2 flex items-center justify-center"
                >
                    <p className="text-center text-white">Drop Here</p>
                </motion.div>
            )}
        </motion.div>
    )
}

