import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkIcon, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, MessageSquare } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: LinkIcon,
      title: "Link in Bio",
      description: "Create a customizable landing page for all your important links.",
      details: [
        "Customizable themes and layouts",
        "Analytics to track link performance",
        "Integrate with social media platforms",
        "Mobile-responsive design"
      ]
    },
    {
      icon: BookOpen,
      title: "Course Platform",
      description: "Build and sell online courses to share your knowledge.",
      details: [
        "Intuitive course builder",
        "Support for video, audio, and text lessons",
        "Quizzes and assignments",
        "Student progress tracking"
      ]
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Store",
      description: "Set up your own store to sell physical or digital products.",
      details: [
        "Customizable product pages",
        "Secure payment processing",
        "Inventory management",
        "Order fulfillment tools"
      ]
    },
    {
      icon: Calendar,
      title: "Booking System",
      description: "Allow fans to book calls or services directly through your calendar.",
      details: [
        "Integration with popular calendar apps",
        "Automated scheduling",
        "Custom availability settings",
        "Payment collection for paid sessions"
      ]
    },
    {
      icon: CreditCard,
      title: "Subscriptions",
      description: "Offer paid subscriptions for exclusive content and perks.",
      details: [
        "Tiered subscription plans",
        "Recurring billing management",
        "Member-only content areas",
        "Subscription analytics"
      ]
    },
    {
      icon: Mail,
      title: "Email & SMS",
      description: "Communicate with your audience through email and SMS campaigns.",
      details: [
        "Drag-and-drop email builder",
        "Automated email sequences",
        "SMS campaign management",
        "Audience segmentation"
      ]
    },
  ]
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Powerful Features for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Modern Creators</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-400">
              Discover the tools that will take your online presence to the next level. VIKMID provides everything you need to create, sell, and engage.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue={features[0].title.toLowerCase().replace(/\s+/g, '-')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white/10 backdrop-blur-md rounded-lg p-1">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.title}
                  value={feature.title.toLowerCase().replace(/\s+/g, '-')}
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  <feature.icon className="h-5 w-5 mr-2" />
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {features.map((feature) => (
              <TabsContent key={feature.title} value={feature.title.toLowerCase().replace(/\s+/g, '-')}>
                <Card className="bg-white/10 backdrop-blur-md border-2 border-indigo-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-200">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-2">

                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Building Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Creator Empire</span> Today
              </h2>
              <p className="text-gray-200 md:text-xl">
                With VIKMID's comprehensive suite of tools, you have everything you need to turn your passion into a thriving online business.
              </p>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white hover:from-indigo-600 hover:to-purple-800 transition-all duration-300 rounded-full px-8 py-3 text-lg">
                Get Started for Free
              </Button>
            </div>
            <div className="relative">
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
      </section>
    </main>
  );
}
