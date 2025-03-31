'use client'
import { useState, useEffect } from 'react'
import { useApiCall } from '@/utils/useApiCall'
import { SocialLink } from '../../store/link-in-bio/interface/linkInBioInterface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { useDrag, useDrop } from "react-dnd"
import { Trash2, ChartColumnBig, Pencil } from 'lucide-react'
import { getSocialPlatform } from '@/utils/helpers';
interface DraggableSocialAccountProps {
    account: SocialLink
    index: number
    onMove: (dragIndex: number, hoverIndex: number) => void
    onDelete: (account: SocialLink) => void
    handleEditClick: (account: SocialLink) => void
}
interface DragItem {
    type: string
    id: string
    originalIndex: number
}

export default function SocialLinkList({ account, index, onMove, onDelete, handleEditClick }: DraggableSocialAccountProps) {
    const [{ isDragging }, drag] = useDrag({
        type: "SOCIAL_ACCOUNT",
        item: { type: "SOCIAL_ACCOUNT", id: account.id, originalIndex: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // const [, drop] = useDrop({
    //     accept: "SOCIAL_ACCOUNT",
    //     drop(item: DragItem) {
    //         if (item.index === index) return
    //         onMove(item.index, index)
    //         item.index = index
    //     },
    // })

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "SOCIAL_ACCOUNT",
        drop: (item: DragItem) => {
            if (item.originalIndex !== index) {
                onMove(item.originalIndex, index);
                item.originalIndex = index;
                console.log(item)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const socialIcon = (socialNetworkName: string) => {
        let icon = getSocialPlatform(socialNetworkName)
        if (!icon) return
        return <icon.icon />
    }

    return (
        <motion.div

            ref={(node) => {
                if (node) {
                    drag(drop(node));
                }
            }}
            layout
            style={
                {
                    opacity: isDragging ? 0.5 : 1,
                    // position: 'relative',
                    // width: '100%',
                    // height: '100%'
                }
            }
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Card className={'bg-gray-700'}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between cursor-move">
                        <div className="flex items-center space-x-2">
                            {socialIcon(account.socialNetworkName)}

                            <div>
                                <h3 className="font-medium">{account.socialNetworkName}</h3>
                                <p className="text-sm text-muted-foreground">{account.link}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <ChartColumnBig className="h-4 w-4 ml-2 cursor-pointer text-sky-400/100" />
                            <Pencil onClick={() => handleEditClick(account)} className="h-4 w-4 ml-2 cursor-pointer text-green-500" />
                            <Trash2 onClick={() => onDelete(account)} className="h-4 w-4 ml-2 cursor-pointer text-red-500" />

                        </div>

                    </div>
                </CardContent>
            </Card>
            {isOver && canDrop && (
                <motion.div
                    //layout
                    initial={{ height: 0 }}
                    animate={{ height: 50 }}
                    exit={{ height: 0 }}
                    className="bg-green-500 border border-green-500 rounded-md mb-2"
                >
                    <p className="text-center text-white">Drop Here</p>
                </motion.div>
            )}
        </motion.div>
    )
}