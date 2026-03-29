'use client'; // This is a client-side component

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  profilePicture?: any; // Define the proper type from your User model
}

interface ProfileSectionProps {
  user: UserData;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    user.profilePicture ? user.profilePicture.url : null
  );

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Assume you have an API route to handle the upload and user update
        const response = await fetch('/api/user/profile-picture', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const updatedUser = await response.json();
          // Update the local state with the new profile picture URL
          if (updatedUser.profilePicture && updatedUser.profilePicture.url) {
            setProfilePictureUrl(updatedUser.profilePicture.url);
          }
          // Refresh the page data if needed
          router.refresh();
        } else {
          console.error('Failed to upload profile picture');
          // Handle error, e.g., show an error message
        }
      } catch (error) {
        console.error('Error during profile picture upload:', error);
        // Handle error
      }
    }
  };

  // Determine the final image URL, using the local state first, then user prop, then default
  const finalImageUrl = profilePictureUrl || '/user_profile.jpg';

  return (
    <div className="profile-section">
      <div className="profile-container">
        <Image
          src={finalImageUrl}
          alt="User Profile"
          className="profile-circle"
          width={60}
          height={60}
          style={{ objectFit: 'cover' }}
        />
        <button type="button" className="edit-profile-btn" onClick={handleEditClick}>
          Edit
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}