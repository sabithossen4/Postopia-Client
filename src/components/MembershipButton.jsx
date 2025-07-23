import  { use, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
 

const MembershipButton = () => {
  const { user } = use(AuthContext);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/member/${user.email}`)
        .then(res => setIsMember(res.data.isMember))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleJoin = async () => {
    const newUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      membership: true,
    };

    try {
      const res = await axios.post('http://localhost:3000/users', newUser);
      if (res.data.insertedId) {
        setIsMember(true);
        alert('Membership successful!');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  if (!user) return null;

  return (
    <div className="text-center my-6">
      {isMember ? (
        <button className="bg-gray-400 text-white px-4 py-2 rounded" disabled>
           You are already a member
        </button>
      ) : (
        <button
          onClick={handleJoin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Become a Member
        </button>
      )}
    </div>
  );
};

export default MembershipButton;
