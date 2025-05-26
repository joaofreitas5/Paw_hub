import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category.model';
@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.css']
})
export class FiltersPanelComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() filtersChanged = new EventEmitter<any>();

  filter = {
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