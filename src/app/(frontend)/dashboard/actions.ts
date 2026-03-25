'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const payload = await getPayload({ config: configPromise })
  const headerList = await headers()
  
  // 1. Safety check: ensure the user is still logged in
  const { user } = await payload.auth({ headers: headerList })
  if (!user) throw new Error('You must be logged in to post')

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // 2. Create the post in the 'posts' collection
  await payload.create({
    collection: 'posts',
    data: {
      title,
      // Converting plain text from the form to a basic Lexical rich text format
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ text: content, type: 'text' }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      // The author field is handled by defaultValue in Posts.ts, 
      // but we can pass it explicitly for clarity:
      author: user.id,
    },
  })

  // 3. Refresh the dashboard so the new post appears immediately
  revalidatePath('/dashboard')
}