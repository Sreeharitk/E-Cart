import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        addWishList:(state,action)=>{
            state.push(action.payload)
        },
        removeFromWishList:(state,action)=>{
            return state.filter(items=>items.id!=action.payload)
        }
    }
})

export const {addWishList, removeFromWishList} = wishlistSlice.actions
export default wishlistSlice.reducer