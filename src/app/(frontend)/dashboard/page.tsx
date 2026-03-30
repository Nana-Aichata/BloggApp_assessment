import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { headers } from 'next/headers'
import Link from 'next/link'
import { logout } from './actions'
import CategoryList from './CategoryList'
import './dashboard.css'
import ProfileSection from './ProfileSection'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.auth({ headers: await headers() })
  const user = result.user

  if (!user || typeof user !== 'object') {
    return <div>Loading user...</div> 
  }
  
  const params = await searchParams
  const categoryFilter = params.category as string
  const viewFilter = params.view as string

  const query: any = {}

  if (categoryFilter) {
    query.categories = {
      contains: categoryFilter,
    }
  }


  if (viewFilter === 'mine' && user) {
    query.author = {
      equals: user.id,
    }
  }

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    where: query,
  })

  const userData = {
    id: user.id,
    profilePicture: user.profilePicture,
  };

  const getPlainText = (html: string) => {
    return html.replace(/<[^>]*>?/gm, ''); 
  };

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <ProfileSection user={userData} />
        
        <nav className="sidebar-nav">
          <Link href="/dashboard" className={`nav-item ${!viewFilter ? 'active' : ''}`}>
            Dashboard
          </Link>
          
          <Link href="/dashboard?view=mine" className={`nav-item ${viewFilter === 'mine' ? 'active' : ''}`}>
            My Posts
          </Link>
          <button className="nav-item">Setting</button>
          <form action={logout} className="logout-form">
            <button type="submit" className="nav-item logout">Logout</button>
          </form>
        </nav>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="header-text">
            <h1>
              {viewFilter === 'mine' ? 'My Published Posts' : `Welcome Back, ${user?.username || 'Guest'}`}
            </h1>
            <p>
              {categoryFilter 
                ? `Showing posts in "${categoryFilter}"` 
                : "Your ideas have a place here—start writing and share your thoughts with the world."}
            </p>
          </div>
          {user && (
            <Link href="/dashboard/create" className="create-post-btn">
              Create a Post
            </Link>
          )}
        </header>

        <section className="categories-section">
          <div className="section-header">
            <h2>Top Categories</h2>
            {categoryFilter && <Link href="/dashboard" className="clear-filter">Clear Filter</Link>}
          </div>
          <CategoryList />
        </section>
    
        <section className="posts-list">
          {posts.docs.map((post: any) => {
            const rawContent = post.content?.root?.children?.[0]?.children?.[0]?.text || "";

            return (
              <div key={post.id} className="post-card">
                <Link href={`/dashboard/post/${post.id}`} className="post-link-wrapper" style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex' }}>
                  <div className="post-content">
                    <div className="post-tags">
                      {post.categories?.map((cat: string) => (
                        <span key={cat} className="tag">{cat}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    
                    <div 
                      className="post-text post-text-content" 
                      dangerouslySetInnerHTML={{ __html: rawContent }} 
                    />

                    <div className="post-meta">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>{typeof post.author === 'object' ? post.author?.username : 'Author'}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}