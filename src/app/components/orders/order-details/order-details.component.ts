import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class OrderDetailsComponent implements OnInit {
  order?: Order;
  loading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrder(id).subscribe({
        next: (order: Order) => {
          this.order = order;
          this.loading = false;
        },
        error: () => {
          this.error = 'Não foi possível carregar a encomenda.';
          this.loading = false;
        }
      });
    }
  }
}