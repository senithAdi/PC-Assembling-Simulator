import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ArrowLeft, PlayCircle, Clock, BookOpen, CheckCircle2, Search, Filter, Award, Cpu, Zap, HardDrive } from "lucide-react";
import { motion } from "motion/react";

const tutorials = [
  {
    id: 1,
    title: "PC Building Basics for Absolute Beginners",
    description: "Learn the fundamentals of computer hardware and assembly",
    duration: "15 min",
    level: "Beginner",
    progress: 100,
    category: "Fundamentals",
    icon: BookOpen,
    lessons: 5,
    color: "from-primary to-primary/70"
  },
  {
    id: 2,
    title: "Understanding CPU Architecture",
    description: "Deep dive into processors, cores, and performance",
    duration: "20 min",
    level: "Beginner",
    progress: 75,
    category: "Components",
    icon: Cpu,
    lessons: 6,
    color: "from-secondary to-secondary/70"
  },
  {
    id: 3,
    title: "GPU Selection Guide for Gaming",
    description: "How to choose the right graphics card for your needs",
    duration: "18 min",
    level: "Intermediate",
    progress: 50,
    category: "Components",
    icon: Zap,
    lessons: 7,
    color: "from-accent to-accent/70"
  },
  {
    id: 4,
    title: "RAM and Storage Explained",
    description: "Memory types, speeds, and storage solutions",
    duration: "12 min",
    level: "Beginner",
    progress: 25,
    category: "Components",
    icon: HardDrive,
    lessons: 4,
    color: "from-primary to-secondary"
  },
  {
    id: 5,
    title: "Building Your First Gaming PC",
    description: "Step-by-step assembly walkthrough with best practices",
    duration: "45 min",
    level: "Intermediate",
    progress: 0,
    category: "Assembly",
    icon: Award,
    lessons: 10,
    color: "from-secondary to-accent"
  },
  {
    id: 6,
    title: "Troubleshooting Common Issues",
    description: "How to diagnose and fix PC building problems",
    duration: "25 min",
    level: "Intermediate",
    progress: 0,
    category: "Advanced",
    icon: Award,
    lessons: 8,
    color: "from-accent to-primary"
  }
];

const learningPaths = [
  {
    title: "Complete Beginner Path",
    description: "Start from zero to building your first PC",
    tutorials: 4,
    duration: "2-3 hours",
    color: "from-primary to-secondary"
  },
  {
    title: "Gaming PC Master",
    description: "Specialize in high-performance gaming builds",
    tutorials: 6,
    duration: "4-5 hours",
    color: "from-secondary to-accent"
  },
  {
    title: "Budget Builder",
    description: "Learn to maximize value on limited budgets",
    tutorials: 5,
    duration: "3-4 hours",
    color: "from-accent to-primary"
  }
];

export function Tutorials({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="size-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <PlayCircle className="size-5 text-primary" />
              <span className="font-semibold">Tutorial Library</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={() => onNavigate('components')}>
              Component Library
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Video Tutorials & Guides
          </h1>
          <p className="text-xl text-muted-foreground mb-6">Learn PC building through interactive video lessons</p>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input placeholder="Search tutorials..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </div>
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Learning Paths</h2>
          <div className="grid grid-cols-3 gap-6">
            {learningPaths.map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className={`backdrop-blur-xl bg-gradient-to-br ${path.color} border-0 text-white cursor-pointer hover:shadow-2xl transition-all group`}>
                  <CardContent className="p-6">
                    <Award className="size-12 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-xl mb-2">{path.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{path.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <BookOpen className="size-4" /> {path.tutorials} tutorials
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" /> {path.duration}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tutorial Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 w-full mb-6">
              <TabsTrigger value="all">All Tutorials</TabsTrigger>
              <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="assembly">Assembly</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {tutorials.map((tutorial, i) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Card className="backdrop-blur-xl bg-card/80 border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all group cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start gap-4 mb-3">
                          <div className={`size-14 rounded-xl bg-gradient-to-br ${tutorial.color} flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                            <tutorial.icon className="size-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">{tutorial.category}</Badge>
                              <Badge variant="secondary" className="text-xs">{tutorial.level}</Badge>
                            </div>
                            <CardTitle className="text-lg mb-1">{tutorial.title}</CardTitle>
                            <CardDescription className="text-sm line-clamp-2">{tutorial.description}</CardDescription>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-4" /> {tutorial.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="size-4" /> {tutorial.lessons} lessons
                          </span>
                        </div>

                        {tutorial.progress > 0 && (
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-semibold">{tutorial.progress}%</span>
                            </div>
                            <Progress value={tutorial.progress} className="h-2" />
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary group-hover:shadow-lg transition-all">
                          {tutorial.progress > 0 ? (
                            <>
                              <PlayCircle className="size-4 mr-2" />
                              Continue Learning
                            </>
                          ) : (
                            <>
                              <PlayCircle className="size-4 mr-2" />
                              Start Tutorial
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fundamentals">
              <div className="grid grid-cols-2 gap-6">
                {tutorials.filter(t => t.category === "Fundamentals").map((tutorial) => (
                  <Card key={tutorial.id} className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="components">
              <div className="grid grid-cols-2 gap-6">
                {tutorials.filter(t => t.category === "Components").map((tutorial) => (
                  <Card key={tutorial.id} className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Your Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Learning Progress</CardTitle>
                  <CardDescription>Keep up the great work!</CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  8 / 15 Completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">8</div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">3</div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">4</div>
                  <p className="text-sm text-muted-foreground">To Start</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-secondary text-white text-center">
                  <div className="text-3xl font-bold mb-1">120</div>
                  <p className="text-sm opacity-90">Minutes Watched</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
