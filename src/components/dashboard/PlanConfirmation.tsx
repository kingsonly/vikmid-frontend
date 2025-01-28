"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Star } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const plans = {
    pro: {
        name: "Pro Plan",
        price: "$29.99/month",
        features: [
            "Unlimited course creation",
            "Advanced analytics",
            "Priority support",
            "Custom branding",
            "Unlimited students"
        ]
    },
    basic: {
        name: "Basic Plan",
        price: "$9.99/month",
        features: [
            "Up to 5 courses",
            "Basic analytics",
            "Email support",
            "VIKMID branding",
            "Up to 1000 students"
        ]
    },
    free: {
        name: "Free Plan",
        price: "$0/month",
        features: [
            "1 course creation",
            "Basic analytics",
            "Community support",
            "VIKMID branding",
            "Up to 100 students"
        ]
    }
}

export default function PlanConfirmation({ selectedPlan = "pro" }) {
    const [showDowngradeDialog, setShowDowngradeDialog] = useState(false)

    const handleConfirmPlan = () => {
        console.log("Confirming plan:", selectedPlan)
    }

    const handleDowngrade = () => {
        console.log("Downgrading to free plan")
        setShowDowngradeDialog(false)
    }

    return (
        <div className="space-y-6 bg-gray-900 text-white p-6 rounded-lg">
            <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-center">
                Confirm Your VIKMID Plan
            </h1>
            <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
                <CardHeader className="bg-gray-700 border-b border-gray-600">
                    <CardTitle className="text-2xl font-bold text-purple-400 flex items-center justify-center">
                        <Star className="w-6 h-6 mr-2 text-yellow-400" />
                        {plans[selectedPlan].name}
                    </CardTitle>
                    <CardDescription className="text-center text-gray-300">Review your selected plan details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-3xl font-bold mb-4 text-purple-400 text-center">{plans[selectedPlan].price}</p>
                    <ul className="space-y-3">
                        {plans[selectedPlan].features.map((feature, index) => (
                            <li key={index} className="flex items-center bg-gray-700 p-2 rounded">
                                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                                <span className="text-gray-200">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        onClick={handleConfirmPlan}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        Confirm and Start Creating
                    </Button>
                    {selectedPlan !== "free" && (
                        <Dialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-gray-700">
                                    Explore Free Plan Options
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 border-2 border-purple-500">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-purple-400">Consider the Free Plan?</DialogTitle>
                                    <DialogDescription className="text-gray-300">
                                        While the free plan offers limited features, it's a great way to get started with VIKMID. You can always upgrade later!
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => setShowDowngradeDialog(false)} className="border-purple-500 text-purple-400 hover:bg-gray-700">
                                        Stay with {plans[selectedPlan].name}
                                    </Button>
                                    <Button onClick={handleDowngrade} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                                        Switch to Free Plan
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardFooter>
            </Card>
            {selectedPlan !== "free" && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Not ready to commit? You can always start with our{" "}
                        <Button variant="link" className="p-0 text-purple-400 font-semibold" onClick={() => setShowDowngradeDialog(true)}>
                            Free Plan
                        </Button>
                    </p>
                </div>
            )}
        </div>
    )
}