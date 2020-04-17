import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/all');
  }

  register(user: User) {
    return this.http.post(this.baseUrl + '/save', user);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }
}
