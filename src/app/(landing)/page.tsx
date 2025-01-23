"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiCall, useGetRequest } from "@/utils/useApiCall"
import { useRouter } from 'next/navigation';
import { ToastContainer } from "react-toastify"
import { GoogleAnalytics } from "nextjs-google-analytics";


const AnimatedText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : subIndex === words[index].length ? 1000 :
      Math.floor(Math.random() * (120 - 80 + 1) + 80)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  // Blink cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {words[index].substring(0, subIndex)}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {blink ? "|" : "\u00A0"}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
};


export default function Home() {
  const router = useRouter();
  const { apiCall } = useApiCall();

  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const features = [
    {
      icon: LinkIcon,
      title: "Link in Bio",
      description: "Create a customizable landing page for all your important links.",
    },
    {
      icon: BookOpen,
      title: "Course Platform",
      description: "Build and sell online courses to share your knowledge.",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Store",
      description: "Set up your own store to sell physical or digital products.",
    },
    {
      icon: Calendar,
      title: "Booking System",
      description: "Allow fans to book calls or services directly through your calendar.",
    },
    {
      icon: CreditCard,
      title: "Subscriptions",
      description: "Offer paid subscriptions for exclusive content and perks.",
    },
    {
      icon: Mail,
      title: "Email & SMS",
      description: "Communicate with your audience through email and SMS campaigns.",
    },
  ]
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)
    let data: {
      fullName: string,
      email: string,

    } = {
      fullName: name,
      email: email,
    }
    const response = await apiCall({
      endpoint: "/waitlist/create",
      method: "post",
      data: data,
      successMessage: `Thank you ${name} for joining our waitlist!`,
      "showToast": true
    },
      router
    );
    if (response.status == 201) {
      setEmail("")
      setName("")
      setLoader(false)
      setIsDialogOpen(false)

    }


  }


  return (
    <main className="flex-1">
      <GoogleAnalytics trackPageViews />
      <ToastContainer autoClose={2000} />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center space-y-4 text-center relative z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Empower Your <AnimatedText words={["Creator Journey", "Passion", "Online Business", "Community", "Digital Empire"]} />
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl">
              VIKMID: The all-in-one platform for creators to build, sell, and engage with their audience.
            </p>
            <div className="space-x-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-full px-8 py-3 text-lg">
                    Join Waitlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Join Our Waitlist</DialogTitle>
                    <DialogDescription>
                      Enter your email to be notified when VIKMID launches.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleWaitlistSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className=" items-center gap-4">

                        <Input
                          id="name"
                          type="text"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                          className="col-span-3 bg-gray-700 text-white border-gray-600"
                          required
                        />
                      </div>
                      <div className=" items-center gap-4">
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="col-span-3 bg-gray-700 text-white border-gray-600"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600">
                        Join Waitlist
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {/* <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-800 transition-colors rounded-full px-8 py-3 text-lg">
                Learn More
              </Button> */}
            </div>
          </div>
          <div className="absolute inset-0 md:-inset-x-40 lg:-inset-x-80 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 to-transparent opacity-70"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>


      {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center space-y-4 text-center relative z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Empower Your <AnimatedText words={["Creator Journey", "Passion", "Online Business", "Community", "Digital Empire"]} />
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl">
              VIKMID: The all-in-one platform for creators to build, sell, and engage with their audience.
            </p>
            <div className="space-x-4">
              <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-full px-8 py-3 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-800 transition-colors rounded-full px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 md:-inset-x-40 lg:-inset-x-80 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 to-transparent opacity-70"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
        </div>
      </section> */}

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Everything You Need to Succeed
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <feature.icon className="h-12 w-12 text-pink-400 group-hover:text-purple-300 transition-colors duration-300" />
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-200 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Your Creative Empire, <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">All in One Place</span>
              </h2>
              <p className="text-gray-400 md:text-xl">
                VIKMID brings together all the tools you need to monetize your passion and build a thriving community.
              </p>
              <ul className="space-y-2">
                {[
                  "Sell courses with unique URLs",
                  "Create and manage your online store",
                  "Offer bookings for calls and services",
                  "Set up tiered subscriptions",
                  "Engage fans through email and SMS",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-300">
                    <MessageSquare className="text-indigo-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-full px-8 py-3 text-lg">
                Start Creating
              </Button>
            </div>
            <div className="lg:order-first relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl filter blur-2xl"></div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="VIKMID Dashboard Preview"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Join Thousands of Successful Creators
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl mb-8">
            From digital artists to fitness gurus, VIKMID is powering the next generation of online creators.
          </p>
          <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-full px-8 py-3 text-lg">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            What Our Creators Say
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Chen",
                role: "Digital Artist",
                comment: "VIKMID has revolutionized how I sell my art and connect with my audience. The all-in-one platform saves me so much time!",
              },
              {
                name: "Sarah Johnson",
                role: "Fitness Instructor",
                comment: "The course and booking features have allowed me to scale my online fitness classes. VIKMID is a game-changer for fitness pros.",
              },
              {
                name: "Mike Thompson",
                role: "Tech Reviewer",
                comment: "Managing my store, subscriptions, and email list all in one place has streamlined my tech review business. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <CardContent className="flex flex-col space-y-4 p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1">
                      <div className="rounded-full bg-gray-800 p-1">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt={`${testimonial.name} Avatar`}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-100">{testimonial.name}</p>
                      <p className="text-sm text-pink-300">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
