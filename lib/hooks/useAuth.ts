'use client';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'owner' | 'staff';
  is_verified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(profile as User);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data?.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, login, logout };
}
