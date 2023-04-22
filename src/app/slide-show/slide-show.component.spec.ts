import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideShowComponent } from './slide-show.component';

describe('SlideShowComponent', () => {
  let component: SlideShowComponent;
  let fixture: ComponentFixture<SlideShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('next', () => {
    it('should move to the next image if not at the end of the image array',() => {
      fixture = TestBed.createComponent(SlideShowComponent);
      fixture.componentInstance.next(false, false);
      expect(fixture.componentInstance.currentIndex).toEqual(1);
    });
    it('should move to the first image if at the end of the image array',() => {
      fixture = TestBed.createComponent(SlideShowComponent);
      fixture.componentInstance.currentIndex = fixture.componentInstance.images.length - 1;
      fixture.componentInstance.next(false, false);
      expect(fixture.componentInstance.currentIndex).toEqual(0);
    });
  });

  describe('prev', () => {
    it('should move to the previous image if not at the beginning of the image array',() => {
      fixture = TestBed.createComponent(SlideShowComponent);
      fixture.componentInstance.currentIndex = 1;
      fixture.componentInstance.prev(false);
      expect(fixture.componentInstance.currentIndex).toEqual(0);
    });
    it('should move to the last image if at the beginning of the image array',() => {
      fixture = TestBed.createComponent(SlideShowComponent);
      fixture.componentInstance.prev(false);
      expect(fixture.componentInstance.currentIndex).toEqual(fixture.componentInstance.images.length - 1);
    });
  });
});
