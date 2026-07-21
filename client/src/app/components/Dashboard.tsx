import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Cpu, TrendingUp, BookOpen, Award, Clock, Zap, Target, Trophy, Star, ChevronRight, Settings, LogOut, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { userApi, buildsApi, achievementsApi, getCurrentUser, authApi, type User, type Build, type Achievement } from "../api/client";

const learningModules = [
  { title: "CPU & Socket Matching", progress: 100, icon: Cpu, color: "from-primary to-primary/70" },
  { title: "GPU & Power Estimation", progress: 75, icon: Zap, color: "from-secondary to-secondary/70" },
  { title: "RAM & Storage Types", progress: 50, icon: BookOpen, color: "from-accent to-accent/70" },
  { title: "PSU Cable Routing", progress: 25, icon: Award, color: "from-primary to-secondary" }
];

export function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  // XP thresholds: every 500 XP = 1 level
  const xpToNextLevel = user ? 500 - (user.xp % 500) : 500;
  const xpProgress = user ? ((user.xp % 500) / 500) * 100 : 0;

  // All-achievement placeholders merged with real unlocked ones
  const achievementSlots = [
    { icon: <Trophy className="size-5" />, title: "First PC Build" },
    { icon: <Star className="size-5" />, title: "Correct Sockets" },
    { icon: <Target className="size-5" />, title: "GPU Expert" },
    { icon: <Zap className="size-5" />, title: "Speed Builder" }
  ].map((slot) => ({
    ...slot,
    unlocked: achievements.some((a) => a.title === slot.title),
  }));

  useEffect(() => {
    async function loadData() {
      const storedUser = getCurrentUser();

      if (!storedUser) {
        // Not logged in — redirect to login
        onNavigate('login');
        return;
      }

      try {
        const [profile, userBuilds, userAchievements] = await Promise.all([
          userApi.getProfile(storedUser.user_id),
          buildsApi.getBuilds(storedUser.user_id),
          achievementsApi.getUserAchievements(storedUser.user_id),
        ]);
        setUser(profile);
        setBuilds(userBuilds.slice(0, 3)); // show 3 most recent
        setAchievements(userAchievements);
      } catch {
        // Token may have expired — redirect to login
        authApi.logout();
        onNavigate('login');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function handleLogout() {
    authApi.logout();
    onNavigate('landing');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="size-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const initials = user?.username?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) ?? 'JD';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Cpu className="size-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PC Builder Simulator
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="size-5" />
            </Button>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome + XP bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold">Welcome back, {user?.username ?? 'Student'}!</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="size-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <p className="text-muted-foreground text-lg mb-4">Continue your PC building and assembly lessons</p>

          {/* XP Progress Bar */}
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardContent className="py-4 px-6">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="font-semibold text-primary">Level {user?.level ?? 1} Builder</span>
                <span className="text-muted-foreground">{user?.xp ?? 0} XP total · {xpToNextLevel} XP to Level {(user?.level ?? 1) + 1}</span>
              </div>
              <Progress value={xpProgress} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-6 mb-8"
        >
          <Card className="backdrop-blur-xl bg-gradient-to-br from-primary to-primary/80 border-0 text-white cursor-pointer hover:shadow-2xl transition-all group" onClick={() => onNavigate('simulator')}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="size-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Start Simulator</h3>
                <p className="text-white/80 text-sm">Practice PC assembling lessons</p>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-gradient-to-br from-secondary to-secondary/80 border-0 text-white cursor-pointer hover:shadow-2xl transition-all group" onClick={() => onNavigate('components')}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="size-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Study Hardware</h3>
                <p className="text-white/80 text-sm">Review component definitions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-gradient-to-br from-accent to-accent/80 border-0 text-white cursor-pointer hover:shadow-2xl transition-all group" onClick={() => onNavigate('tutorials')}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="size-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">View Guides</h3>
                <p className="text-white/80 text-sm">Watch system assembly tutorials</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Learning Progress */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Hardware Lesson Progress</CardTitle>
                      <CardDescription>Master PC components step by step</CardDescription>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">Level {user?.level ?? 1} Builder</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningModules.map((module, i) => (
                    <motion.div
                      key={module.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                            <module.icon className="size-5 text-white" />
                          </div>
                          <span className="font-medium">{module.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{module.progress}% Completed</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Builds */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Assemblies</CardTitle>
                      <CardDescription>Your last {builds.length} build exercises</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => onNavigate('builds')}>
                      View All <ChevronRight className="size-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {builds.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      <Cpu className="size-10 mx-auto mb-3 opacity-30" />
                      <p>No builds yet. Start the simulator to begin!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {builds.map((build, i) => (
                        <motion.div
                          key={build.build_id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-accent/5 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`size-12 rounded-xl ${build.completion_status === 'Complete' ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted'} flex items-center justify-center`}>
                              <Cpu className="size-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{build.build_name}</h4>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                {build.difficulty && (
                                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">
                                    {build.difficulty}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="size-3" /> Score: {build.score}%
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="size-3" /> {new Date(build.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={build.completion_status === 'Complete' ? 'default' : 'secondary'}>
                            {build.completion_status === 'Complete' ? 'Verified' : 'In Progress'}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle>Milestone Badges</CardTitle>
                  <CardDescription>Your earned builder titles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {achievementSlots.map((achievement, i) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className={`p-4 rounded-xl text-center ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-primary to-secondary text-white'
                            : 'bg-muted/50 text-muted-foreground'
                        }`}
                      >
                        <div className="mb-2 flex justify-center">{achievement.icon}</div>
                        <p className="text-xs font-semibold">{achievement.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Tutor */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="backdrop-blur-xl bg-card/80 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="size-5 text-secondary" />
                    Tutor Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-sm font-semibold mb-1 text-slate-200">Try a workstation build</p>
                    <p className="text-xs text-muted-foreground">Practice socket compatibility using Intel Core i9 CPUs</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-semibold mb-1 text-slate-200">Complete PSU safety lesson</p>
                    <p className="text-xs text-muted-foreground">Learn about 80 Plus Gold ratings and power draw estimation</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => onNavigate('compatibility')}>
                    <p className="text-sm font-semibold mb-1 text-slate-200">Test compatibility checker</p>
                    <p className="text-xs text-muted-foreground">Simulate electrical and physical rules checking</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats from DB */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total XP Earned</span>
                    <span className="font-semibold text-base text-primary">{user?.xp ?? 0} XP</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-semibold text-base text-secondary">{user?.total_points ?? 0} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed Builds</span>
                    <span className="font-semibold text-base text-indigo-400">
                      {builds.filter(b => b.completion_status === 'Complete').length} builds
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Achievements</span>
                    <span className="font-semibold text-base text-emerald-400">{achievements.length} unlocked</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
