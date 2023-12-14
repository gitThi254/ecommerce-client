import React from "react";
import { useVerify } from "../hooks/useAuth";
import ProfileForm from "../components/form/ProfileForm";

const Profile = () => {
  const { data: user, isPending, error } = useVerify();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <div>
        <h1>My Profile</h1>
      </div>
      <div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default Profile;
