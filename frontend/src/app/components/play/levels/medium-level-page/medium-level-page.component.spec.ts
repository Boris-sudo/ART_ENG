import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumLevelPageComponent } from './medium-level-page.component';

describe('MediumLevelPageComponent', () => {
  let component: MediumLevelPageComponent;
  let fixture: ComponentFixture<MediumLevelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumLevelPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumLevelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
