import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnordedListComponent } from './unorded-list.component';

describe('UnordedListComponent', () => {
  let component: UnordedListComponent;
  let fixture: ComponentFixture<UnordedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnordedListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnordedListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
