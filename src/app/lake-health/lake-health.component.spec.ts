import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakeHealthComponent } from './lake-health.component';

describe('LakeHealthComponent', () => {
  let component: LakeHealthComponent;
  let fixture: ComponentFixture<LakeHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LakeHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LakeHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
