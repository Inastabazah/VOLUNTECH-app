import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechProfileComponent } from './tech-profile.component';

describe('TechProfileComponent', () => {
  let component: TechProfileComponent;
  let fixture: ComponentFixture<TechProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
