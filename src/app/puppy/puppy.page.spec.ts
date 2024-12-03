import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuppyPage } from './puppy.page';

describe('PuppyPage', () => {
  let component: PuppyPage;
  let fixture: ComponentFixture<PuppyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuppyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
