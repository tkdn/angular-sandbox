import { effect, signal, untracked } from '@angular/core';

export function provideMyFormState(instance?: MyFormState) {
  return [
    {
      provide: MyFormState,
      useFactory: () => instance ?? new MyFormState(),
    },
  ];
}

export class MyFormState {
  private STORAGE_KEY = 'my-form';

  readonly email = signal('');
  readonly password = signal('');

  constructor() {
    effect(() => {
      const email = this.email();
      const data = window.localStorage.getItem(this.STORAGE_KEY);
      untracked(() => {
        if (data && !email) {
          try {
            const parsed: { email: string } = JSON.parse(data);
            this.email.set(parsed.email);
          } catch (_) {}
        }
      });
    });
  }

  writeToStorage() {
    const data = { email: this.email() };
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}
