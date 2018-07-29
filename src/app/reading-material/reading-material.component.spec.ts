import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingMaterialComponent } from './reading-material.component';

describe('ReadingMaterialComponent', () => {
  let component: ReadingMaterialComponent;
  let fixture: ComponentFixture<ReadingMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
