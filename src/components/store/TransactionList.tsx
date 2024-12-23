'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock transaction data
const transactions = [
    { id: 1, date: '2023-06-15', customer: 'John Doe', amount: 99.99, status: 'Completed' },
    { id: 2, date: '2023-06-14', customer: 'Jane Smith', amount: 29.99, status: 'Completed' },
    { id: 3, date: '2023-06-13', customer: 'Bob Johnson', amount: 19.99, status: 'Pending' },
    { id: 4, date: '2023-06-12', customer: 'Alice Brown', amount: 49.99, status: 'Completed' },
    { id: 5, date: '2023-06-11', customer: 'Charlie Davis', amount: 39.99, status: 'Refunded' },
]

export function TransactionList({ productId }) {
    // In a real application, you would filter transactions based on the productId
    // For this example, we'll just show all transactions

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.customer}</TableCell>
                                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Completed' ? 'bg-green-500' :
                                        transaction.status === 'Pending' ? 'bg-yellow-500' :
                                            'bg-red-500'
                                        }`}>
                                        {transaction.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}