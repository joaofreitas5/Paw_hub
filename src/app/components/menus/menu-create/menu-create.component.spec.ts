import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { MenuCreateComponent } from './menu-create.component';

describe('MenuCreateComponent', () => {
  let component: MenuCreateComponent;
  let fixture: ComponentFixture<MenuCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCreateComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
