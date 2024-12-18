import { fakeAsync, tick } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { MyFormComponent } from './my-form.component';
import userEvent from '@testing-library/user-event';
import { MyFormState } from './my-form.state';

async function setup() {
  return await render(MyFormComponent, {
    providers: [MyFormState],
  });
}

describe('MyFormComponent', () => {
  it('form is shown', async () => {
    await setup();

    const email = screen.getByLabelText('Your email');
    const pass = screen.getByLabelText('Your password');

    expect(email).toBeInTheDocument();
    expect(pass).toBeInTheDocument();
  });

  describe('form valid state', () => {
    it('first, button is disabled.', fakeAsync(async () => {
      const { detectChanges } = await setup();
      detectChanges();
      tick();

      const btn = screen.queryByRole('button');
      expect(btn).toBeDisabled();
    }));

    it('when inputs are fullfilled, button is able to submit', fakeAsync(async () => {
      const { detectChanges } = await setup();
      const btn = screen.queryByRole('button');
      const email = screen.getByLabelText<HTMLInputElement>('Your email');
      const pass = screen.getByLabelText<HTMLInputElement>('Your password');

      await userEvent.type(email, 'foo@bar.exmaple');
      await userEvent.type(pass, 'deadbeefdeadbeef');
      detectChanges();
      tick();

      expect(btn).toBeEnabled();
    }));
  });

  describe('error message', () => {
    it('error is shown, when email is invalid.', fakeAsync(async () => {
      const { detectChanges } = await setup();
      const email = screen.getByLabelText<HTMLInputElement>('Your email');

      await userEvent.type(email, 'foo@');
      detectChanges();
      tick();

      expect(screen.queryByText('email is invalid.')).toBeInTheDocument();
    }));

    it('error is shown, when email is invalid.', fakeAsync(async () => {
      const { detectChanges } = await setup();
      const email = screen.getByLabelText<HTMLInputElement>('Your password');

      await userEvent.type(email, 'deadbeefdeadbee');
      detectChanges();
      tick();

      expect(screen.queryByText('password is invalid.')).toBeInTheDocument();
    }));
  });
});
