import {createSlice} from "@reduxjs/toolkit"
import StudentDetail from '../StudentDetail.json';

const initialState={
   allUserList:[...StudentDetail.students]
}
const users = createSlice({
    name: "users",
    initialState,
    reducers: {
      addUserList(state, action) {
        state.allUserList.unshift(action.payload);
      },
      updateUserList(state,action){
  const index = state.allUserList.findIndex((item) => item?.id === action.payload.id);
  if (index > -1) {
    state.allUserList[index] = {
        ...state.allUserList[index],
        id:action.payload.id,
        name:action.payload.name,
        email:action.payload.email,
    father_name:action.payload.father_name,
    mother_name:action.payload.mother_name,
    address:action.payload.address,
    college:action.payload.college,
    degree:action.payload.degree,
    year:action.payload.year,
    batch:Number(action.payload.batch)
    };
}

      },
      deleteUserList(state,action){
        const index = state.allUserList.findIndex((item) => item?.id === action.payload);
         state.allUserList.splice(index,1);
      }
    },
  });
  
export const{addUserList,updateUserList,deleteUserList}=users.actions;
export default users.reducer;