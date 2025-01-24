"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  MessageSquare,
  BookOpen,
  ShoppingBag,
  Calendar,
  CreditCard,
  Mail,
  LinkIcon,
  Users,
  Settings,
  Menu,
  X,
  Store,
} from "lucide-react"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [viewMode, setViewMode] = useState<"creator" | "fan">("creator")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleViewMode = () => {
    setViewMode(viewMode === "creator" ? "fan" : "creator")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
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
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-800/80 backdrop-blur-xl p-6 flex flex-col transition-transform duration-300 ease-in-out transform border-r border-gray-700
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}
      >
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            VIKMID
          </span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {viewMode === "creator" ? (
              <>
                <li>
                  <Link href="/link-in-bio" className="flex items-center p-2 hover:text-indigo-400 transition-colors">
                    <LinkIcon className="mr-2" /> Link in Bio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <BookOpen className="mr-2" /> Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <ShoppingBag className="mr-2" /> Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <Calendar className="mr-2" /> Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contest"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <Calendar className="mr-2" /> Contest
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subscription"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <CreditCard className="mr-2" /> Subscriptions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <Mail className="mr-2" /> Email & SMS
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/my-courses"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <BookOpen className="mr-2" /> My Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <ShoppingBag className="mr-2" /> My Purchases
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <Calendar className="mr-2" /> My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-subscription"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <Users className="mr-2" /> My Subscriptions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
                  >
                    <Store className="mr-2" /> Marketplace
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span>View as:</span>
            <div className="flex items-center space-x-2">
              <Switch id="view-mode" checked={viewMode === "fan"} onCheckedChange={toggleViewMode} />
              <Label htmlFor="view-mode">{viewMode === "creator" ? "Creator" : "Fan"}</Label>
            </div>
          </div>
          <Link
            href="#"
            className="flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-gray-300 hover:text-white transition-colors"
          >
            <Settings className="mr-2" /> Settings
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">{children}</div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

