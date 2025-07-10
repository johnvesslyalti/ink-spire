import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const post = await res.json();

  const currentUser = { role: 'admin' };
  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="p-6 max-w-3xl mx-auto">
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
            {/* You can move these buttons to a client component if needed */}
            <form action={`/posts/${params.slug}/edit`}>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Edit
              </button>
            </form>
            <form method="POST" action={`/api/posts/${params.slug}/delete`}>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}