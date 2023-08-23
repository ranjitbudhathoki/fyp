import axios from '../utils/axios-instance';
import { motion } from 'framer-motion';

import handleStopPropagation from '../utils/handleStopPropagation';
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { updateUser } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

interface IUserModal {
  user: any;
}

const UserModal: React.FC<IUserModal> = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get('/auth/logout');
    dispatch(updateUser(null));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={handleStopPropagation}
      className="absolute right-0 top-14 w-52 flex flex-col gap-3 p-2 rounded-md bg-[#27292a] shadow-md border-2 border-[#434343] origin-top-right z-20"
    >
      <div className="flex items-center gap-2 p-2 hover:bg-[#434343] rounded-md">
        <UserIcon className="h-5" />
        <p>{user.username}</p>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 hover:bg-[#434343] cursor-pointer rounded-md"
      >
        <ArrowRightOnRectangleIcon className="h-5" />
        <p>Logout</p>
      </div>
    </motion.div>
  );
};

export default UserModal;
