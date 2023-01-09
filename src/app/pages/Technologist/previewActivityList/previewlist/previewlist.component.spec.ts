import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewlistComponent } from './previewlist.component';

describe('PreviewlistComponent', () => {
  let component: PreviewlistComponent;
  let fixture: ComponentFixture<PreviewlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
