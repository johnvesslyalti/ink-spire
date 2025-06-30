import { connectToDB } from "lib/db";
import { Post } from "models/Post";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
    await connectToDB();

    try {
        const { title, content } = await req.json();

        if (!title || !content ) {
            return NextResponse.json({ error: 'Missing title or content'}, { status: 400 });
        }

        const slug = slugify(title, { lower: true, strict: true});
        const existing = await Post.findOne({ slug });

        if(existing) {
            return NextResponse.json({ error: 'Post with the same title already exists'}, { status: 409 });
        }

        const newPost = await Post.create({ title, content, slug });
        return NextResponse.json({ success: true, post: newPost}, { status: 201 });
    } catch(error) {
        return NextResponse.json({ error: "Failed to create post", details: error}, { status: 400 });
    }
}