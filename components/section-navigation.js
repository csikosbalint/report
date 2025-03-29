import { GlobeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function NavigationSection() {
  const motto = "A ma gondolati, a holnap hírei."
  const menuItems = [
    { label: <Image className="pt-2" src="/logo.png" alt="Logo" width={100} height={60} />, href: '/', icon: <GlobeIcon /> },
    { label: "Főcím", href: '/' }
  ]

  return (
    <nav className="w-full bg-background border-b border-primary px-8">
      <div className="max-w-[var(--max-width-total)] mx-auto">
        <div className="flex h-12 items-center gap-6">
          <div className="basis-5/6 flex items-center gap-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="font-semibold hover:underline md:text-lg transition-colors hover:text-primary flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
          <div className="basis-1/6 pt-4 italic font-semibold tracking-wide antialiased font-sans text-primary text-nowrap">
            "{motto}"
          </div>
        </div>
      </div>
    </nav>
  )
}
