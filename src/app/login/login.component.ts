import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/module/user';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth:AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      

      var user:User = {
        userName: this.validateForm.value.userName,
        password: this.validateForm.value.password
      };

      var isValid = this.auth.validateUser(user);
      
      if(isValid){
        localStorage.setItem('validuser', 'true');
        this.router.navigate(['/home']);
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
