import { Post } from './../../models/posts.model';

export interface PostsState {
  posts: [];
}

export const initialState: PostsState = {
  posts: [],
};
