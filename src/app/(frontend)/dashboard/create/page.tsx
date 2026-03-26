import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createPost } from '../actions'
import '../dashboard.css' 

export default async function CreatePostPage() {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })

  // Requirement: Ensure unauthenticated users cannot create posts
  if (!user) {
    redirect('/')
  }

  return (
    <div className="dashboard-wrapper">
      <main className="main-content">
        <header className="content-header">
          <h1>Create a New Post</h1>
          <p>Share your latest thoughts with the world.</p>
        </header>

        <section className="create-post-form-section">
          <form action={createPost} className="flex flex-col gap-6 max-w-2xl">
            <div className="form-group">
              <label htmlFor="title" className="block mb-2 font-bold">Title</label>
              <input 
                id="title"
                name="title" 
                placeholder="Enter an engaging title..." 
                className="w-full p-3 border rounded shadow-sm text-black" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="block mb-2 font-bold">Content</label>
              <textarea 
                id="content"
                name="content" 
                placeholder="Write your story here..." 
                className="w-full p-3 border rounded h-64 shadow-sm text-black" 
                required 
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="create-post-btn">
                Publish Post
              </button>
              <a href="/dashboard" className="nav-item" style={{ textAlign: 'center', alignSelf: 'center' }}>
                Cancel
              </a>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}