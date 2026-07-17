/**
 * API Client — Base fetch wrapper for all backend calls.
 * Automatically injects the JWT token from localStorage into every request.
 * All API calls go to /api/* which Vite proxies to http://localhost:3001.
 */

const BASE_URL = '/api';

// ─── Token helpers ────────────────────────────────────────────────────────────
export function getToken(): string | null {
  return localStorage.getItem('pc_sim_token');
}

export function setToken(token: string) {
  localStorage.setItem('pc_sim_token', token);
}

export function removeToken() {
  localStorage.removeItem('pc_sim_token');
  localStorage.removeItem('pc_sim_user');
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem('pc_sim_user');
  return raw ? JSON.parse(raw) : null;
}

export function setCurrentUser(user: User) {
  localStorage.setItem('pc_sim_user', JSON.stringify(user));
}

// ─── Types ────────────────────────────────────────────────────────────────────
// MongoDB document ids are strings (ObjectId serialized to string).
export interface User {
  user_id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  total_points: number;
  created_at: string;
}

export interface Build {
  build_id: string;
  build_name: string;
  completion_status: string;
  score: number;
  completion_time: number | null;
  created_at: string;
  scenario_title: string | null;
  difficulty: string | null;
  components: BuildComponent[];
}

export interface BuildComponent {
  component_name: string;
  category: string;
  manufacturer: string;
  model: string;
  motherboard_slot: string;
  correctly_installed: boolean;
}

export interface Achievement {
  achievement_id: string;
  title: string;
  description: string;
  xp_reward: number;
  badge_image: string | null;
  unlocked_at?: string;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong.');
  }

  return data as T;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  async register(username: string, email: string, password: string) {
    const result = await apiFetch<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    setToken(result.token);
    setCurrentUser(result.user);
    return result;
  },

  async login(email: string, password: string) {
    const result = await apiFetch<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(result.token);
    setCurrentUser(result.user);
    return result;
  },

  logout() {
    removeToken();
  },
};

// ─── User API ─────────────────────────────────────────────────────────────────
export const userApi = {
  async getProfile(userId: string) {
    return apiFetch<User>(`/users/${userId}`);
  },

  async awardXp(userId: string, xpToAdd: number) {
    return apiFetch<{ user: User; leveledUp: boolean }>(`/users/${userId}/xp`, {
      method: 'PATCH',
      body: JSON.stringify({ xp_to_add: xpToAdd }),
    });
  },
};

// ─── Builds API ───────────────────────────────────────────────────────────────
export const buildsApi = {
  async getBuilds(userId: string) {
    return apiFetch<Build[]>(`/builds?userId=${userId}`);
  },

  async saveBuild(data: {
    build_name: string;
    scenario_id?: string;
    scenario_title?: string;
    difficulty?: string;
    completion_status?: string;
    score?: number;
    completion_time?: number;
    components?: Array<{
      component_id: string;
      component_name?: string;
      category?: string;
      manufacturer?: string;
      model?: string;
      motherboard_slot: string;
      correctly_installed?: boolean;
    }>;
  }) {
    return apiFetch<Build>('/builds', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteBuild(buildId: string) {
    return apiFetch<{ message: string }>(`/builds/${buildId}`, {
      method: 'DELETE',
    });
  },
};

// ─── Achievements API ─────────────────────────────────────────────────────────
export const achievementsApi = {
  async getUserAchievements(userId: string) {
    return apiFetch<Achievement[]>(`/achievements/${userId}`);
  },

  async unlockAchievement(achievementCode: string) {
    return apiFetch<{ unlocked: boolean; achievement: Achievement }>('/achievements/unlock', {
      method: 'POST',
      body: JSON.stringify({ achievement_id: achievementCode }),
    });
  },
};
