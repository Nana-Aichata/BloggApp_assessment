import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // This allows the signup page to work
    create: () => true, 
    // Usually, only the user themselves or an admin can read/update their own data
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }: any) => {
  return user?.roles?.includes('admin') ?? false;}, 
},
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'user'],
      defaultValue: ['user'],
      required: true,
      saveToJWT: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
