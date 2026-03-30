import Image from 'next/image';

interface Media {
  url: string;
  [key: string]: any; 
}

interface UserData {
  id: string;
  profilePicture?: string | Media | null; 
}

export default function ProfileSection({ user }: { user: any }) {
  // If user.profilePicture is already a string (URL), use it; otherwise fallback
  const finalImageUrl = typeof user.profilePicture === 'string' 
    ? user.profilePicture 
    : '/user_profile.jpg';

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-circle"> {/* Added this wrapper to apply the CSS border */}
          <Image
            src={finalImageUrl}
            alt="User Profile"
            style={{ objectFit: 'cover' }} // Ensures the image fills the circle without stretching
            width={140}  // Matches the .profile-circle size in your CSS
            height={140}
            priority
          />
        </div>
      </div>
    </div>
  );
}