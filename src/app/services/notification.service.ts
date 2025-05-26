import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = '/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.api);
  }

  markAsRead(id: string): Observable<any> {
    return this.http.post(`${this.api}/read/${id}`, {});
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
