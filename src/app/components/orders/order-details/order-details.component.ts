import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order-service/order.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
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
      this.orderService.getOrderById(id).subscribe({
        next: order => {
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