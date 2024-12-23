import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'
import LinkInBio from "@/components/link-in-bio/LinkInBio"

export default function LinkInBioPage() {


  return (
    <main className="flex-1 p-8 overflow-auto ">

      <LinkInBio />
    </main>
  );
}
