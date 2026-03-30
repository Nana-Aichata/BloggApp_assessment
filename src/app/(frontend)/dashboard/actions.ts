'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const payload = await getPayload({ config: configPromise })
  const headerList = await headers()
  
  // ensure the user is still logged in
  const { user } = await payload.auth({ headers: headerList })
  if (!user) throw new Error('You must be logged in to post')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const categories = JSON.parse(formData.get('categories') as string || '[]')

  // 
  await payload.create({
    collection: 'posts',
    data: {
      title,
      categories,
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
      author: user.id,
    },
  })

  revalidatePath('/dashboard')
  redirect('/dashboard') 
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token') 
  redirect('/')
}

export async function deletePost(id: string) {
  const payload = await getPayload({ config: configPromise })
  const headerList = await headers()
  
  const { user } = await payload.auth({ headers: headerList })
  if (!user) throw new Error('Unauthorized')

  await payload.delete({
    collection: 'posts',
    id: id,
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}