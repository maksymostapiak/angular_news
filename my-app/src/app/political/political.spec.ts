import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Political } from './political';

describe('Political', () => {
  let component: Political;
  let fixture: ComponentFixture<Political>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Political]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Political);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
