import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <form className=" p-6 rounded-lg mt-32 w-1/2 bg-[#434242] text-white">
        <h2 className="text-lg font-medium mb-4">Create Your Profile</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2 ">Birthday</label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="date"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Gender</label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              <option value="">Select an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Preferred Gender</label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              <option value="">Select an option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600">
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
