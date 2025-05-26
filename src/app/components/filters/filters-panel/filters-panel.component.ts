import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category.model';

export interface Filters {
  name: string;
  categoryId: string;
  available: string;
}

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.css']
})
export class FiltersPanelComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() filtersChanged = new EventEmitter<Filters>();

  filter: Filters = {
    name: '',
    categoryId: '',
    available: ''
  };

  constructor() {}

  ngOnInit(): void {}

  onFiltersChange() {
    this.filtersChanged.emit({ ...this.filter });
  }

  clearFilters() {
    this.filter = { name: '', categoryId: '', available: '' };
    this.onFiltersChange();
  }
}