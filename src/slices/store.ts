

import { configureStore } from '@reduxjs/toolkit'
import classReducer from './classReducer'

export const store = configureStore({
  reducer: {
    class: classReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch