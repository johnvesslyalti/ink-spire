'use client'

import { useEffect, useState } from 'react'

type User = {
    _id: string
    name: string
    email: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users')
                if (!res.ok) throw new Error('Failed to fetch users')
                const data = await res.json()
                setUsers(data)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('An unexpected error occurred')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) return <div className="text-center mt-10">Loading...</div>
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

    return (
        <div className="max-w-3xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">User List</h1>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user._id} className="p-4 border rounded shadow bg-white">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
