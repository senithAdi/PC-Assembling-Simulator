import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cpu, Zap, BookOpen, Award, Users, Shield, Rocket, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const features = [
    {
      icon: <Cpu className="size-8 text-primary" />,
      title: "Interactive Assembly",
      description: "Build PCs virtually with drag-and-drop components in a safe learning environment"
    },
    {
      icon: <Zap className="size-8 text-secondary" />,
      title: "Real-time Compatibility",
      description: "Get instant feedback on component compatibility with AI-powered recommendations"
    },
    {
      icon: <BookOpen className="size-8 text-accent" />,
      title: "Educational Guides",
      description: "Learn through step-by-step tutorials and comprehensive hardware explanations"
    },
    {
      icon: <Award className="size-8 text-primary" />,
      title: "Track Progress",
      description: "Earn badges and achievements as you master PC building skills"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Students Learning" },
    { value: "50+", label: "PC Components" },
    { value: "100%", label: "Safe & Virtual" },
    { value: "24/7", label: "Always Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Cpu className="size-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PC Builder Simulator
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('login')}>Login</Button>
            <Button onClick={() => onNavigate('register')} className="bg-gradient-to-r from-primary to-secondary">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Rocket className="size-3 mr-1" />
            Educational Platform for Students
          </Badge>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Learn PC Building Through
            <br />
            Interactive Simulation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master computer hardware assembly in a safe, virtual environment designed for school students and beginners.
            No expensive equipment needed, no risk of damage.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => onNavigate('dashboard')} className="bg-gradient-to-r from-primary to-secondary text-lg px-8">
              <Rocket className="size-5 mr-2" />
              Start Building Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('components')} className="text-lg px-8">
              <BookOpen className="size-5 mr-2" />
              Learn Components
            </Button>
          </div>
        </motion.div>

        {/* Animated PC Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-full" />
            <Card className="relative backdrop-blur-xl bg-card/80 border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-12">
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { icon: Cpu, label: "CPU", color: "from-primary to-primary/70" },
                    { icon: Zap, label: "GPU", color: "from-secondary to-secondary/70" },
                    { icon: Shield, label: "RAM", color: "from-accent to-accent/70" },
                    { icon: TrendingUp, label: "Storage", color: "from-primary to-secondary" }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} group cursor-pointer hover:scale-105 transition-transform`}
                    >
                      <item.icon className="size-12 text-white mx-auto mb-3" />
                      <p className="text-white font-medium">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20 text-center p-6 hover:shadow-xl hover:border-primary/40 transition-all">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-xl text-muted-foreground">Everything you need to become a PC building expert</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20 h-full hover:shadow-2xl hover:border-primary/40 transition-all group">
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 mb-20">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-primary via-secondary to-accent border-0 text-white">
          <CardContent className="p-16 text-center">
            <Users className="size-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your PC Building Journey?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of students learning computer hardware</p>
            <Button size="lg" variant="secondary" onClick={() => onNavigate('register')} className="text-lg px-8">
              Create Free Account
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 backdrop-blur-xl bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Features</li>
                <li className="hover:text-primary cursor-pointer">Tutorials</li>
                <li className="hover:text-primary cursor-pointer">Components</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Documentation</li>
                <li className="hover:text-primary cursor-pointer">Guides</li>
                <li className="hover:text-primary cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Help Center</li>
                <li className="hover:text-primary cursor-pointer">Contact Us</li>
                <li className="hover:text-primary cursor-pointer">Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Privacy</li>
                <li className="hover:text-primary cursor-pointer">Terms</li>
                <li className="hover:text-primary cursor-pointer">Cookies</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-center text-muted-foreground">
            <p>&copy; 2024 PC Builder Simulator. Built for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
