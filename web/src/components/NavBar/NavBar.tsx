import { Link, useLocation } from '@redwoodjs/router'
import { Code2, FileSearch, Sparkles } from 'lucide-react'
import { cn } from 'src/lib/utils'

const navItems = [
  { to: '/generate', label: 'Code Generator', icon: Sparkles },
  { to: '/explain', label: 'Code Explainer', icon: FileSearch },
]

const NavBar = () => {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-semibold tracking-tight">Putter Playground</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default NavBar
