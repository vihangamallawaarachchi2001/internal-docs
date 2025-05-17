import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // If less than 24 hours ago, show relative time
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    }
    const hours = Math.floor(diffInHours)
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
  }

  // If less than 7 days ago, show day of week
  if (diffInHours < 168) {
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }

  // Otherwise show date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })
}
