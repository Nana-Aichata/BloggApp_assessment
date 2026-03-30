// (frontend)/dashboard/ProfileSection.tsx

import Image from 'next/image';

interface UserData {
  id: string;
  profilePicture?: {
    url: string;
  };
}

export default function ProfileSection({ user }: { user: UserData }) {
  // Use the uploaded profile picture if it exists, otherwise use the local public image
  const finalImageUrl = user.profilePicture?.url || '/user_profile.jpg';

  return (
    <div className="profile-section">
      <div className="profile-container">
        <Image
          src={finalImageUrl}
          alt="User Profile"
          className="profile-circle"
          width={60}
          height={60}
          priority
        />
      </div>
    </div>
  );
}