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
import { Draggable } from '@hello-pangea/dnd'
import SectionListComponent from './SectionListComponent'
interface linkInterface {
    link: Link
    index: number
    updateLink: (link: Link) => void
    viewStats: () => void
    deleteLink: (link: Link) => void
}
interface DragItem {
    type: string
    id: string
    originalIndex: number
}
export default function SectionLinks({ link, updateLink, deleteLink, viewStats, index, }: linkInterface) {





    return (
        <Draggable draggableId={link.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        ...provided.draggableProps.style,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        key={index}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                    >
                        <SectionListComponent
                            key={link.id}
                            view={viewStats}
                            edit={() => { updateLink(link) }}
                            deleteData={() => { deleteLink(link) }}
                            title={link.title}
                            data={link}
                            isStats
                        />

                    </motion.div>
                </div>
            )}
        </Draggable >


    )
}