import { GlobeIcon } from 'lucide-react'
import Link from 'next/link'

export function NavigationSection() {
  const menuItems = [
    { label: 'Holnap.click', href: '/', icon: <GlobeIcon/> },
  ]

  return (
    <nav className="w-full bg-background border-b border-primary">
      <div className="max-w-[var(--max-width-total)] mx-auto"> 
        <div className="flex h-12 items-center px-4">
          <div className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-semibold hover:underline md:text-lg transition-colors hover:text-primary flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
