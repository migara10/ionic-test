import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BioModelPage } from './bio-model.page';

describe('BioModelPage', () => {
  let component: BioModelPage;
  let fixture: ComponentFixture<BioModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BioModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
