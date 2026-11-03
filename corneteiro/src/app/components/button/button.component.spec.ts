import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const action = vi.fn();

  beforeEach(async () => {
    action.mockClear();

    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', { text: 'Clique', class: 'primary', action });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exibe o texto e dispara a ação ao clicar', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent).toContain('Clique');

    button.click();
    expect(action).toHaveBeenCalledTimes(1);
  });
});
