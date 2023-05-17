import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    isOpen: false,
    selectedOption: 'Balinese',
    selectedID: 'bali'
  },
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectOption: (state, action) => {
      const {label, id} = action.payload;
      state.selectedOption = label;
      state.selectedID = id;
      state.isOpen = false;
    }
  },
});

export const { toggleDropdown, selectOption } = dropdownSlice.actions;

export default dropdownSlice.reducer;
