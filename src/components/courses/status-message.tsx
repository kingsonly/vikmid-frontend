import { useState, useEffect } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusMessageProps {
  message: string
  type: "success" | "error"
  duration?: number
}

export function StatusMessage({ message, type, duration = 2000 }: StatusMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out",
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white",
      )}
      role="alert"
    >
      {type === "success" ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
      <span className="sr-only">{type === "success" ? "Success" : "Error"}:</span>
      <div className="text-sm font-medium">{message}</div>
    </div>
  )
}

