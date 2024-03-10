import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    signOut: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = false;
    },
    subscription: (state, action) => {
      if(state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex(channelId => channelId === action.payload), 1)
      } else {
        state.currentUser.subscribedUsers.push(action.payload)
      }
    }
  }
});

export const {signInStart, signInSuccess, signInFailure, signOut, subscription} = userSlice.actions
export default userSlice.reducer;