import { Component, OnInit, Inject, Input } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { RoleService } from '../service/role.service';
import { AdditionalService } from '../service/additional.service';
import { Role } from '../model/role.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  user: User;
  id: number;
  
  @Input() confirmPassword: string;
  email: FormControl;
  password: FormControl;
  name: FormControl;
  username: FormControl;
  roles: FormControl;

  rolesArray: Role[];

  step = 0;

  constructor(private userService: UserService,
              private roleService: RoleService,
              private router: Router,
              private addService: AdditionalService,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.userService.getUser(this.data).subscribe(
      (user: User) => {
        this.user = user;
        this.id = user.id ? user.id : 0;

        this.email = new FormControl(user.email, [Validators.required, Validators.email]);
        this.password = new FormControl(user.password, [Validators.required, Validators.minLength(4)]);
        this.name = new FormControl(user.name, [Validators.minLength(3)]);
        this.username = new FormControl(user.username, [Validators.minLength(3)]);
        this.roles = new FormControl();
      }
    );

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
    if (this.roles.value) user.roles = this.roles.value;
    
    this.userService.updateUser(this.id, user).subscribe(
      (user: User) => {
        this.userService.findUser = user.username;
        this.addService.openSnackBar(`User ${user.username} updated successfully`, 'Close');
        this.addService.closeDialog();
        this.router.navigate(['users']);
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
