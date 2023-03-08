import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdditionalService } from '../service/additional.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: string;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private addService: AdditionalService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];
    
    this.authService.authenticate(username, password).subscribe(
      response => {
        this.addService.openSnackBar(`User ${sessionStorage.getItem('username')} is logged successful`, 'Close');
        setTimeout(() => {
          this.closeDialog();
        }, 700);
        this.router.navigate(['users']);
      },
      error => {
        this.errorMessage = 'Username or password not found, verify your connection and try again';
      }
    );
  }

  closeDialog() {
    this.addService.closeDialog();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

}
