"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {

    Clock,

    Smartphone,
    Globe,
    Copy,
} from "lucide-react"
import { format } from "date-fns"

interface StatsTableProps {
    stats: any[]
    isLoading?: boolean
}

export default function StatsTable({
    stats,
    isLoading = false,
}: StatsTableProps) {

    const handleSort = (column: string) => {

    }


    const renderStats = (data: any) => {
        try {
            const stats = data.stats
            console.log(typeof stats, stats)

            return (
                <div className="space-y-2">
                    {/* Device Info */}
                    <div className="flex flex-wrap gap-2">
                        {stats.platform && (
                            <Badge variant="outline" className="flex items-center gap-1 bg-gray-800">
                                <Smartphone className="h-3 w-3" />
                                <span className="text-xs">{stats.platform}</span>
                            </Badge>
                        )}
                        {stats.viewportWidth && stats.viewportHeight && (
                            <Badge variant="outline" className="flex items-center gap-1 bg-gray-800">
                                <span className="text-xs">
                                    {stats.viewportWidth}×{stats.viewportHeight}
                                </span>
                            </Badge>
                        )}
                        {stats.language && (
                            <Badge variant="outline" className="flex items-center gap-1 bg-gray-800">
                                <Globe className="h-3 w-3" />
                                <span className="text-xs">{stats.language}</span>
                            </Badge>
                        )}
                    </div>
                </div>
            )
        } catch (error) {
            return <span className="text-red-400 text-xs">Invalid stats data</span>
        }
    }

    return (
        <Card className="">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-white">Link Statistics</CardTitle>
                        <CardDescription>Track how your link is performing</CardDescription>
                    </div>

                    {/* <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search stats..."
                                className="pl-8 bg-gray-700 border-gray-600 text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            />
                        </div>
                        <Button variant="outline" className="border-gray-600 text-gray-300" onClick={handleSearch}>
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div> */}
                </div>
            </CardHeader>
            <CardContent>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="border-gray-700 hover:bg-gray-700">
                                <TableHead className="text-gray-300">SN</TableHead>
                                <TableHead className="text-gray-300" >
                                    <div className="flex items-center">
                                        Date/Time
                                    </div>
                                </TableHead>
                                <TableHead className="text-gray-300">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-gray-400">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                                        </div>
                                        <div className="mt-2">Loading stats...</div>
                                    </TableCell>
                                </TableRow>
                            ) : stats.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-gray-400">
                                        No stats found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                stats.map((stat, index) => (
                                    <TableRow key={`stat-mobile-${stat.id ?? index}`} className="border-gray-700 hover:bg-gray-700">
                                        <TableCell className="font-medium text-gray-300">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-300">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                <div>
                                                    <div>{format(new Date(stat.createdAt), "MMM d, yyyy")}</div>
                                                    <div className="text-xs text-gray-400">{format(new Date(stat.createdAt), "h:mm a")}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{renderStats(stat)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {isLoading ? (
                        <div className="text-center py-8 text-gray-400">
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                            <div className="mt-2">Loading stats...</div>
                        </div>
                    ) : stats.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">No stats found</div>
                    ) : (
                        stats.map((stat, index) => (
                            <Card key={`stat-${stat.id ?? index}`} className="bg-gray-700 border-gray-600">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-300">
                                                    {format(new Date(stat.createdAt), "MMM d, yyyy")}
                                                </div>
                                                <div className="text-xs text-gray-400">{format(new Date(stat.createdAt), "h:mm a")}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {renderStats(stat)}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

