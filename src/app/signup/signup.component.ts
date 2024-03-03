import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PrimeNgLightModule } from '../primeng.light.module';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [PrimeNgLightModule, RouterLink],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private http: HttpClient, private messageService: MessageService) { }

  // Function to verify if the passwords match
  private passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  // The signup function
  signup() {
    if (this.passwordsMatch()) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password // Assuming the backend handles password hashing
      };

      this.http.post('http://localhost:8000/api/signup/', user).subscribe({
        next: (response) => {
          this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'Signup Successful' });
          // Handle successful signup, e.g., navigate to the login page or home page
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          
          let errorMessage = '';

          if(error.error.username){
            errorMessage = error.error.username[0];
          }

          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Error', detail: 'Signup Unsuccessful' + errorMessage });
          console.log(error);
          // Handle signup error, e.g., show error message to the user
        }
      });
    } else {
      // Handle the case where passwords do not match
      // You can show an alert or set an error message in your component's state
      console.error('Passwords do not match');
    }
  }
}