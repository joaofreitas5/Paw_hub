import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagmentComponent } from './menu-managment.component';

describe('MenuManagmentComponent', () => {
  let component: MenuManagmentComponent;
  let fixture: ComponentFixture<MenuManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
