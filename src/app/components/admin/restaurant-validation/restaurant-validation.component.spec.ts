import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantValidationComponent } from './restaurant-validation.component';

describe('RestaurantValidationComponent', () => {
  let component: RestaurantValidationComponent;
  let fixture: ComponentFixture<RestaurantValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
