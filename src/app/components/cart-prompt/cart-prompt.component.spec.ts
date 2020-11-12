import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPromptComponent } from './cart-prompt.component';

describe('CartPromptComponent', () => {
  let component: CartPromptComponent;
  let fixture: ComponentFixture<CartPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
