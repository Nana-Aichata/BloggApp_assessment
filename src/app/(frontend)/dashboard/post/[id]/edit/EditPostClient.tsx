'use client'
import React, { useState, useRef, useEffect } from 'react'
import { updatePost } from '../../../actions'
import '@/app/(frontend)/dashboard/create/create_post.css'

const CATEGORY_OPTIONS = [
  "Technology", "Business & Finance", "Education", "Lifestyle", "Travel", 
  "Food & Cooking", "Fashion & Beauty", "Health & Fitness", "Entertainment", 
  "News & Opinion", "Creative & Hobbies", "Home & Living", "Pets & Animals", 
  "Parenting & Family", "Religion & Spirituality"
];

export default function EditPostClient({ initialData }: { initialData: any }) {
  const [title, setTitle] = useState(initialData.title)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData.categories)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null) 

  // Pre-fill the contenteditable area after mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialData.content
    }
  }, [initialData.content])

  const toggleCategory = (cat: string) => {
    if (!selectedCategories.includes(cat)) {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  const removeCategory = (cat: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== cat));
  };

  const applyCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value)
    if (editorRef.current) editorRef.current.focus()
  }

  // Bind the post ID to the server action so it knows which post to update
  const updatePostWithId = updatePost.bind(null, initialData.id)

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Image = event.target?.result as string;
          applyCommand('insertImage', base64Image);
        };
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    }

  return (
    <div className="main-content">
      <h1 className="page-title">Edit Post</h1>
      <div className="create-container">
        <form action={updatePostWithId}>
          <label className="field-label">Title</label>
          <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="title-input" 
            required 
          />

          <div className="category-select-container">
            <label className="category-label">Category</label>
            <select className="category-dropdown" onChange={(e) => toggleCategory(e.target.value)} value="">

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
            <input type="hidden" name="categories" value={JSON.stringify(selectedCategories)} />
          </div>

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

            <div
              className="content-editable-area"
              contentEditable
              ref={editorRef}
              onInput={() => {
                const hiddenInput = document.getElementById('content-input') as HTMLInputElement;
                if (hiddenInput && editorRef.current) {
                  hiddenInput.value = editorRef.current.innerHTML;
                }
              }}
            />
        
            <input type="hidden" name="content" id="content-input" />
          </div>

          <div className="form-actions">
            <a href="/dashboard" className="cancel-btn">Cancel</a>
            <button type="submit" className="submit-btn">Publish</button>
          </div>
        </form>
        </div>
      </div>
    
  )
}