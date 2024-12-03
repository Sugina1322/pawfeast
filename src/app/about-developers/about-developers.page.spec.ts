import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutDevelopersPage } from './about-developers.page';

describe('AboutDevelopersPage', () => {
  let component: AboutDevelopersPage;
  let fixture: ComponentFixture<AboutDevelopersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDevelopersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
