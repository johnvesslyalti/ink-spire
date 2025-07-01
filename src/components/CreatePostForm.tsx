'use client'

import { useState } from 'react'
import { z } from 'zod'

const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
})

export default function CreatePostForm() {
    const [formData, setFormData] = useState({ title: '', content: '' })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)

        const validation = postSchema.safeParse(formData)
        if (!validation.success) {
            const firstError = validation.error.errors[0].message
            return setMessage({ type: 'error', text: firstError })
        }

        setLoading(true)
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Something went wrong')

            setMessage({ type: 'success', text: 'Post created successfully!' })
            setFormData({ title: '', content: '' })
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage({ type: 'error', text: err.message })
            } else {
                setMessage({ type: 'error', text: 'Unexpected error occurred' })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            {message && (
                <div className={`p-2 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter post title"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded h-40"
                        placeholder="Enter post content"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Create Post'}
                </button>
            </form>
        </div>
    )
}
