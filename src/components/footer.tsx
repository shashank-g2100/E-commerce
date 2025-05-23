import Link from "next/link"
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Filters */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  All
                </Link>
              </li>
              <li>
                <Link href="/?category=electronics" className="hover:underline">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-300">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-4 text-sm">
          <p>© 2024 American</p>
        </div>
      </div>
    </footer>
  )
}