import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PrimeNgLightModule } from '../primeng.light.module';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { baseDevUrl } from '../globals';

@Component({
  selector: 'signup',
  standalone: true,
  imports: [PrimeNgLightModule, RouterLink, ToastModule],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  // The signup function
  signup() {
    if (this.passwordsMatch()) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password // Assuming the backend handles password hashing
      };
      
      this.http.post(baseDevUrl + 'signup/', user).subscribe({
        next: (response) => {
          // Handle successful signup, e.g., navigate to the login page or home page
          this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'Signup Successful' });
          this.router.navigateByUrl('/login');
        },
        error: (error) => {          
          let errorMessage = '';
          
          if(error.error.username){
            errorMessage = error.error.username[0];
          }
          
          // Handle signup error, e.g., show error message to the user
          this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail: 'Signup Unsuccessful' + errorMessage });
          console.log(error);
        }
      });
    } else {
      // Handle the case where passwords do not match
      this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail: 'Passwords do not match!' });
      console.error('Passwords do not match');
    }
  }
  
  // Function to verify if the passwords match
  private passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}