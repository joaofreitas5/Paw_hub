import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user-service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  orders: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      this.user = data.user;
      this.orders = data.orders;
    });
  }
}