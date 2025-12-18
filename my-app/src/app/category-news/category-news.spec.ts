import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category_news } from './category-news';

describe('CategoryNews', () => {
  let component: Category_news;
  let fixture: ComponentFixture<Category_news>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Category_news]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Category_news);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
