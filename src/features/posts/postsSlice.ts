import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PostRecord = {
  _id: string;
  title: string;
  content: string;
  image: string; //  add this
  updatedAt: string;
  user?: { email: string };
};

type CreatePostInput = {
  title: string;
  content: string;
  image: string;
  user?: string;
};

type PostsState = {
  items: PostRecord[];
  fetchStatus: "idle" | "loading" | "failed";
  createStatus: "idle" | "loading" | "failed";
  message: string | null;
  error: string | null;
};
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api/posts`;

const initialState: PostsState = {
  items: [],
  fetchStatus: "idle",
  createStatus: "idle",
  message: null,
  error: null,
};

// FETCH POSTS (API)
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.data.posts;
});

// CREATE POST (API)
export const createPost = createAsyncThunk<
  PostRecord,
  CreatePostInput,
  { rejectValue: string }
>("posts/createPost", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data.data.post;
  } catch (error) {
    return rejectWithValue("Unable to create post");
  }
});

//DELETE POST (API)
export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

// UPDATE POST (API)
export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result.data.post;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostMessage(state) {
      state.message = null;
      state.error = null;
      state.createStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPosts.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchStatus = "idle";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchStatus = "failed";
      })

      // CREATE
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // DELETE
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post._id !== action.payload);
      })

      // UPDATE
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearPostMessage } = postsSlice.actions;
export default postsSlice.reducer;
