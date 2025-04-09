"use client"
import { Calendar, Globe, Laptop, MousePointer, Smartphone } from "lucide-react"
import type { BusiestDayInterface, PlatformPercentageInterface, SocialLink, TopBrowserInterface } from "../../store/link-in-bio/interface/linkInBioInterface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface StatsNumberComponentProps {
    total: number;
    platformPercentage: PlatformPercentageInterface
    topBrowser: TopBrowserInterface
    busiestDay: BusiestDayInterface
}




export default function StatsNumberComponent({
    total,
    platformPercentage,
    topBrowser,
    busiestDay,

}: StatsNumberComponentProps) {

    const deviceType = (): string => {
        if (platformPercentage.mobile == platformPercentage.desktop) {
            return "Unavailable";
        }
        if (platformPercentage.mobile > platformPercentage.desktop) {
            return "Mobile";
        }
        return "Desktop";
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-2">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">{total}</div>
                        <MousePointer className="h-5 w-5 text-purple-400" />
                    </div>
                    {/* <div className="text-xs text-green-400 mt-1">+12% from last month</div> */}
                </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Top Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">{topBrowser.name}</div>
                        <Globe className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{topBrowser.percentage} of all traffic</div>
                </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">{deviceType()}</div>
                        <Smartphone className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                        <span className="inline-flex items-center mr-2">
                            <Smartphone className="h-3 w-3 mr-1" />{platformPercentage.mobile}%
                        </span>
                        <span className="inline-flex items-center">
                            <Laptop className="h-3 w-3 mr-1" /> {platformPercentage.desktop}%
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Busiest Day</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">{busiestDay.day}</div>
                        <Calendar className="h-5 w-5 text-pink-400" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{busiestDay.percentage}% of traffic</div>
                </CardContent>
            </Card>
        </div>
    )
}

