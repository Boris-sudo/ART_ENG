import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePlayPageComponent } from './pre-play-page.component';

describe('PrePlayPageComponent', () => {
  let component: PrePlayPageComponent;
  let fixture: ComponentFixture<PrePlayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePlayPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrePlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
