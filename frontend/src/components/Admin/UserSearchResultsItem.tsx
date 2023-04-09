import { useMutation, useQueryClient } from 'react-query';
import { useSystemAdmin } from '../../context/AdminContext';
import systemAxios from '../../api/systemAxios';
import { motion } from 'framer-motion';
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal';
import { useState } from 'react';

export default function UserSearchResultsItem({
  userId,
  photo,
  userName,
  email,
  searchTerm,
}: any) {
  const { admin } = useSystemAdmin();
  const queryClient = useQueryClient();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { mutate: deleteUser } = useMutation(
    async () => {
      const res = await systemAxios.delete(`/api/admin/users/${userId}`, {
        headers: { authorization: `Bearer ${(admin as any).token}` },
      });
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(`user-search-results-${searchTerm}`);
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return (
    <>
      <DeleteConfirmationModal
        isVisible={showConfirmationModal}
        message={`Do you want to delete this User ?`}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={() => deleteUser()}
      />
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        className="flex flex-row gap-4 px-6 rounded-md py-3 border-[2px] border-custom-light-dark hover:-translate-y-2 duration-200 transition-all cursor-pointer"
      >
        <figure className="self-center w-14 h-14 rounded-full overflow-hidden">
          <img
            alt={userName}
            src={photo}
            className="w-full h-full object-cover"
          />
        </figure>
        <div>
          <h2 className="flex flex-col  gap-1 mb-3">
            <span className="text-2xl text-custom-light-green">{userName}</span>
            <span className="text-lg text-gray-400">{email}</span>
          </h2>
          <button
            onClick={() => setShowConfirmationModal(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-md self-center"
          >
            Delete
          </button>
        </div>
      </motion.li>
    </>
  );
}
