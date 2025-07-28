import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const Membership = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      Swal.fire('Error', 'You need to login first', 'error');
      return;
    }

    try {
      setLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user membership status in backend
      const res = await axios.patch(
        `https://assignment-12-server-sigma-red.vercel.app/users/membership/${user.email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update user in context/local storage
      const updatedUser = { ...user, isMember: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      Swal.fire(
        'Success!',
        'You are now a premium member with Gold badge!',
        'success'
      ).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      Swal.fire('Error', 'Payment failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white text-black rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Upgrade to Premium</h2>
            <p className="mt-2 text-gray-600">
              Unlock all features with our premium membership
            </p>
          </div>

          <div className="bg-blue-50 text-black p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Gold Membership</h3>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Gold Badge
              </span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited posts (more than 5)
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Exclusive content access
              </li>
            </ul>

            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">$9.99</p>
              <p className="text-gray-500 text-sm">one-time payment</p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading || user?.isMember}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading || user?.isMember) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              'Processing...'
            ) : user?.isMember ? (
              'You are already a member'
            ) : (
              'Upgrade Now'
            )}
          </button>

          {user?.isMember && (
            <div className="mt-4 text-center text-green-600">
              <p>You are enjoying premium benefits!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Membership;