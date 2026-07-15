import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Cpu, Mail, Lock, User, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { authApi } from "../api/client";

// ─── Login Page ───────────────────────────────────────────────────────────────
export function LoginPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authApi.login(email, password);
      onNavigate('dashboard'); // redirect on success
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-6">
      <Button
        variant="ghost"
        className="absolute top-6 left-6"
        onClick={() => onNavigate('landing')}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-card/80 border-primary/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 size-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Cpu className="size-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your learning journey</CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@school.edu"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto text-sm text-primary" type="button">
                Forgot password?
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="size-4 mr-2 animate-spin" /> Signing In...</>
                ) : 'Sign In'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => onNavigate('register')} type="button">
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Register Page ────────────────────────────────────────────────────────────
export function RegisterPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await authApi.register(name, email, password);
      onNavigate('dashboard'); // redirect on success
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-6">
      <Button
        variant="ghost"
        className="absolute top-6 left-6"
        onClick={() => onNavigate('landing')}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-card/80 border-primary/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 size-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Cpu className="size-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Create Account</CardTitle>
            <CardDescription>Start your PC building journey today</CardDescription>
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="student@school.edu"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="size-4 mr-2 animate-spin" /> Creating Account...</>
                ) : 'Create Account'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => onNavigate('login')} type="button">
                  Sign in
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
