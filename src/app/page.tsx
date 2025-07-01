'use client'

import { Button } from '@/styles/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/styles/components/ui/card'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type PostType = {
    _id: string;
    title: string;
    content: string;
    slug: string;
    excerpt?: string;
};

export default function HomePage() {
    const [posts, setPosts] = useState<PostType[]>([]);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/api/posts/create');
            setPosts(res.data.posts); // adjust based on API shape
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className="container mx-auto px-4 py-12 min-h-screen">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                    <Card key={post._id} className="hover:shadow-md transition">
                        <CardHeader>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{post.excerpt || post.content.slice(0, 100) + '...'}</p>
                            <Link href={`/posts/${post.slug}`}>
                                <Button variant="outline" size="sm">Read More</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
