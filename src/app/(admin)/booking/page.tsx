'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'
import LinkInBio from "@/components/link-in-bio/LinkInBio"
import Booking from "@/components/booking/Booking"
import withAuth from "@/utils/withAuth"
function BookingPage() {


  return (
    <main className="flex-1 p-8 overflow-auto ">

      <Booking />
    </main>
  );
}
export default withAuth(BookingPage, true);
