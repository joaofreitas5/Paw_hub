import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  feedback: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user) => this.user = user,
      error: () => this.feedback = 'Erro ao carregar perfil.'
    });
  }

  applyForRestaurant() {
    if (!this.user) return;
    this.userService.applyForRestaurant(this.user.id).subscribe({
      next: () => {
        this.feedback = 'Pedido enviado! Aguarde aprovação do admin.';
        if (this.user) this.user.pendingRestaurantApproval = true;
      },
      error: () => this.feedback = 'Erro ao enviar pedido.'
    });
  }
}