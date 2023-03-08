import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Role } from '../model/role.model';
import { RoleService } from '../service/role.service';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AdditionalService } from '../service/additional.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {

  @Input() confirmPassword: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  name = new FormControl('', [Validators.minLength(3)]);
  username = new FormControl('', [Validators.minLength(3)]);
  roles = new FormControl();

  rolesArray: Role[];
  
  step = 0;

  constructor(private roleService: RoleService,
              private userService: UserService,
              private router: Router,
              private addService: AdditionalService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => this.rolesArray = response
    );
  }

  submitForm() {
    const user: User = {
      email: this.email.value,
      password: this.password.value
    };

    if (this.name.value) user.name = this.name.value;
    if (this.username.value) user.username = this.username.value;
    
    this.userService.saveUser(user).subscribe(
      (user: User) => {
        console.log('Save user without roles successfully');
        if (this.roles.value) {
          this.roleService.addRolesToUser(user.username, this.roles.value).subscribe(
            (response) => {
              console.log('Adding roles successfully');
              this.userService.getUser(this.username.value).subscribe(
                (data: User) => {
                  console.log(data);
                  this.userService.findUser = data.username;
                  this.addService.openSnackBar(`User ${data.username} saved successfully`, 'Close');
                  this.router.navigate(['users']);
                }
              );
            }
          );
        } else {
          this.userService.findUser = user.username;
          this.addService.openSnackBar(`User ${user.username} saved successfully`, 'Close');
          this.router.navigate(['users']);
        }
      }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
