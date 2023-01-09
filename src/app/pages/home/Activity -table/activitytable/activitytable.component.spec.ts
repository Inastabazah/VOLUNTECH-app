import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytableComponent } from './activitytable.component';

describe('ActivitytableComponent', () => {
  let component: ActivitytableComponent;
  let fixture: ComponentFixture<ActivitytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitytableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
