import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cpu, TrendingUp, Clock, ArrowLeft, Trash2, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { buildsApi, getCurrentUser, authApi, type Build } from "../api/client";

export function BuildHistory({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBuilds() {
      const user = getCurrentUser();
      if (!user) { onNavigate('login'); return; }

      try {
        const data = await buildsApi.getBuilds(user.user_id);
        setBuilds(data);
      } catch {
        authApi.logout();
        onNavigate('login');
      } finally {
        setLoading(false);
      }
    }
    loadBuilds();
  }, []);

  async function handleDelete(buildId: number) {
    setDeletingId(buildId);
    setError('');
    try {
      await buildsApi.deleteBuild(buildId);
      setBuilds((prev) => prev.filter((b) => b.build_id !== buildId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete build.');
    } finally {
      setDeletingId(null);
    }
  }

  const completed = builds.filter(b => b.completion_status === 'Complete').length;
  const inProgress = builds.filter(b => b.completion_status !== 'Complete').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center">
        <Loader2 className="size-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="size-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Cpu className="size-5 text-primary" />
              <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Assembly Archives
              </span>
            </div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-white font-semibold" onClick={() => onNavigate('simulator')}>
            New Assembly Lesson
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Your Historical Builds
          </h1>
          <p className="text-lg text-muted-foreground">View and review your saved PC assembly lessons.</p>
        </motion.div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{builds.length}</div>
              <p className="text-sm text-muted-foreground">Total Assembly Attempts</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">{completed}</div>
              <p className="text-sm text-muted-foreground">Successfully Booted</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">{inProgress}</div>
              <p className="text-sm text-muted-foreground">Draft Exercises</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Builds List */}
        {builds.length === 0 ? (
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardContent className="py-20 text-center">
              <Cpu className="size-14 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-xl font-semibold mb-2">No builds yet</h3>
              <p className="text-muted-foreground mb-6">Start the simulator to complete your first assembly lesson!</p>
              <Button className="bg-gradient-to-r from-primary to-secondary" onClick={() => onNavigate('simulator')}>
                Start First Assembly
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {builds.map((build, i) => (
              <motion.div
                key={build.build_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Card className="backdrop-blur-xl bg-card/80 border-primary/20 hover:shadow-lg hover:border-primary/45 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`size-16 rounded-xl ${build.completion_status === 'Complete' ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-slate-700'} flex items-center justify-center`}>
                          <Cpu className="size-8 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{build.build_name}</CardTitle>
                            <Badge variant={build.completion_status === 'Complete' ? 'default' : 'secondary'}>
                              {build.completion_status === 'Complete' ? 'Boot OK' : 'Draft'}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            {build.difficulty && (
                              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300 font-semibold">
                                {build.difficulty}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <TrendingUp className="size-4" /> Score: {build.score}%
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-4" /> {new Date(build.created_at).toLocaleDateString()}
                            </span>
                            <span className={`flex items-center gap-1 font-medium ${build.completion_status === 'Complete' ? 'text-emerald-400' : 'text-amber-400'}`}>
                              <CheckCircle className="size-4" /> {build.completion_status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(build.build_id)}
                        disabled={deletingId === build.build_id}
                      >
                        {deletingId === build.build_id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {build.components && build.components.length > 0 && (
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        {build.components.map((comp, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                            <p className="text-[10px] text-primary uppercase font-bold mb-1">{comp.category}</p>
                            <p className="font-semibold text-xs text-slate-200">{comp.component_name}</p>
                            <p className="text-[10px] text-muted-foreground">{comp.motherboard_slot}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
