import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
} | null

type BlogStore = {
  user: User
  setUser: (user: User) => void
  logout: () => void

  loading: boolean
  setLoading: (loading: boolean) => void

  error: string | null
  setError: (error: string | null) => void
}

export const useBlogStore = create<BlogStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),
}))
