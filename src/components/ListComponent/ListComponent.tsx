"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChartColumnBig, Eye, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useDrag, useDrop } from "react-dnd"
import { Draggable } from "@hello-pangea/dnd"

interface ListComponentInterface {
    view: (data: any) => any
    edit: (data: any) => any
    deleteData: (data: any) => any
    index: number
    title: string
    data: any
    isStats?: boolean
    capitalize?: boolean
}


interface DragItem {
    type: string
    id: string
    originalIndex: number
}

export default function ListComponent({ data, deleteData, edit, view, index, title, isStats = false, capitalize = false }: ListComponentInterface) {


    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}

                    style={{
                        userSelect: "none",
                        ...provided.draggableProps.style,
                    }}
                    className="bg-gray-700 hover:bg-gray-600 transition-colors mb-2">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {/* Title - Full width on mobile, normal on desktop */}
                            <div className="flex-1 min-w-0">
                                <h3 className={`${capitalize && "capitalize"} font-medium text-base sm:text-lg`}>{title}</h3>
                            </div>

                            {/* Action buttons - Larger on mobile, normal on desktop */}
                            <div className="flex justify-end items-center gap-1 sm:gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-400"
                                    onClick={() => view(data)}
                                    aria-label="View"
                                >
                                    {
                                        !isStats ? <Eye className="h-4 w-4 sm:h-4 sm:w-4" /> : <ChartColumnBig className="h-4 w-4 sm:h-4 sm:w-4" />
                                    }

                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500"
                                    onClick={() => edit(data)}
                                    aria-label="Edit"
                                >
                                    <Pencil className="h-4 w-4 sm:h-4 sm:w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                                    onClick={() => deleteData(data)}
                                    aria-label="Delete"
                                >
                                    <Trash2 className="h-4 w-4 sm:h-4 sm:w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </Draggable >

    )
}


