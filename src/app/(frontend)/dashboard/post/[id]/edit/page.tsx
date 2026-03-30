import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import EditPostClient from './EditPostClient'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  // Fetch the existing post data
  const post = await payload.findByID({
    collection: 'posts',
    id: id,
  })

  if (!post) return notFound()

  // Extract text from the Lexical content structure used in your actions.ts
  const initialContent = (post.content?.root?.children as any)?.[0]?.children?.[0]?.text || ""

  const initialData = {
    id: post.id,
    title: post.title,
    content: initialContent,
    categories: post.categories || [],
  }

  return <EditPostClient initialData={initialData} />
}