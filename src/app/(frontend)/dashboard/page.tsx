import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { createPost } from './actions'
import { headers } from 'next/headers'

export default async function Dashboard() {
  const payload = await getPayload({ config: configPromise })
  
  const { user } = await payload.auth({ headers: await headers() })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1, 
  })

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          {user ? (
            <span className="text-sm">Logged in as: {user.email}</span>
          ) : (
            <Link href="/" className="text-blue-500">Login to post</Link>
          )}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          <div className="grid gap-6">
            {posts.docs.map((post) => (
              <div key={post.id} className="border p-4 rounded shadow-sm">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-600 text-sm">
                  By: {typeof post.author === 'object' ? post.author?.email : 'Anonymous'}
                </p>
                <div className="mt-2 line-clamp-3">
                  <p>Click to read more...</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {user && (
          <section className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
            <form action="/api/posts" method="POST" className="flex flex-col gap-4">
               <input 
                name="title" 
                placeholder="Post Title" 
                className="p-2 border rounded" 
                required 
               />
               <textarea 
                name="content" 
                placeholder="What's on your mind?" 
                className="p-2 border rounded h-32" 
                required 
               />
               <button type="submit" className="bg-black text-white p-2 rounded">
                 Publish Post
               </button>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}