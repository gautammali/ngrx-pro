import {
  addPost,
  deletePost,
  loadPostsSuccess,
  updatePost,
} from './posts.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './post.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state: any, action: any) => {
    let post = { ...action.post };

    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state: any, action: any) => {
    const updatedPosts = state.posts.map((post: any) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state: any, {id}) => {
    const updatedPosts = state.posts.filter((post: any) => {
      console.log(post);
      return post?.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(loadPostsSuccess, (state:any,action:any) => {
    return {
      ...state,
      posts:action.posts
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
