'use client'
import React, { useState } from 'react'
import { createPost } from '../actions'
import './create_post.css'

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <>
      <h1 className="page-title">Create a New Post</h1>

      <div className="create-container">
        <form action={createPost}>
          <label className="field-label">Title</label>
          <input 
            type="text" 
            name="title"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="title-input"
          />

          <label className="post-label">Post</label>
          <div className="post-editor">
            <div className="editor-toolbar">
              <button type="button" className="tool-btn"><b>B</b></button>
              <button type="button" className="tool-btn"><span style={{textDecoration:'underline'}}>U</span></button>
              <button type="button" className="tool-btn"><i>I</i></button>
              <button type="button" className="tool-btn">🔗</button>
              <button type="button" className="tool-btn">🖼️</button>
              <span className="tool-divider"></span>
              <select className="font-size-select" defaultValue="14">
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
              </select>
            </div>

            <textarea
              name="content"
              placeholder="Type post here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="content-textarea"
            />
          </div>

          <div className="form-actions">
            <a href="/dashboard" className="cancel-btn">Cancel</a>
            <button type="submit" className="submit-btn">Publish</button>
          </div>
        </form>
      </div>
    </>
  )
}