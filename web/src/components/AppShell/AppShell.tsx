import type { ReactNode } from 'react'
import NavBar from 'src/components/NavBar/NavBar'

interface AppShellProps {
  children: ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}

export default AppShell
