import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './../models/posts.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/todos').pipe(
      map((data) => {
        const posts: Post[] = [];
        let post=JSON.parse(JSON.stringify(data));
        for (let key of post) {
          posts.push(key);
        }
        return posts;
      })
    );
  }
}
