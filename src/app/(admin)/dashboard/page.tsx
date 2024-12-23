import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'

export default function Home() {


  return (
    <main className="flex-1 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome, {viewMode === 'creator' ? 'Creator' : 'Fan'}!</h1>

      {viewMode === 'creator' ? <CreatorDashboard /> : <FanDashboard />}
    </main>
  );
}
