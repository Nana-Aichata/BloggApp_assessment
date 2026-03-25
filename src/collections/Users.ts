import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    create: () => true, 
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
},
  admin: {
    useAsTitle: 'email',
  },
  
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
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: ['user'],
      required: true,
      saveToJWT: true,
    },
  ],
}

export default Users
