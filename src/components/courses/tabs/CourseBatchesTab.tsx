"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Clock, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Batch {
    id: string
    name: string
    registrationStartDate: string
    registrationEndDate: string
    courseStartDate: string
    courseEndDate: string
    contentReleaseType: string
    allowPostBatchAccess: boolean
    priceTiers: PriceTier[]
    enrollmentCount?: number
    capacity?: number
}

interface PriceTier {
    id: string
    name: string
    price: number
    startDate: string
    endDate: string
}

interface CourseBatchesTabProps {
    courseId: string
    withBatch: boolean
}

export default function CourseBatchesTab({ courseId, withBatch }: CourseBatchesTabProps) {
    const [batches, setBatches] = useState<Batch[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!withBatch) {
            setLoading(false)
            return
        }

        const fetchBatches = async () => {
            try {
                const mockBatches: Batch[] = [
                    {
                        id: "batch-1",
                        name: "Spring 2023",
                        registrationStartDate: "2023-01-15T00:00:00Z",
                        registrationEndDate: "2023-02-15T00:00:00Z",
                        courseStartDate: "2023-02-20T00:00:00Z",
                        courseEndDate: "2023-04-20T00:00:00Z",
                        contentReleaseType: "scheduled",
                        allowPostBatchAccess: true,
                        enrollmentCount: 42,
                        capacity: 50,
                        priceTiers: [
                            {
                                id: "tier-1",
                                name: "Early Bird",
                                price: 79.99,
                                startDate: "2023-01-15T00:00:00Z",
                                endDate: "2023-01-31T00:00:00Z",
                            },
                            {
                                id: "tier-2",
                                name: "Regular",
                                price: 99.99,
                                startDate: "2023-02-01T00:00:00Z",
                                endDate: "2023-02-15T00:00:00Z",
                            },
                        ],
                    },
                    {
                        id: "batch-2",
                        name: "Summer 2023",
                        registrationStartDate: "2023-05-01T00:00:00Z",
                        registrationEndDate: "2023-05-31T00:00:00Z",
                        courseStartDate: "2023-06-05T00:00:00Z",
                        courseEndDate: "2023-08-05T00:00:00Z",
                        contentReleaseType: "all",
                        allowPostBatchAccess: false,
                        enrollmentCount: 28,
                        capacity: 60,
                        priceTiers: [
                            {
                                id: "tier-3",
                                name: "Early Bird",
                                price: 79.99,
                                startDate: "2023-05-01T00:00:00Z",
                                endDate: "2023-05-15T00:00:00Z",
                            },
                            {
                                id: "tier-4",
                                name: "Regular",
                                price: 99.99,
                                startDate: "2023-05-16T00:00:00Z",
                                endDate: "2023-05-31T00:00:00Z",
                            },
                        ],
                    },
                ]

                setBatches(mockBatches)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching batches:", error)
                setLoading(false)
            }
        }

        fetchBatches()
    }, [courseId, withBatch])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getBatchStatus = (batch: Batch) => {
        const now = new Date()
        const startDate = new Date(batch.courseStartDate)
        const endDate = new Date(batch.courseEndDate)
        const regStartDate = new Date(batch.registrationStartDate)
        const regEndDate = new Date(batch.registrationEndDate)

        if (now < regStartDate) {
            return {
                label: "Coming Soon",
                color: "text-blue-400 bg-blue-500/20 border-blue-500/30",
            }
        } else if (now >= regStartDate && now <= regEndDate) {
            return {
                label: "Registration Open",
                color: "text-green-400 bg-green-500/20 border-green-500/30",
            }
        } else if (now >= startDate && now <= endDate) {
            return {
                label: "In Progress",
                color: "text-purple-400 bg-purple-500/20 border-purple-500/30",
            }
        } else {
            return {
                label: "Completed",
                color: "text-gray-400 bg-gray-500/20 border-gray-500/30",
            }
        }
    }

    if (!withBatch) {
        return (
            <div className="animate-fadeIn">
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-400">Batch enrollment is not enabled for this course.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-white mb-4">Course Batches</h3>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <Card key={i} className="bg-gray-800/50 border-gray-700">
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-1/3 bg-gray-700 mb-4" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Skeleton className="h-20 bg-gray-700" />
                                    <Skeleton className="h-20 bg-gray-700" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : batches.length === 0 ? (
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-400">No batches have been created for this course yet.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {batches.map((batch) => {
                        const status = getBatchStatus(batch)

                        return (
                            <Card key={batch.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium text-white text-lg">{batch.name}</h4>
                                            <div className="flex items-center mt-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Users className="h-4 w-4 mr-1 text-gray-400" />
                                                <span>
                                                    {batch.enrollmentCount || 0}/{batch.capacity || "∞"} enrolled
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex items-start space-x-3">
                                                    <div className="mt-0.5">
                                                        <Calendar className="h-5 w-5 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Registration Period</p>
                                                        <p className="text-sm text-gray-400">
                                                            {formatDate(batch.registrationStartDate)} - {formatDate(batch.registrationEndDate)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start space-x-3">
                                                    <div className="mt-0.5">
                                                        <Calendar className="h-5 w-5 text-pink-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Course Period</p>
                                                        <p className="text-sm text-gray-400">
                                                            {formatDate(batch.courseStartDate)} - {formatDate(batch.courseEndDate)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start space-x-3">
                                                    <div className="mt-0.5">
                                                        <Clock className="h-5 w-5 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Content Release</p>
                                                        <p className="text-sm text-gray-400 capitalize">
                                                            {batch.contentReleaseType === "all" ? "All at once" : "Scheduled release"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-sm font-medium text-white flex items-center">
                                                    <Tag className="h-4 w-4 mr-1 text-green-400" />
                                                    Price Tiers
                                                </p>

                                                {batch.priceTiers.map((tier) => (
                                                    <div key={tier.id} className="bg-gray-700/50 rounded-md p-3">
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-sm font-medium text-white">{tier.name}</p>
                                                            <p className="text-sm font-bold text-green-400">₦{tier.price.toLocaleString()}</p>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {formatDate(tier.startDate)} - {formatDate(tier.endDate)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
