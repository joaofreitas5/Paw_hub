import { Component } from '@angular/core';
import { UserService } from '../../core/services/user-service/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: User | null = null;
  feedback: string = '';

  constructor(private userService: UserService) {
    this.user = this.userService.getCurrentUser();
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