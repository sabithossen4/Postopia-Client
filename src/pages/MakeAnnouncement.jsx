import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  
  const createAnnouncementMutation = useMutation({
    mutationFn: (announcementData) => axios.post('/admin/announcements', announcementData),
    onSuccess: () => {
      Swal.fire('Success', 'Announcement created successfully', 'success');
      reset();
      navigate('/');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to create announcement', 'error');
    }
  });

  const onSubmit = (data) => {
    createAnnouncementMutation.mutate(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Make Announcement</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Announcement title"
            className="input input-bordered w-full"
            {...register('title', { required: 'Title is required' })}
          />
        </div>
        
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Announcement details"
            className="textarea textarea-bordered h-24"
            {...register('description', { required: 'Description is required' })}
          ></textarea>
        </div>
        
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={createAnnouncementMutation.isLoading}
          >
            {createAnnouncementMutation.isLoading ? 'Posting...' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAnnouncement;