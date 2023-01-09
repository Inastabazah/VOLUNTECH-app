import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoProfileComponent } from './ngo-profile.component';

describe('NgoProfileComponent', () => {
  let component: NgoProfileComponent;
  let fixture: ComponentFixture<NgoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
