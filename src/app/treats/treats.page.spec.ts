import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatsPage } from './treats.page';

describe('TreatsPage', () => {
  let component: TreatsPage;
  let fixture: ComponentFixture<TreatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
