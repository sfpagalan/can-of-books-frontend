import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user } = useAuth0();

  return (
    <div>
      <h2>Profile</h2>
      <img src={user.picture} alt={user.name} />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;