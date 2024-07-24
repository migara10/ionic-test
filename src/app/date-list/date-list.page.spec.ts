import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateListPage } from './date-list.page';

describe('DateListPage', () => {
  let component: DateListPage;
  let fixture: ComponentFixture<DateListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
