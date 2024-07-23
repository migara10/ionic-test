import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupModelPage } from './popup-model.page';

describe('PopupModelPage', () => {
  let component: PopupModelPage;
  let fixture: ComponentFixture<PopupModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
