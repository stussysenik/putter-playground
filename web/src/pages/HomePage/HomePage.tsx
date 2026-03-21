import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Sparkles, FileSearch, ArrowRight } from 'lucide-react'

import AppShell from 'src/components/AppShell/AppShell'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'src/components/ui/card'

const playgrounds = [
  {
    title: 'Code Generator',
    description: 'Describe what you want in plain English. GLM 4.7 writes the code for you — with streaming output and syntax highlighting.',
    icon: Sparkles,
    route: routes.codeGenerator(),
    gradient: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Code Explainer',
    description: 'Paste any code snippet. Get a detailed line-by-line explanation, complexity analysis, and improvement suggestions.',
    icon: FileSearch,
    route: routes.codeExplainer(),
    gradient: 'from-violet-500/10 to-pink-500/10',
    iconColor: 'text-violet-400',
  },
]

const HomePage = () => {
  return (
    <AppShell>
      <Metadata title="Putter Playground" description="AI-powered code playgrounds" />

      <div className="animate-fade-in space-y-12 pt-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">Putter</span> Playground
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Interactive AI playgrounds powered by GLM 4.7. Generate code from descriptions or get instant explanations of any snippet.
          </p>
        </div>

        {/* Playground Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {playgrounds.map(({ title, description, icon: Icon, route, gradient, iconColor }) => (
            <Link key={title} to={route} className="group">
              <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} mb-2`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2.5 transition-all">
                    Try it out
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground">
          Powered by GLM 4.7 via Zhipu AI &middot; Built with RedwoodJS
        </p>
      </div>
    </AppShell>
  )
}

export default HomePage
