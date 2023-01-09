import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationalCardComponent } from './foundational-card.component';

describe('FoundationalCardComponent', () => {
  let component: FoundationalCardComponent;
  let fixture: ComponentFixture<FoundationalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationalCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundationalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
