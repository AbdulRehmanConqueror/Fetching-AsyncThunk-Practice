import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/usersFetching";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    usersList: [],
    error: null,
  },
  extraReducers(builder) {
    //Fetch users from the server
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Add user to the list
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Delete user from the list
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList = state.usersList.filter(
        (user) => user.id !== action.payload.id
      );
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const usersReducer = usersSlice.reducer;
