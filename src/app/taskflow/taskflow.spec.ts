import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Taskflow } from './taskflow';

describe('Taskflow', () => {
  let component: Taskflow;
  let fixture: ComponentFixture<Taskflow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskflow],
    }).compileComponents();

    fixture = TestBed.createComponent(Taskflow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
