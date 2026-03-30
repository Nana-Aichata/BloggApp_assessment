import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import '../../dashboard.css'
import { deletePost } from '../../actions'

export default async function PostViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  // to fetch the specific post
  const post = await payload.findByID({
    collection: 'posts',
    id: id,
    depth: 1,
  })

  if (!post) return notFound()

  
  const fullContent = (post.content?.root?.children as any)?.[0]?.children?.[0]?.text || ""

  return (
    <div className="dashboard-wrapper">
      <main className="main-content" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <Link href="/dashboard" className="cancel-btn" style={{ marginBottom: '30px', display: 'inline-block', textDecoration: 'none', marginTop: '5px'}}>
          &larr; Back to Dashboard
        </Link>

        <article className="full-post-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header className="post-header" style={{ marginBottom: '40px' }}>
            <div className="post-tags" style={{ marginBottom: '10px' }}>
              {Array.isArray(post.categories) && (post.categories as string[]).map((cat: string) => (
                <span key={cat} className="tag" style={{ marginRight: '8px' }}>{cat}</span>
              ))}
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>{post.title}</h1>
            <div className="post-meta" style={{ color: '#666' }}>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span> • 
              <span> Written by {typeof post.author === 'object' ? post.author?.username : 'Author'}</span>
            </div>
          </header>

          <div 
            className="post-full-content"
            dangerouslySetInnerHTML={{ __html: fullContent }}
            style={{ fontSize: '18px', lineHeight: '1.8' }}
          />
        </article>
      </main>
    </div>
  )
}