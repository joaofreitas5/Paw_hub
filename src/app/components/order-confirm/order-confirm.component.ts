import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
})
export class OrderConfirmComponent implements OnInit {
  items: any[] = [];
  restaurantId: string = '';
  total: number = 0;
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
      const storedItems = localStorage.getItem('orderItems');
      const storedRestaurantId = localStorage.getItem('restaurantId');

      if (storedItems && storedRestaurantId) {
          this.items = JSON.parse(storedItems);
          this.restaurantId = storedRestaurantId;
          this.calculateTotal();
      }else {
        alert("No items found in the order.");
        this.router.navigate(['/']);
      }
}

calculateTotal() {
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

confirmOrder() {
  const order = {
    restaurantId: this.restaurantId,
    items: this.items,
    total: this.total,
  };

  this.http.post('http://localhost:3000/orders', order).subscribe({
    next: () => {
      alert('Order confirmed successfully!');
      localStorage.removeItem('orderItems');
      localStorage.removeItem('restaurantId');
      this.router.navigate(['/']);
    },
    error: () => alert('Error confirming order.')
  });
}

}