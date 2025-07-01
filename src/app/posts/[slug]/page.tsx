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

  if (!post) return <div className="p-4 text-red-500">Loading or Post not found...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-2 border rounded h-40"
          />
          <div className="flex gap-4">
            <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-400 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-gray-600 text-sm">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
          <p className="mt-4 whitespace-pre-line">{post.content}</p>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 px-4 py-2 rounded text-white">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded text-white" disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
