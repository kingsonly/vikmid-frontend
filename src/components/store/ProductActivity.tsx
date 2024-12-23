'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Download, Eye } from 'lucide-react'

// Mock activity data
const activities = [
    { id: 1, type: 'purchase', user: 'John Doe', date: '2023-06-15 14:30' },
    { id: 2, type: 'download', user: 'Jane Smith', date: '2023-06-14 10:15' },
    { id: 3, type: 'view', user: 'Bob Johnson', date: '2023-06-13 16:45' },
    { id: 4, type: 'purchase', user: 'Alice Brown', date: '2023-06-12 09:00' },
    { id: 5, type: 'view', user: 'Charlie Davis', date: '2023-06-11 11:30' },
]

export function ProductActivity({ productId }) {
    // In a real application, you would filter activities based on the productId
    // For this example, we'll just show all activities

    const getActivityIcon = (type) => {
        switch (type) {
            case 'purchase':
                return <ShoppingCart className="w-4 h-4 text-green-400" />
            case 'download':
                return <Download className="w-4 h-4 text-blue-400" />
            case 'view':
                return <Eye className="w-4 h-4 text-yellow-400" />
            default:
                return null
        }
    }

    return (
        <Card className="bg-gray-700 border-gray-600">
            <CardContent>
                <ul className="space-y-4">
                    {activities.map((activity) => (
                        <li key={activity.id} className="flex items-center space-x-3">
                            {getActivityIcon(activity.type)}
                            <div>
                                <p className="text-sm font-medium">{activity.user}</p>
                                <p className="text-xs text-gray-400">
                                    {activity.type === 'purchase' ? 'Purchased' :
                                        activity.type === 'download' ? 'Downloaded' : 'Viewed'} on {activity.date}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}