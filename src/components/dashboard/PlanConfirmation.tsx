"use client"

import React, { use, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Star } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { useApiCall } from '@/utils/useApiCall'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { updateIsActive } from '../../store/users-basic-details/usersDetailsSlice';
import { LoadingSpinner } from '../loader/Loader'


export default function PlanConfirmation({ selectedPlan = "pro" }) {


    const usersDetails = useSelector((state: RootState) => state.userDetails);
    const dispatch = useDispatch<AppDispatch>();
    const [plan, setPlan] = useState<any>(null);
    const [loader, setLoader] = useState<boolean>(true);
    const [paymentLoader, setPaymentLoader] = useState<boolean>(false);
    const { apiCall } = useApiCall();

    useEffect(() => {
        // fetch plan
        getUsersPlan()

    }, [])


    const [showDowngradeDialog, setShowDowngradeDialog] = useState(false)
    const getUsersPlan = async () => {
        try {
            const response = await apiCall({
                endpoint: `/plans/getplan/${usersDetails.plan}`,
                method: "get",
                "showToast": false,
            }
            );

            const plan = response.data;
            if (plan) {
                setPlan(plan);
                setLoader(false);
            }
            console.log("User plan:", plan);

        } catch (error: any) {
            console.log(error);
        }
    }
    const handleConfirmPlan = async () => {
        setPaymentLoader(true);
        const config: any = {
            public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY,
            tx_ref: Date.now(),
            //payment_plan: plan.paymentPlanId,
            amount: 1000,
            currency: 'NGN',
            payment_options: 'card',
            customer: {
                email: usersDetails.email,
                name: `${usersDetails.firstName} ${usersDetails.lastName}`,
            },
            customizations: {
                title: plan.name,
                description: 'payment for vikmid subscription',
                logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
            },
        };
        const handleFlutterPayment = useFlutterwave(config);
        handleFlutterPayment({
            callback: async (responseData) => {
                console.log(responseData);
                //verify subscription
                try {
                    const response = await apiCall({
                        endpoint: `/creators-subscription/approve/${responseData.transaction_id}/${usersDetails.plan}`,
                        method: "get",
                        "showToast": false,
                    }
                    );

                    const subscriptionData = response.data;
                    if (subscriptionData.status == "success") {
                        dispatch(updateIsActive(true));
                        setPaymentLoader(false);
                    }
                    setPaymentLoader(false);

                } catch (error: any) {
                    console.log(error);
                    setPaymentLoader(false);
                }
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {
                setPaymentLoader(false);
            },
        });
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
            {loader ? <div>Loading...</div> :
                <div>
                    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
                        <CardHeader className="bg-gray-700 border-b border-gray-600">
                            <CardTitle className="text-2xl font-bold text-purple-400 flex items-center justify-center">
                                <Star className="w-6 h-6 mr-2 text-yellow-400" />
                                {plan?.name}
                            </CardTitle>
                            <CardDescription className="text-center text-gray-300">Review your selected plan details</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-3xl font-bold mb-4 text-purple-400 text-center">₦{plan?.price}/month</p>
                            <ul className="space-y-3">
                                {plan?.planFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-center bg-gray-700 p-2 rounded">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                                        <span className="text-gray-200"> {feature.feature.name} ({feature.value})</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            {paymentLoader ? <LoadingSpinner /> :
                                <Button
                                    onClick={handleConfirmPlan}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Confirm and Start Creating
                                </Button>}


                            {/* <Dialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
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
                                            Stay with {plan?.name}
                                        </Button>
                                        <Button onClick={handleDowngrade} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                                            Switch to Free Plan
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog> */}

                        </CardFooter>
                    </Card>

                    {/* <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Not ready to commit? You can always start with our{" "}
                            <Button variant="link" className="p-0 text-purple-400 font-semibold" onClick={() => setShowDowngradeDialog(true)}>
                                Free Plan
                            </Button>
                        </p>
                    </div> */}

                </div>
            }
        </div>
    )
}