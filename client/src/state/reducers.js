import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
  friends: []
};

const someSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = (state.mode==='dark')? 'light': 'dark';
    },
    setLogin: (state, action)=>{
      state.user= action.payload.user;
      state.token= action.payload.token;
    },
    setLogout: (state,action)=>{
      state.user=null;
      state.token=null;
    },
    setPosts: (state,action)=>{
      state.posts= action.payload.posts;
    },
    setFriends: (state,action)=>{
      return {
        ...state,
        friends: action.payload.friends, // Make sure to use the payload correctly
      };
    }
  }
  ,
});

export const { setMode,setLogin,setLogout, setFriends,setPosts} = someSlice.actions;
export default someSlice.reducer;