import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'my-form',
    async loadComponent() {
      return (await import('./components/my-form/my-form.component'))
        .MyFormComponent;
    },
  },
];
