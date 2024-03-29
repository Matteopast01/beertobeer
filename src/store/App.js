import { configureStore} from '@reduxjs/toolkit';
import {reviewSlices, pubReviewSlices} from "../slices/ReviewSlices";
import {filterSlice, searchedBeersSlice, searchTermSlice, selectedBeerSlice, sortingSlice} from "../slices/SearchSlices"
import {loadedPubsSlice, pubSlice} from "../slices/PubSlices";
import {userImgSlice} from '../slices/UserSlices'
import {favoritesSlice, likeSlice} from "../slices/ReactionSlices";


// combination of all slices
const rootReducer = {
    filters: filterSlice.reducer,
    sorting: sortingSlice.reducer,
    pub: pubSlice.reducer,
    review: reviewSlices.reducer,
    pub_review: pubReviewSlices.reducer,
    loadedPubs: loadedPubsSlice.reducer,
    searchedBeers: searchedBeersSlice.reducer,
    searchTerm: searchTermSlice.reducer,
    userImg: userImgSlice.reducer,
    selectedBeer: selectedBeerSlice.reducer,
    like: likeSlice.reducer,
    favorite: favoritesSlice.reducer
};

// Store configuration
const store = configureStore({
    reducer: rootReducer,
});

export const { updateFilter } = filterSlice.actions;
export const { setSelection1, setSelection2 } = sortingSlice.actions;
export const {pubSelected, resetPubSelected} = pubSlice.actions;
export const {addPub, resetPubs} = loadedPubsSlice.actions;
export const {updateReviews, setRewToReply, setRewToOption} = reviewSlices.actions;
export const {updatePubReviews, setPubRewToReply, setPubRewToOption} = pubReviewSlices.actions;
export const {setSearchedBeers} = searchedBeersSlice.actions;
export const {setSearchTerm} = searchTermSlice.actions;
export const {imgSelected} = userImgSlice.actions;

export const {setRerenderLike} = likeSlice.actions

export const {setRerenderFavorite} = favoritesSlice.actions

export const {setSelectedBeer} = selectedBeerSlice.actions;
export const selectFilters = (state) => state.filters;

export default store;
