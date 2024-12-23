import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>
          <CardDescription className="text-indigo-200">
            Start your creator journey with VIKMID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="bg-white/5 border-indigo-500/50 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" className="bg-white/5 border-indigo-500/50 text-white" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white hover:from-indigo-600 hover:to-purple-800 transition-all duration-300">
            Sign Up
          </Button>
          <p className="text-sm text-gray-300 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
