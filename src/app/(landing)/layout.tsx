import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 backdrop-blur-md bg-gray-900/80">
        <Link className="flex items-center justify-center" href="#">
          {/* <MessageSquare className="h-6 w-6 text-indigo-400" /> */}
          <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">VIKMID</span>
        </Link>
        {/* <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="#">
            Showcase
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="#">
            Contact
          </Link>
        </nav> */}
      </header>
      {children}
      <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-800 bg-gray-900">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2024 VIKMID Inc. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-indigo-400 transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-indigo-400 transition-colors" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>

  );
}
