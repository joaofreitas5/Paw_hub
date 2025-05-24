import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagmentComponent } from './order-managment.component';

describe('OrderManagmentComponent', () => {
  let component: OrderManagmentComponent;
  let fixture: ComponentFixture<OrderManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
