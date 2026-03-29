
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { headers } from 'next/headers'
import Link from 'next/link'
import { createPost } from './actions'
import { logout } from './actions'
import CategoryList from './CategoryList'
import './dashboard.css'

export default async function Dashboard() {

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1, 
  })

  
  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-circle"></div>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">My Posts</button>
          <button className="nav-item">Setting</button>
          <form action={logout} className="logout-form">
            <button type="submit" className="nav-item logout">
              Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* Header */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-text">
            <h1>
              Welcome Back, {user?.username || user?.email || 'Guest'}
            </h1>
            <p>Your ideas have a place here—start writing and share your thoughts with the world.
              Let’s turn your creativity into something impactful.
            </p>
            
          </div>
          {user ? (
            <Link href="/dashboard/create" className="create-post-btn">
              Create a Post
            </Link>
          ) : (
            <Link href="/" className="create-post-btn">
              Login to Post
            </Link>
          )}
        </header>

      {/* Categories */}
      <section className="categories-section">
          <div className="section-header">
            <h2>Top Categories</h2>
          </div>
          <CategoryList />
        </section>
    
        {/* Posts List */}
        <section className="posts-list">
          {posts.docs.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-image-box"></div>
              <div className="post-content">
                <div className="post-tags">
                  {post.categories?.map((cat: string) => (
                    <span key={cat} className="tag">{cat}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <div className="post-meta">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>{typeof post.author === 'object' ? post.author?.username : 'Author'}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}