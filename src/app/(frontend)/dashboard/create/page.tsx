'use client'
import React, { useState, useRef } from 'react'
import { createPost } from '../actions'
import './create_post.css'

const CATEGORY_OPTIONS = [
  "Technology", "Business & Finance", "Education", "Lifestyle", "Travel", 
  "Food & Cooking", "Fashion & Beauty", "Health & Fitness", "Entertainment", 
  "News & Opinion", "Creative & Hobbies", "Home & Living", "Pets & Animals", 
  "Parenting & Family", "Religion & Spirituality"
];

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null) 

  const toggleCategory = (cat: string) => {
    if (!selectedCategories.includes(cat)) {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const removeCategory = (cat: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== cat));
  };

  // Function to apply real browser formatting (Bold, Italic, etc.)
  const applyCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value)
    if (editorRef.current) editorRef.current.focus()
  }

  // New function to handle local image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target?.result as string;
        // Insert the image directly into the contentEditable area
        applyCommand('insertImage', base64Image);
      };
      reader.readAsDataURL(file);
    }
    // Clear the input so the same image can be uploaded again if deleted
    e.target.value = '';
  }

  return (
    <>
      <div className="main-content"> {/* Add this wrapper to match dashboard layout */}
      <h1 className="page-title">Create a New Post</h1>

      {/* Tile Section */}
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

          {/* Category Selection Section */}
          <div className="category-select-container">
            <label className="category-label">Category</label>
            <select 
              className="category-dropdown" 
              onChange={(e) => toggleCategory(e.target.value)}
              value=""
            >
              <option value="" disabled>Select a category</option>
              {CATEGORY_OPTIONS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <div className="selected-tags-container">
              {selectedCategories.map(cat => (
                <div key={cat} className="category-pill">
                  {cat}
                  <button type="button" onClick={() => removeCategory(cat)}>×</button>
                </div>
              ))}
            </div>
            {/* Hidden input to send array to server action */}
            <input type="hidden" name="categories" value={JSON.stringify(selectedCategories)} />
          </div>

          {/* Post Content Section */}
          <label className="post-label">Post</label>
          <div className="post-editor">
            <div className="editor-toolbar">
              <button type="button" className="tool-btn" onClick={() => applyCommand('bold')}><b>B</b></button>
              <button type="button" className="tool-btn" onClick={() => applyCommand('underline')}><u>U</u></button>
              <button type="button" className="tool-btn" onClick={() => applyCommand('italic')}><i>I</i></button>
              
              <button type="button" className="tool-btn" onClick={() => {
                const url = prompt("Enter the link URL:");
                if (url) applyCommand('createLink', url);
              }}>🔗</button>
              
              <button type="button" className="tool-btn" onClick={() => fileInputRef.current?.click()}>
                  🖼️
                </button>
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={handleImageUpload}
                />

              <span className="tool-divider"></span>

              <select 
                className="font-size-select" 
                onChange={(e) => applyCommand('fontSize', e.target.value)}
                defaultValue="3"
              >
                <option value="1">10px</option>
                <option value="2">12px</option>
                <option value="3">14px</option>
                <option value="4">16px</option>
                <option value="5">18px</option>
                <option value="6">24px</option>
                <option value="7">32px</option>
              </select>
            </div>

            {/* This div replaces the textarea to allow real rich text rendering */}
            <div
              className="content-editable-area"
              contentEditable
              ref={editorRef}
              onInput={() => {
                // This updates the hidden input so the form action gets the HTML
                const hiddenInput = document.getElementById('content-input') as HTMLInputElement;
                if (hiddenInput && editorRef.current) {
                  hiddenInput.value = editorRef.current.innerHTML;
                }
              }}
            />
            
            {/* Hidden input to pass the editor content to the 'createPost' action */}
            <input type="hidden" name="content" id="content-input" />
          </div>

          <div className="form-actions">
            <a href="/dashboard" className="cancel-btn">Cancel</a>
            <button type="submit" className="submit-btn">Publish</button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}