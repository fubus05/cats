import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCatBreeds = createAsyncThunk('cat_breeds/getCatBreeds', async () => {
  const response = await axios.get('https://api.thecatapi.com/v1/breeds')
  return response.data
})

export const catBreedSlice = createSlice({
  name: 'cat_breeds',
  initialState: {
    data: [],
    loading: 'idle',
    error: 'none',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatBreeds.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })

    builder.addCase(getCatBreeds.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.data = action.payload
        state.loading = 'idle'
      }
    })

    builder.addCase(getCatBreeds.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = 'Error occured, our async request failed'
      }
    })
  },
})

export default catBreedSlice.reducer