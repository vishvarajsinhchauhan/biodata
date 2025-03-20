import { biodata } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} {biodata.name}
    </footer>
  )
} 