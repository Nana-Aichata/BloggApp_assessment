'use client'
import React, { useState } from 'react'
import { createPost } from '../actions'
import './create_post.css'

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <div className="mobile-create-container">
      <header className="create-header">
        <span className="profile-indicator">U</span>
        <h1>New Post</h1>
        <button className="icon-btn edit-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </header>

      <div className="subheader-bar">
        <h2>Create & Publish</h2>
      </div>

      <form action={createPost} className="create-post-form">
        <section className="input-section">
          <div className="input-box">
            <p>Post Title</p>
            <input 
              type="text" 
              name="title"
              placeholder="Give your post a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="title-input"
            />
          </div>
        </section>

        <section className="input-section">
          <div className="input-box">
            <h3>Post Content</h3>
            <textarea
              name="content"
              placeholder="Write your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="content-textarea"
            />
            
            <div className="form-actions">
              <a href="/dashboard" className="cancel-btn">Cancel</a>
              <button type="submit" className="submit-btn" disabled={!title || !content}>
                Proceed
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}