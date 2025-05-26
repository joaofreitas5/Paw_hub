import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = '/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  markAsRead(id: string): Observable<any> {
    return this.http.post(`${this.api}/read/${id}`, {});
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
