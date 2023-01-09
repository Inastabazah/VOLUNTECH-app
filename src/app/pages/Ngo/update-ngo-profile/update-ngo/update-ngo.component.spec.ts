import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNgoComponent } from './update-ngo.component';

describe('UpdateNgoComponent', () => {
  let component: UpdateNgoComponent;
  let fixture: ComponentFixture<UpdateNgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNgoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
