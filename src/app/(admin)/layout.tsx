'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { useMemo, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, LinkIcon, Users, Settings, Menu, X, LayoutDashboard } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateIsCreator } from '../../store/users-basic-details/usersDetailsSlice';
import { useRouter } from 'next/navigation';
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const usersDetails = useSelector((state: RootState) => state.userDetails);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const toggleViewMode = () => {
    dispatch(updateIsCreator(!usersDetails.isCreator))
    router.push("/dashboard")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const sidebarContent = useMemo(() => {
    return <ul className="space-y-2">
      <li><Link href="/dashboard" className="flex items-center p-2 hover:text-indigo-400 transition-colors">< LayoutDashboard className="mr-2" /> Dashboard</Link></li>
      {usersDetails.isCreator && usersDetails.activeHub ? (
        <>

          <li><Link href="/link-in-bio" className="flex items-center p-2 hover:text-indigo-400 transition-colors"><LinkIcon className="mr-2" /> Link in Bio</Link></li>
          <li><Link href="/course" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><BookOpen className="mr-2" /> Courses</Link></li>
          <li><Link href="/store" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><ShoppingBag className="mr-2" /> Store</Link></li>
          <li><Link href="/booking" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Calendar className="mr-2" /> Bookings</Link></li>
          <li><Link href="/contest" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Calendar className="mr-2" /> Contest</Link></li>
          <li><Link href="/subscription" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><CreditCard className="mr-2" /> Subscriptions</Link></li>
          <li><Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Mail className="mr-2" /> Email & SMS</Link></li>
        </>
      ) : !usersDetails.isCreator ? (

        <>

          <li><Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><BookOpen className="mr-2" /> My Courses</Link></li>
          <li><Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><ShoppingBag className="mr-2" /> My Purchases</Link></li>
          <li><Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Calendar className="mr-2" /> My Bookings</Link></li>
          <li><Link href="/my-subscription" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Users className="mr-2" /> My Subscriptions</Link></li>

        </>
      ) : null
      }
    </ul>
  }, [usersDetails.isCreator, usersDetails.activeHub]);
  return (

    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-5 z-50 lg:hidden text-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-800/80 backdrop-blur-xl p-6 flex flex-col transition-transform duration-300 ease-in-out transform border-r border-gray-700
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="flex items-center mb-8">
          {/* <MessageSquare className="h-8 w-8 text-indigo-400 mr-2" /> */}
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">VIKMID</span>
        </div>
        <nav className="flex-1">
          {sidebarContent}
          {/* <ul className="space-y-2">
            <li><Link href="/dashboard" className="flex items-center p-2 hover:text-indigo-400 transition-colors"><LinkIcon className="mr-2" /> Dashboard</Link></li>
            {usersDetails.isCreator && usersDetails.activeHub ? (
              <>

                <li><Link prefetch={false} href="/link-in-bio" className="flex items-center p-2 hover:text-indigo-400 transition-colors"><LinkIcon className="mr-2" /> Link in Bio</Link></li>
                <li><Link prefetch={false} href="/course" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><BookOpen className="mr-2" /> Courses</Link></li>
                <li><Link prefetch={false} href="/store" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><ShoppingBag className="mr-2" /> Store</Link></li>
                <li><Link prefetch={false} href="/booking" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Calendar className="mr-2" /> Bookings</Link></li>
                <li><Link prefetch={false} href="/contest" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Calendar className="mr-2" /> Contest</Link></li>
                <li><Link prefetch={false} href="/subscription" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><CreditCard className="mr-2" /> Subscriptions</Link></li>
                <li><Link prefetch={false} href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Mail className="mr-2" /> Email & SMS</Link></li>
              </>
            ) : !usersDetails.isCreator ? (

              <>

                <li><Link href="/my-courses" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><BookOpen className="mr-2" /> My Courses</Link></li>
                <li><Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><ShoppingBag className="mr-2" /> My Purchases</Link></li>
                <li><Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Calendar className="mr-2" /> My Bookings</Link></li>
                <li><Link href="/my-subscription" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Users className="mr-2" /> My Subscriptions</Link></li>

              </>
            ) : null
            }
          </ul> */}
        </nav>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span>View as:</span>
            <div className="flex items-center space-x-2">
              <Switch id="view-mode" checked={usersDetails.isCreator} onCheckedChange={toggleViewMode} />
              <Label htmlFor="view-mode">{usersDetails.isCreator ? 'Creator' : 'Fan'}</Label>
            </div>
          </div>
          <Link href="#" className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"><Settings className="mr-2" /> Settings</Link>
        </div>
      </aside>

      {/* Main content */}
      {children}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>


  );
}