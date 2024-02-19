import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PrimeNgLightModule } from '../primeng.light.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [PrimeNgLightModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) { }

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
          console.log('Signup successful', response);
          // Handle successful signup, e.g., navigate to the login page or home page
        },
        error: (error) => {
          console.error('Signup failed', error);
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