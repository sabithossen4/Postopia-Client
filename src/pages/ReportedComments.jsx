import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const ReportedComments = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  // Fetch reported comments
  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/admin/reported-comments');
        setReports(response.data.reports || []);
      } catch (err) {
        setError(err.message || 'Failed to load reported comments');
        console.error('Error fetching reported comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportedComments();
  }, []);

  // Delete comment
  const handleDelete = async (commentId) => {
    try {
      setIsDeleting(true);
      await axios.delete(`/admin/comments/${commentId}`);
      
      // Optimistically update UI
      setReports(prev => prev.filter(report => report._id !== commentId));
      
      Swal.fire('Deleted!', 'Comment deleted successfully', 'success');
    } catch (err) {
      Swal.fire('Error!', err.response?.data?.message || 'Failed to delete comment', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Warn user
  const handleWarn = async (email) => {
    try {
      setIsWarning(true);
      await axios.post(`/admin/warn-user/${email}`);
      Swal.fire('Warned!', 'User has been warned', 'success');
    } catch (err) {
      Swal.fire('Error!', err.response?.data?.message || 'Failed to warn user', 'error');
    } finally {
      setIsWarning(false);
    }
  };

  // Confirm before delete
  const confirmDelete = (commentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(commentId);
      }
    });
  };

  // Confirm before warning
  const confirmWarn = (email) => {
    Swal.fire({
      title: 'Warn User?',
      text: "This will send a warning to the user",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, warn them'
    }).then((result) => {
      if (result.isConfirmed) {
        handleWarn(email);
      }
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-4">Loading reported comments...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error: {error}</span>
        <button 
          className="btn btn-sm ml-4" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-xl font-medium">No reported comments found</h3>
        <p className="text-gray-500">When users report comments, they will appear here</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reported Comments</h1>
        <div className="badge badge-primary">{reports.length} reports</div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Comment</th>
              <th>Author</th>
              <th>Reporter</th>
              <th>Feedback</th>
              <th>Reported At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>
                  <div className="line-clamp-2">{report.text}</div>
                  <Link to={`/post/${report.postId}`} className="link link-primary text-sm">
                    View Post
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={report.author?.photoURL || '/default-user.png'} alt="Author" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{report.author?.name}</div>
                      <div className="text-sm text-gray-500">{report.author?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={report.reporter?.photoURL || '/default-user.png'} alt="Reporter" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{report.reporter?.name}</div>
                      <div className="text-sm text-gray-500">{report.reporter?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-warning">
                    {report.feedback === 'spam' && 'Spam'}
                    {report.feedback === 'inappropriate' && 'Inappropriate'}
                    {report.feedback === 'offensive' && 'Offensive'}
                  </span>
                </td>
                <td>
                  {new Date(report.reportedAt).toLocaleDateString()}
                  <br />
                  <span className="text-sm text-gray-500">
                    {new Date(report.reportedAt).toLocaleTimeString()}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => confirmDelete(report._id)}
                      disabled={isDeleting}
                      className="btn btn-error btn-xs"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      onClick={() => confirmWarn(report.author?.email)}
                      disabled={isWarning}
                      className="btn btn-warning btn-xs"
                    >
                      {isWarning ? 'Warning...' : 'Warn User'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedComments;