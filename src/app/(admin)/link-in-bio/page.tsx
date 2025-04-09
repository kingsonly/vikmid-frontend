"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'
import LinkInBio from "@/components/link-in-bio/LinkInBio"
import withAuth from "@/utils/withAuth"

function LinkInBioPage() {


  return (
    <main className="flex-1  sm:p-8 overflow-auto ">

      <LinkInBio />
    </main>
  );
}
export default withAuth(LinkInBioPage, true);