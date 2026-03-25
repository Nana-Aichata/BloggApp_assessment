import type { CollectionConfig } from "payload";
import { de } from "payload/i18n/de";

const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "content", type: "richText", required: true },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      defaultValue: ({ user }: any) => user?.id,
      admin: { condition: () => false },
    },
  ],
}

export default Posts;

