import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrderManagementComponent } from './restaurant-order-management.component';

describe('RestaurantOrderManagementComponent', () => {
  let component: RestaurantOrderManagementComponent;
  let fixture: ComponentFixture<RestaurantOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantOrderManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
