import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PrimeNgLightModule } from '../primeng.light.module';
import { UserCredentials } from '../auth/auth.models';
import { Route, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeNgLightModule, RouterLink], // Make sure to import FormsModule and ReactiveFormsModule for form handling
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  // Inject AuthService
  private authService = inject(AuthService);

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() { }

  // Method to handle form submission
  login() {
      const credentials: UserCredentials = {
        username: this.username,
        password: this.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'Login Successful' });

          // Handle successful login here (e.g., navigate to dashboard)
          this.router.navigateByUrl('/profile');
        },
        error: (error) => {
          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Error', detail: error.error.detail });

          // Handle login error here (e.g., show error message)
          this.password = '';
        }
      });
   }
}
