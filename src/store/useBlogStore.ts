import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
} | null

type BlogPost = {
  _id: string
  title: string
  slug: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

type BlogStore = {
  user: User
  setUser: (user: User) => void
  logout: () => void

  posts: BlogPost[]
  setPosts: (posts: BlogPost[]) => void
  addPost: (post: BlogPost) => void
  updatePost: (post: BlogPost) => void
  deletePost: (postId: string) => void

  loading: boolean
  setLoading: (loading: boolean) => void

  error: string | null
  setError: (error: string | null) => void
}

export const useBlogStore = create<BlogStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  updatePost: (updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),
}))
