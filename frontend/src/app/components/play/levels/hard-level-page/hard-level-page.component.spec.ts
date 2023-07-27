import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardLevelPageComponent } from './hard-level-page.component';

describe('HardLevelPageComponent', () => {
  let component: HardLevelPageComponent;
  let fixture: ComponentFixture<HardLevelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardLevelPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardLevelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
