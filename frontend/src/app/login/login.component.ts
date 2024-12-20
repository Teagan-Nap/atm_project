import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  account: Account = { accountNumber: '', pinNumber: '', balance: 0 };
  invalidLogin: boolean = false;

  constructor(private router: Router, private accountService: AccountService) {}

  // Attempt to login with the account number and pin given by the user
  onSubmit() {
    this.accountService.getAccountByAccountNumberAndPin(this.account).subscribe({
      next: (response) => {
        // Redirect to the account page if the given login info is valid
        if (response) this.router.navigateByUrl('/account', { state: { accountNumber: response.accountNumber, pinNumber: response.pinNumber }});
        // Display an error message if the given login info was invalid
        else this.invalidLogin = true;
      },
      error: (error) => alert(error.message)
    });
  }
}
