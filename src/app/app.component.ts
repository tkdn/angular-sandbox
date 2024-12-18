import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { provideMyFormState } from './components/my-form/my-form.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideMyFormState()],
})
export class AppComponent {
  title = 'angular-sandbox';
}
