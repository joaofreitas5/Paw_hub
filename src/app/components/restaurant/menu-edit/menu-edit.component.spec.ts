import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { MenuEditComponent } from './menu-edit.component';

describe('MenuEditComponent', () => {
  let component: MenuEditComponent;
  let fixture: ComponentFixture<MenuEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
