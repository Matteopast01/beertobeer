import { createSlice } from '@reduxjs/toolkit';

export const reviewSlices = createSlice(
    {
        name: "review",
        initialState: {
            reviews : [],
            rewToReply: null,
            rewToOption: null,
        },
        reducers: {
            updateReviews: (state, action) =>{
                state.reviews =  action.payload
            },
            setRewToReply: (state, action)=>{
                state.rewToReply = action.payload
            },
            setRewToOption: (state, action) =>{
                state.rewToOption = action.payload
            }
        }
    }
)




export const pubReviewSlices = createSlice(
    {
        name: "pub_review",
        initialState: {
            reviews : [],
            rewToReply: null,
            rewToOption: null,
        },
        reducers: {
            updatePubReviews: (state, action) =>{
                state.reviews =  action.payload
            },
            setPubRewToReply: (state, action)=>{
                state.rewToReply = action.payload
            },
            setPubRewToOption: (state, action) =>{
                state.rewToOption = action.payload
            }
        }
    }
)