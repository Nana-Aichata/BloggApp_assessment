import Image from 'next/image';

interface Media {
  url: string;
  [key: string]: any; 
}

interface UserData {
  id: string;
  // This matches the error: 'string | Media | null | undefined'
  profilePicture?: string | Media | null; 
}

export default function ProfileSection({ user }: { user: UserData }) {
  // Logic to extract the URL whether it's an object or a string
  const getImageUrl = () => {
    if (user.profilePicture && typeof user.profilePicture === 'object') {
      return user.profilePicture.url;
    }
    return '/user_profile.jpg'; // Fallback
  };

  const finalImageUrl = getImageUrl();

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