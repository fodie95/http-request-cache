import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusManagementComponent } from './status-management.component';

describe('StatusManamentComponent', () => {
  let component: StatusManagementComponent;
  let fixture: ComponentFixture<StatusManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
