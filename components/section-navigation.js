import Link from 'next/link'

export function NavigationSection() {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Recommended', href: '/recommended' },
    { label: 'Local', href: '/local' },
    { label: 'Blindspot', href: '/blindspot' },
  ]

  return (
    <nav className="w-full sticky top-0 z-20 bg-background border-b">
      <div className="max-w-[var(--max-width-total)] mx-auto"> 
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

