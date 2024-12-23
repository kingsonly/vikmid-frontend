import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, Users } from 'lucide-react'
export default function Home() {
  const showcaseItems = [
    {
      name: "Sarah Johnson",
      role: "Fitness Instructor",
      image: "/placeholder.svg?height=400&width=400",
      description: "Transformed her local gym classes into a global online fitness empire.",
      stats: {
        students: "50K+",
        courses: "10",
        revenue: "$500K+"
      }
    },
    {
      name: "Alex Chen",
      role: "Digital Artist",
      image: "/placeholder.svg?height=400&width=400",
      description: "Turned his passion for digital art into a thriving online business.",
      stats: {
        followers: "100K+",
        products: "50+",
        revenue: "$750K+"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Culinary Expert",
      image: "/placeholder.svg?height=400&width=400",
      description: "Built a cooking empire with online courses and a thriving e-commerce store.",
      stats: {
        students: "75K+",
        products: "100+",
        revenue: "$1M+"
      }
    }
  ]
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Success Stories: <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">VIKMID Creators</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-400">
              Discover how creators are building thriving businesses and passionate communities with VIKMID.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-2 border-indigo-500/30 overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                <CardHeader>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="rounded-full w-32 h-32 mx-auto mb-4"
                  />
                  <CardTitle className="text-2xl font-bold text-center text-white">{item.name}</CardTitle>
                  <p className="text-indigo-300 text-center">{item.role}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-200 text-center">{item.description}</p>
                  <div className="flex justify-around">
                    {Object.entries(item.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-2xl font-bold text-indigo-400">{value}</p>
                        <p className="text-sm text-gray-300 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Community of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Successful Creators</span>
              </h2>
              <p className="text-gray-200 md:text-xl">
                Start your journey with VIKMID today and turn your passion into a thriving online business.
              </p>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white hover:from-indigo-600 hover:to-purple-800 transition-all duration-300 rounded-full px-8 py-3 text-lg">
                Start Your Free Trial
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl filter blur-2xl"></div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="VIKMID Creator Community"
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
