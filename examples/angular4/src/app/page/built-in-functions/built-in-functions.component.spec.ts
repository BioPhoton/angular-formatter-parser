import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltInFunctionsComponent } from './built-in-functions.component';

describe('BuiltInFunctionsComponent', () => {
  let component: BuiltInFunctionsComponent;
  let fixture: ComponentFixture<BuiltInFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuiltInFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltInFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
