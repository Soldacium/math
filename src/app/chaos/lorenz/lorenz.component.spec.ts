import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorenzComponent } from './lorenz.component';

describe('LorenzComponent', () => {
  let component: LorenzComponent;
  let fixture: ComponentFixture<LorenzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorenzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LorenzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
