import { Button } from '@/styles/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/styles/components/ui/card'
import Link from 'next/link'

const dummyPosts = [
  {
    id: 1,
    title: 'How to Get Started with Blogging',
    excerpt: 'A beginner’s guide to creating and growing your own blog in 2025...',
    slug: 'get-started-blogging',
  },
  {
    id: 2,
    title: 'Why Writing Online Matters',
    excerpt: 'Sharing your ideas online can open doors, build audience, and boost your career...',
    slug: 'why-writing-matters',
  },
  {
    id: 3,
    title: 'Top 5 Blog Topics That Always Work',
    excerpt: 'Evergreen ideas that will never run out of traffic...',
    slug: 'top-5-blog-topics',
  },
]

export default function HomePage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-blue-600">BlogCraft</span></h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Explore thoughts, share ideas, and read what others are writing. Your next great story starts here.
        </p>
        <Link href="/create">
          <Button className="mt-6">Create Your First Post</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyPosts.map(post => (
          <Card key={post.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <Link href={`/posts/${post.slug}`}>
                <Button variant="outline" size="sm">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
