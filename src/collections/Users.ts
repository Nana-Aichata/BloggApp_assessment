import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: () => true, 
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
},
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true, 
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'user'],
      defaultValue: ['user'],
      required: true,
      saveToJWT: true,
    },
  ],
}

export default Users
