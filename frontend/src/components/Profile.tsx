import React, { useReducer } from "react";
import axios from "../utils/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ProfileForm = {
  birthday: string;
  gender: string;
  preferredGender: string;
};

const initialState: ProfileForm = {
  birthday: "",
  gender: "",
  preferredGender: "",
};

type Action =
  | { type: "UPDATE_BIRTHDAY"; payload: string }
  | { type: "UPDATE_GENDER"; payload: string }
  | { type: "UPDATE_PREFERRED_GENDER"; payload: string };

const profileFormReducer = (state: ProfileForm, action: Action) => {
  switch (action.type) {
    case "UPDATE_BIRTHDAY":
      return { ...state, birthday: action.payload };
    case "UPDATE_GENDER":
      return { ...state, gender: action.payload };
    case "UPDATE_PREFERRED_GENDER":
      return { ...state, preferredGender: action.payload };
    default:
      return state;
  }
};

const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, dispatch] = useReducer(profileFormReducer, initialState);

  const updateUserMutation = useMutation({
    mutationFn: async (formData: any) => {
      await axios.post("/api/user/update-profile", {
        birthDate: formData.birthday,
        gender: formData.gender,
        preferredGender: formData.preferredGender,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user-data"]);
    },
  });

  const submitHandler = (event: any) => {
    event.preventDefault();
    updateUserMutation.mutate(formData);
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className=" p-6 rounded-lg mt-32 w-1/2 bg-[#434242] text-white"
      >
        <h2 className="text-lg font-medium mb-4">Create Your Profile</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2 ">Birthday</label>
          <input
            onChange={(e) =>
              dispatch({ type: "UPDATE_BIRTHDAY", payload: e.target.value })
            }
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="date"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Gender</label>
          <div className="relative">
            <select
              onChange={(e) =>
                dispatch({ type: "UPDATE_GENDER", payload: e.target.value })
              }
              className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
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
            <select
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PREFERRED_GENDER",
                  payload: e.target.value,
                })
              }
              className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
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