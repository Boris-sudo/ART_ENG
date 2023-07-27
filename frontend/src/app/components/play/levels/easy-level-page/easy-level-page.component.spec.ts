import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyLevelPageComponent } from './easy-level-page.component';

describe('EasyLevelPageComponent', () => {
  let component: EasyLevelPageComponent;
  let fixture: ComponentFixture<EasyLevelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyLevelPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyLevelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
