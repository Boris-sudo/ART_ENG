import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTimeComponent } from './learn-time.component';

describe('LearnTimeComponent', () => {
  let component: LearnTimeComponent;
  let fixture: ComponentFixture<LearnTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
