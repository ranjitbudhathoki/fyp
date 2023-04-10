import React, { useReducer } from 'react';
import axios from '../../utils/axios-instance';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type ProfileForm = {
  birthday: string;
  gender: string;
  preferredGender: string;
};

const initialState: ProfileForm = {
  birthday: '',
  gender: '',
  preferredGender: '',
};

type Action =
  | { type: 'UPDATE_BIRTHDAY'; payload: string }
  | { type: 'UPDATE_GENDER'; payload: string }
  | { type: 'UPDATE_PREFERRED_GENDER'; payload: string };

const profileFormReducer = (state: ProfileForm, action: Action) => {
  switch (action.type) {
    case 'UPDATE_BIRTHDAY':
      return { ...state, birthday: action.payload };
    case 'UPDATE_GENDER':
      return { ...state, gender: action.payload };
    case 'UPDATE_PREFERRED_GENDER':
      return { ...state, preferredGender: action.payload };
    default:
      return state;
  }
};

const ProfileForm: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();
  const [formData, dispatch] = useReducer(profileFormReducer, initialState);

  const updateUserMutation = useMutation({
    mutationFn: async (formData: any) => {
      console.log('inside muttaion', formData);

      await axios.patch(`/api/users/${user.id}/create`, {
        birthDate: formData.birthday,
        gender: formData.gender,
        preferredGender: formData.preferredGender,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-data']);
      toast.success('Profile Created Successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });

  const submitHandler = (event: any) => {
    console.log('from submit');
    event.preventDefault();
    console.log(formData);
    updateUserMutation.mutate(formData);
  };

  // return (
  //   <div className="flex  items-center  flex-col col-2">
  //     <h2 className="text-lg  mt-5 mb-50 text-center font-bold  font-poppins">
  //       Create Your Profile
  //     </h2>
  //     <form
  //       onSubmit={submitHandler}
  //       className=" p-6 rounded-lg mt-3 w-1/2 bg-[#434242] text-white"
  //     >
  //       <div className="mb-4">
  //         <label className="block font-medium mb-2 ">Birthday</label>
  //         <input
  //           onChange={(e) =>
  //             dispatch({ type: 'UPDATE_BIRTHDAY', payload: e.target.value })
  //           }
  //           className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
  //           type="date"
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label className="block font-medium mb-2">Gender</label>
  //         <div className="relative">
  //           <select
  //             onChange={(e) =>
  //               dispatch({ type: 'UPDATE_GENDER', payload: e.target.value })
  //             }
  //             className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
  //           >
  //             <option value="">Select an option</option>
  //             <option value="Male">Male</option>
  //             <option value="Female">Female</option>
  //             <option value="Other">Other</option>
  //           </select>
  //           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
  //             <svg
  //               className="fill-current h-4 w-4"
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 20 20"
  //             >
  //               <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
  //             </svg>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="mb-4">
  //         <label className="block font-medium mb-2">Preferred Gender</label>
  //         <div className="relative">
  //           <select
  //             onChange={(e) =>
  //               dispatch({
  //                 type: 'UPDATE_PREFERRED_GENDER',
  //                 payload: e.target.value,
  //               })
  //             }
  //             className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
  //           >
  //             <option value="">Select an option</option>
  //             <option value="Male">Male</option>
  //             <option value="Female">Female</option>
  //             <option value="Other">Other</option>
  //           </select>
  //           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
  //             <svg
  //               className="fill-current h-4 w-4"
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 20 20"
  //             >
  //               <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
  //             </svg>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="text-center mt-6">
  //         <button
  //           type="submit"
  //           className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
  //         >
  //           Create Profile
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-3xl font-bold text-center font-poppins mb-8 text-white mt-5">
        Create Your Profile
      </h2>
      <form
        onSubmit={submitHandler}
        className="p-8  rounded-lg bg-gray-100 shadow-lg w-1/2 h-[400px]"
      >
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Birthday
          </label>
          <input
            onChange={(e) =>
              dispatch({ type: 'UPDATE_BIRTHDAY', payload: e.target.value })
            }
            className="block w-full py-3 px-4 border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="date"
          />
        </div>
        {/* <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Gender
          </label>
          <div className="relative">
            <select
              onChange={(e) =>
                dispatch({ type: 'UPDATE_GENDER', payload: e.target.value })
              }
              className="block w-full py-3 px-4 border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
        </div> */}
        {/* <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Preferred Gender
          </label>
          <div className="relative">
            <select
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_PREFERRED_GENDER',
                  payload: e.target.value,
                })
              }
              className="block w-full py-3 px-4 border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
        </div> */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Gender</label>
          <div className="relative">
            <select
              onChange={(e) =>
                dispatch({ type: 'UPDATE_GENDER', payload: e.target.value })
              }
              className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
            <select
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_PREFERRED_GENDER',
                  payload: e.target.value,
                })
              }
              className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 text-white font-bold tracking-wide"
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
