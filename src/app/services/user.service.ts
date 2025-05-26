import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.api}/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.api}/profile`);
  }

  applyForRestaurant(userId: string): Observable<any> {
    return this.http.post(`${this.api}/${userId}/apply-restaurant`, {});
  }
}
