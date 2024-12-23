import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
export default function Home() {
  const plans = [
    {
      name: "Free",
      description: "For creators just starting out",
      price: "Free",
      features: [
        "5GB content space",
        "1 hub",
        "200 emails per month",
        "200 SMS per month",
        "8% transaction fee"
      ],
      cta: "Get Started"
    },
    {
      name: "Pro",
      description: "For growing creator businesses",
      price: "₦15,000/month",
      features: [
        "50GB content space",
        "3 hubs",
        "1,000 emails per month",
        "5,000 SMS per month",
        "5 newsletter emails for all fans",
        "6% transaction fee"
      ],
      cta: "Upgrade to Pro"
    },
    {
      name: "Enterprise",
      description: "For established creators and brands",
      price: "₦25,000/month",
      features: [
        "Unlimited content space",
        "5 hubs",
        "Unlimited emails",
        "Unlimited SMS",
        "Unlimited newsletter emails",
        "5% transaction fee"
      ],
      cta: "Contact Sales"
    }
  ]

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Creator Plan</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-400">
              Select the perfect plan to power your creator journey. Upgrade anytime as your audience grows.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-2 border-indigo-500/30 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-indigo-200">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold text-white mb-4">{plan.price}</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="text-indigo-400 mr-2 h-5 w-5" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white hover:from-indigo-600 hover:to-purple-800 transition-all duration-300">
                    {plan.cta}
                  </Button>
                </CardFooter>
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
                Ready to Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Creator Journey?</span>
              </h2>
              <p className="text-gray-200 md:text-xl">
                Join thousands of creators who are building their empires with VIKMID. Start for free and upgrade as you grow.
              </p>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white hover:from-indigo-600 hover:to-purple-800 transition-all duration-300 rounded-full px-8 py-3 text-lg">
                Get Started Now
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl filter blur-2xl"></div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="VIKMID Creator Dashboard"
                className="rounded-2xl shadow-2xl relative z-10"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
