import {
  BsPlus,
  BsFillLightningFill,
  BsGearFill,
  BsDash,
} from 'react-icons/bs';
import { FaAccusoft, FaFire, FaPoo, FaSun, FaMoon } from 'react-icons/fa';
import SideBarIcon from './SideBarIcon';

const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
                   dark:bg-gray-700 shadow-lg "
    >
      <SideBarIcon icon={<BsDash size="28" />} />
      <Divider />
      <SideBarIcon icon={<BsPlus size="32" />} />
      <SideBarIcon icon={<BsFillLightningFill size="20" />} />
      <SideBarIcon icon={<FaAccusoft size="20" />} />
      <Divider />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
