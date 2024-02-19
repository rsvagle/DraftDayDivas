import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { UserCredentials } from '../auth/auth.models';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeNgLightModule], // Make sure to import FormsModule and ReactiveFormsModule for form handling
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  // Inject AuthService
  private authService = inject(AuthService);

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  // Method to handle form submission
  login() {
      const credentials: UserCredentials = {
        username: this.username,
        password: this.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Handle successful login here (e.g., navigate to dashboard)
          this.router.navigateByUrl('/profile');
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error here (e.g., show error message)
          this.username = '';
          this.password = '';
        }
      });
   }
}
