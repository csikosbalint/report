import { GlobeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function NavigationSection() {
  const motto = "A ma gondolatai, a holnap hírei."
  const menuItems = [
    { label: <Image className="hidden md:block pt-2" src="/logo.png" alt="Logo" width={100} height={60} />, href: '/', icon: <GlobeIcon /> },
    { label: "Főcím", href: '/' }
  ]

  return (
    <nav className="w-full bg-background border-b border-primary pl-4 pr-2 md:pl-8">
      <div className="max-w-[var(--max-width-total)] mx-auto">
        <div className="flex h-12 items-center gap-6 w-full">
          <div className="basis-4/6 md:basis-5/6 flex items-center gap-4">
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
          <div className="basis-2/6 md:basis-1/6 text-wrap text-xs md:pt-4 italic font-semibold tracking-wide antialiased font-sans text-primary md:text-nowrap">
            "{motto}"
          </div>
        </div>
      </div>
    </nav>
  )
}
