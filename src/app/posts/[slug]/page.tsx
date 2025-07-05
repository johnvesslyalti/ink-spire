'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [post, setPost] = useState<{ title: string; content: string; createdAt: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  // Simulated user role (REPLACE with real auth logic)
  const currentUser = { role: 'admin' }; // Change to 'user' to test non-admin view
  const isAdmin = currentUser.role === 'admin';

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setForm({ title: data.title, content: data.content });
      } else {
        console.error('Post not found');
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const handleEdit = async () => {
    if (!isAdmin) return;
    setLoading(true);
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setPost(data.post);
      setIsEditing(false);
    } else {
      console.error(data.error);
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) return;
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    setLoading(true);
    const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    setLoading(false);

    if (res.ok) {
      alert('Post deleted');
      router.push('/');
    } else {
      console.error('Failed to delete');
    }
  };

  if (!post)
    return (
      <div className="p-4 text-center text-red-500 animate-pulse">
        Loading or Post not found...
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {isEditing ? (
        isAdmin ? (
          <div className="space-y-6 bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Post Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your content here..."
              className="w-full p-3 border border-gray-300 rounded-lg h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-red-500">You do not have permission to edit this post.</div>
        )
      ) : (
        <div className="space-y-6 bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
            <p className="text-sm text-gray-500">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-base text-gray-800 whitespace-pre-line leading-relaxed">{post.content}</p>

          {isAdmin && (
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
