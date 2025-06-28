import { connectToDB } from "lib/db";
import { Post } from "models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } } ) {
    await connectToDB();
    try {
        const post = await Post.findOne({ slug: params.slug });
        if(!post) return NextResponse.json({ error: 'Post not found'}, { status: 404 });

        return NextResponse.json({
            title: post.title,
            content: post.content,
            createdAt: post.createdAt
        });
    } catch(error) {
        return NextResponse.json({ error: 'Failed to fetch post', details: error}, { status: 500} );
    }
}

export async function PUT(req: Request, { params }: { params: { slug: string } } ) {
    await connectToDB();

    try {
        const { title, content } = await req.json();

        const updatedPost = await Post.findOneAndUpdate(
            { slug: params.slug },
            { title, content },
            { new: true}
        );

        if(!updatedPost) {
            return NextResponse.json({ error: 'Post not found'}, { status: 404 });
        }

        return NextResponse.json({ success: true, post: updatedPost});
    } catch(error) {
        return NextResponse.json({ error: 'Failed to update post', details: error}, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } } ) {
    await connectToDB();

    try {
        const deletedPost = await Post.findOneAndDelete({ slug: params.slug });

        if(!deletedPost) {
            return NextResponse.json({ error: 'Post not found'}, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Post deleted"});
    } catch(error) {
        return NextResponse.json({ error: "Failed to delete post", details: error}, { status: 500 });
    }
}