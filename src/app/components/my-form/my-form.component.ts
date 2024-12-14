import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  imports: [FormsModule],
  templateUrl: './my-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFormComponent {
  readonly email = signal('');
  readonly password = signal('');

  submit() {
    alert(`email: ${this.email()}, pass: ${this.password()}`);
  }
}
