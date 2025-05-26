import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(n => this.notifications = n);
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe(() => this.loadNotifications());
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id).subscribe(() => this.loadNotifications());
  }
}
