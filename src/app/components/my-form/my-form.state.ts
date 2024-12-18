import { signal } from '@angular/core';

export class MyFormState {
  readonly email = signal('');
  readonly password = signal('');
}
