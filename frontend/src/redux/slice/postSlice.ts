import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {},
  reducers: {
    createPost: (state, action) => {},
    updatePost: (state, action) => {},
    deletePost: (state, action) => {},
  },
});

export const { createPost, updatePost, deletePost } = postSlice.actions;
export const postReducer = postSlice.reducer;
