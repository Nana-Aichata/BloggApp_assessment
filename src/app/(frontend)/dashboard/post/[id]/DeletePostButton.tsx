'use client' // This makes it a Client Component

import { deletePost } from '../../actions'

export default function DeletePostButton({ id }: { id: string }) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // confirm() now works because this is a Client Component
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      await deletePost(id);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="admin-btn btn-delete">
        Delete Post
      </button>
    </form>
  );
}