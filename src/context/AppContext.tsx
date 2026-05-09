'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { api } from '@/lib/api';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'conflict' | 'process' | 'support' | 'strategic' | 'other';
  date: string;
  status: 'raw' | 'curated';
  curatedBy?: string;
  evidences: string[];
  notes?: string;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AppState {
  user: User | null;
  achievements: Achievement[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addAchievement: (achievement: Omit<Achievement, 'id'>) => Promise<void>;
  updateAchievement: (id: string, updates: Partial<Achievement>) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

const USER_KEY = 'alixy.user';

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(USER_KEY) : null;
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const fetchAchievements = useCallback(async () => {
    try {
      const data = await api<Achievement[]>('/achievements');
      setAchievements(data);
    } catch (err) {
      console.error('Failed to load achievements', err);
    }
  }, []);

  useEffect(() => {
    if (user) fetchAchievements();
    else setAchievements([]);
  }, [user, fetchAchievements]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const u = await api<User>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(u);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const addAchievement = useCallback(async (achievement: Omit<Achievement, 'id'>) => {
    const created = await api<Achievement>('/achievements', {
      method: 'POST',
      body: JSON.stringify(achievement),
    });
    setAchievements((prev) => [created, ...prev]);
  }, []);

  const updateAchievement = useCallback(async (id: string, updates: Partial<Achievement>) => {
    const updated = await api<Achievement>(`/achievements/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    setAchievements((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        achievements,
        loading,
        login,
        logout,
        addAchievement,
        updateAchievement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
