import Image from 'next/image';

interface UserData {
  id: string;
  profilePicture?: {
    url: string;
  } | null; // Allow null to satisfy the incoming data
}

export default function ProfileSection({ user }: { user: UserData }) {
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