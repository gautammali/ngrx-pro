import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { PostsService } from './../../services/posts.service';
import { createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { laodPosts, loadPostsSuccess } from './posts.actions';
import { mergeMap } from 'rxjs';
import { map } from 'rxjs';
import { Post } from './../../models/posts.model';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}
  laodPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(laodPosts),
        mergeMap((action) => {
          return this.postsService.getPost().pipe(
            map((posts) => {
             return loadPostsSuccess({posts})
            })
          );
        })
      );
    }
  );
}
