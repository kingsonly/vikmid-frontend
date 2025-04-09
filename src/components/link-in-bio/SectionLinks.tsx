'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiCall } from '@/utils/useApiCall'
import { getSocialPlatform } from '@/utils/helpers'
import { LoadingSpinner } from '../loader/Loader'
import { Card, CardContent } from '../ui/card'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Link } from '@/store/link-in-bio/interface/linkInBioInterface'
import LinkUpdateModal from './LinkUpdateModal'
import ListComponent from '../ListComponent/ListComponent'
import DragAndDropWrapper from '../dragAndDropWrapper/DragAndDropWrapper'
import { useDrag, useDrop } from "react-dnd"
import { motion } from "framer-motion"
interface linkInterface {
    link: Link
    index: number
    updateLink: (link: Link) => void
    viewStats: () => void
    deleteLink: (link: Link) => void
    onMove: (dragIndex: number, hoverIndex: number) => void
}
interface DragItem {
    type: string
    id: string
    originalIndex: number
}
export default function SectionLinks({ link, updateLink, deleteLink, viewStats, onMove, index, }: linkInterface) {


    const [{ isDragging }, drag] = useDrag({
        type: "SOCIAL_ACCOUNT",
        item: { type: "SOCIAL_ACCOUNT", id: link.id, originalIndex: index },
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
    return (

        <motion.div
            ref={(node) => {
                if (node) {
                    drag(drop(node));
                }
            }}
            initial={{ opacity: 0, height: 0 }}
            key={index}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
        >
            <ListComponent
                key={link.id}
                view={viewStats}
                edit={() => { updateLink(link) }}
                deleteData={() => { deleteLink(link) }}
                title={link.title}
                data={link}
                isStats
            />
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