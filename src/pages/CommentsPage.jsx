import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const CommentsPage = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  // স্ট্যাটিক ফিডব্যাক অপশন
  const feedbackOptions = [
    { value: 'spam', label: 'এটি স্প্যাম' },
    { value: 'inappropriate', label: 'অনুপযুক্ত কন্টেন্ট' },
    { value: 'offensive', label: 'আপত্তিকর ভাষা' }
  ];

  // পোস্টের কমেন্ট লোড করুন
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://assignment-12-server-sigma-red.vercel.app/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error('কমেন্ট লোড করতে সমস্যা:', error);
        Swal.fire('ত্রুটি', 'কমেন্ট লোড করতে ব্যর্থ', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // ফিডব্যাক সিলেক্ট হ্যান্ডলার
  const handleFeedbackChange = (commentId, value) => {
    setSelectedFeedback(prev => ({
      ...prev,
      [commentId]: value
    }));
  };

  // রিপোর্ট সাবমিট হ্যান্ডলার
  const handleReport = async (commentId) => {
    if (!selectedFeedback[commentId]) return;

    try {
      await axios.post(`https://assignment-12-server-sigma-red.vercel.app/comments/${commentId}/report`, {
        reporterEmail: user.email,
        feedback: selectedFeedback[commentId]
      });

      // রিপোর্ট সাবমিটের পর বাটন ডিসেবল করুন
      setSelectedFeedback(prev => ({
        ...prev,
        [commentId]: null
      }));

      Swal.fire('রিপোর্টেড!', 'আপনার রিপোর্ট জমা হয়েছে', 'success');
    } catch (error) {
      Swal.fire('ত্রুটি', 'রিপোর্ট জমা দিতে ব্যর্থ', 'error');
    }
  };

  // সম্পূর্ণ কমেন্ট দেখানোর মোডাল
  const showFullComment = (comment) => {
    setModalContent(
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{comment.authorName}-এর কমেন্ট</h3>
        <p className="text-gray-700 mb-4">{comment.text}</p>
        <div className="text-sm text-gray-500">
          পোস্ট করা: {new Date(comment.createdAt).toLocaleString()}
        </div>
        <button
          onClick={() => setModalContent(null)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          বন্ধ করুন
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-12">কমেন্ট লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">পোস্ট কমেন্টস</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            পোস্টে ফিরে যান
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">কোনো কমেন্ট নেই। প্রথম কমেন্ট করুন!</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      কমেন্টার
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      কমেন্ট
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ফিডব্যাক
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      একশন
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comments.map(comment => (
                    <tr key={comment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={comment.authorPhoto || '/default-user.png'}
                              alt={comment.authorName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {comment.authorName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {comment.authorEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {comment.text.length > 20 ? (
                            <>
                              {comment.text.substring(0, 20)}...
                              <button
                                onClick={() => showFullComment(comment)}
                                className="text-blue-600 hover:text-blue-800 ml-1"
                              >
                                আরো পড়ুন
                              </button>
                            </>
                          ) : (
                            comment.text
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={selectedFeedback[comment._id] || ''}
                          onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="">ফিডব্যাক নির্বাচন করুন</option>
                          {feedbackOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleReport(comment._id)}
                          disabled={!selectedFeedback[comment._id]}
                          className={`px-3 py-1 rounded-md text-white ${selectedFeedback[comment._id] ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                          রিপোর্ট করুন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* সম্পূর্ণ কমেন্টের মোডাল */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;