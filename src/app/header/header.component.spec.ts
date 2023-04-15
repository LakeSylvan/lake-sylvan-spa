import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getHeaderImageForSeason', () => {
    it('should return the spring image url if the date is March 20th', () => {
      const utl = 'assets/images/sylvan-spring-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 2, 20))).toEqual(utl)
    });
    it('should return the spring image url if the date is June 20th', () => {
      const utl = 'assets/images/sylvan-spring-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 5, 20))).toEqual(utl)
    });
    it('should return the summer image url if the date is June 21th', () => {
      const utl = 'assets/images/sylvan-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 6, 21))).toEqual(utl)
    });
    it('should return the summer image url if the date is September 22nd', () => {
      const utl = 'assets/images/sylvan-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 8, 22))).toEqual(utl)
    });
    it('should return the fall image url if the date is September 23nd', () => {
      const utl = 'assets/images/sylvan-fall-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 8, 23))).toEqual(utl)
    });
    it('should return the fall image url if the date is December 21st', () => {
      const utl = 'assets/images/sylvan-winter-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 11, 21))).toEqual(utl)
    });
    it('should return the first winter image url if the date is December 22st', () => {
      const utl = 'assets/images/sylvan-winter-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 11, 21))).toEqual(utl)
    });
    it('should return the first winter image url if the date is March 19th', () => {
      const utl = 'assets/images/sylvan-winter-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 2, 19))).toEqual(utl)
    });
    it('should return the second winter image url if the date is in January', () => {
      const utl = 'assets/images/sylvan-winter2-pano.jpg';
      expect(component.getHeaderImageForSeason(new Date(2023, 0, 19))).toEqual(utl)
    });
  })
});
