import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin-service/admin-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(data => this.users = data);
  }
}