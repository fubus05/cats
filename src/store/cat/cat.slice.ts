import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ICatState {
  data: any[];
  loading: 'idle' | 'pending' | 'idle';
  error: 'none' | string;
}

// in this func getCat i do two request in one because it help me to optimize procees because we have the same id but different url so in this situation Promise.all help to solve this problem
export const getCat = createAsyncThunk<any[], any>('cat/getCat', async (breed_ids) => {
  const req1 = axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_ids}&limit=10`)
  const req2 = axios.get(`https://api.thecatapi.com/v1/breeds/${breed_ids}`)
  const [response1, response2] = await Promise.all([req1, req2]);
  const combinedData = [response1.data, response2.data];
  return combinedData
})

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    data: [],
    loading: 'idle',
    error: 'none',
  } as ICatState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCat.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })

    builder.addCase(getCat.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.data = action.payload
        state.loading = 'idle'
      }
    })

    builder.addCase(getCat.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = 'Error occurred, our async request failed'
      }
    })
  },
})

export default catSlice.reducer
