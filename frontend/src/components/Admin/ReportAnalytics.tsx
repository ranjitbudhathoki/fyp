import { AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import systemAxios from '../../api/systemAxios';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { motion, Variants } from 'framer-motion';
import { useSystemAdmin } from '../../context/AdminContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal';
import { toast } from 'react-toastify';
import CustomToastify from '../CustomToastify';

const variants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: 'linear',
      type: 'tween',
    },
  },
};

function DeRegisterCard({ userName, id, photo, page, count }: any) {
  const { admin } = useSystemAdmin();

  const queryClient = useQueryClient();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { mutate } = useMutation(
    async () => {
      const res = await systemAxios.post(
        `/api/admin/warnings/${id}`,
        { admin },
        {
          headers: { authorization: `Bearer ${(admin as any).token}` },
        }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(`report-analytics-${page}`);
        toast.success('Warning sent successfully');
        console.log(data);
      },
      onError: (error) => {
        toast.error('Something went wrong..');
        console.log(error);
      },
    }
  );

  return (
    <>
      <DeleteConfirmationModal
        isVisible={showConfirmationModal}
        message={`Do you send warning to this User ?`}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={() => {
          setShowConfirmationModal(false);
          mutate();
        }}
      />

      <motion.div
        variants={itemVariants}
        className="flex  bg-custom-black border-custom-light-dark border-2 items-center  rounded-md gap-3 p-3 hover:!-translate-y-2 transition-all duration-200  cursor-pointer hover:shadow-lg"
      >
        <figure className="w-16 h-16 flex-shrink-0  rounded-full overflow-hidden">
          <img referrerPolicy="no-referrer" src={photo} alt={userName} />
        </figure>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg text-custom-light-green">{userName}</h2>
          <p className="text-sm text-white">Report Count: {count}</p>
          <button
            onClick={() => setShowConfirmationModal(true)}
            className="bg-red-600 text-sm mt-2 self-start  px-3 py-1 flex items-center justify-center text-white rounded-md"
          >
            Send Warning
          </button>
        </div>
      </motion.div>
    </>
  );
}

async function fetchRportDetails(page: number, admin: any) {
  const res = await systemAxios.get(`/api/admin/reports/?page=${page}`, {
    headers: { authorization: `Bearer ${(admin as any).token}` },
  });
  return res.data?.data;
}

function ReportAnalytics() {
  const [page, setPage] = useState(1);
  const pageCount = 10;
  const { admin } = useSystemAdmin();

  const { data: reportCount, isLoading: isReportLoading } = useQuery(
    'total-admin',
    async () => {
      const res = await systemAxios.get('/api/admin/reports/count', {
        headers: {
          authorization: `Bearer ${(admin as any).token}`,
        },
      });
      return res.data?.data;
    }
  );

  const totalPage = Math.ceil(reportCount?.totalUser / pageCount);

  const { data, isLoading } = useQuery(`report-analytics-${page}`, () =>
    fetchRportDetails(page, admin)
  );

  console.log('data', data);
  const nextPageHandler = () => {
    setPage((prevPage) => (prevPage === totalPage ? prevPage : prevPage + 1));
  };

  const prevPageHandler = () => {
    setPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1));
  };

  if (isLoading) return <Spinner isLoading={isLoading} />;
  return (
    <>
      <CustomToastify />
      <div className="flex flex-col gap-6  h-full">
        <div className="flex-grow">
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-responsive-todo gap-6"
          >
            <AnimatePresence>
              {data.length > 0 ? (
                data?.map((report: any, index: number) => (
                  <DeRegisterCard
                    key={report.id}
                    index={index}
                    userName={report?.reportedUser.username}
                    photo={report?.reportedUser.photoUrl}
                    id={report?.reportedUser.id}
                    count={report?.count}
                    page={page}
                  />
                ))
              ) : (
                <h2 className=" col-start-1 col-end-5 text-center mt-12 text-2xl text-gray-500">
                  Not any Report yet.
                </h2>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {data.length > 0 && (
          <div className="flex flex-row items-center justify-center  gap-6">
            <button
              onClick={prevPageHandler}
              className="w-10 h-10 rounded-full disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center bg-custom-light-green cursor-pointer"
              disabled={page === 1}
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </button>
            <span className="text-custom-light-green">{page}</span>
            <button
              onClick={nextPageHandler}
              className="w-10 h-10 bg-custom-light-green disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center rounded-full cursor-pointer"
              disabled={page === totalPage}
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ReportAnalytics;
