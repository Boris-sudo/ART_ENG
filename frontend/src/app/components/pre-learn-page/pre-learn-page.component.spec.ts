import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLearnPageComponent } from './pre-learn-page.component';

describe('PreLearnPageComponent', () => {
  let component: PreLearnPageComponent;
  let fixture: ComponentFixture<PreLearnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreLearnPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreLearnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
