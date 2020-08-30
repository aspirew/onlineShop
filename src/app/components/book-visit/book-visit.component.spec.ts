import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVisitComponent } from './book-visit.component';

describe('BookVisitComponent', () => {
  let component: BookVisitComponent;
  let fixture: ComponentFixture<BookVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
