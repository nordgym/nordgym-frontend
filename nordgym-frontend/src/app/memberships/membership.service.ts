import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Membership} from './membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  baseUrl = 'http://localhost:8080/memberships';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Membership[]> {
    return this.http.get<Membership[]>(this.baseUrl + '/all');
  }

  save(membership: Membership) {
    return this.http.post(this.baseUrl + '/save', membership);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }
}
