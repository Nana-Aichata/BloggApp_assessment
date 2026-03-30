import Image from 'next/image';

interface Media {
  url: string;
  [key: string]: any; 
}

interface UserData {
  id: string;
  profilePicture?: string | Media | null; 
}

export default function ProfileSection({ user }: { user: UserData }) {
  const getImageUrl = () => {
    if (user.profilePicture && typeof user.profilePicture === 'object') {
      return user.profilePicture.url;
    }
    return '/user_profile.jpg';
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