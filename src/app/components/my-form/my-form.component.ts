import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyFormState } from './my-form.state';

@Component({
  selector: 'app-my-form',
  imports: [FormsModule],
  templateUrl: './my-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFormComponent {
  readonly state = inject(MyFormState);

  submit() {
    this.state.writeToStorage();
    alert(`email: ${this.state.email()}, pass: ${this.state.password()}`);
  }
}
