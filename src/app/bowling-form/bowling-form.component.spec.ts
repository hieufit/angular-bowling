import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingFormComponent } from './bowling-form.component';

describe('BowlingFormComponent', () => {
  let component: BowlingFormComponent;
  let fixture: ComponentFixture<BowlingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
