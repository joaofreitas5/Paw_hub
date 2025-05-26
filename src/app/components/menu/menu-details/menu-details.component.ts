import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../../core/services/menu-service/menu.service';
import { Menu } from '../../../models/menu.model';
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  menu?: Menu;
  loading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.menuService.getMenuById(id).subscribe({
        next: (menu) => {
          this.menu = menu;
          this.loading = false;
        },
        error: () => {
          this.error = 'Não foi possível carregar o prato';
          this.loading = false;
        }
      });
    }
  }
}