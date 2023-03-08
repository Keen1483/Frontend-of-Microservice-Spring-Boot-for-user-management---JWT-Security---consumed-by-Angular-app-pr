import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RoleService } from '../service/role.service';
import { Role } from '../model/role.model';
import { AdditionalService } from '../service/additional.service';

@Component({
  selector: 'app-save-role',
  templateUrl: './save-role.component.html',
  styleUrls: ['./save-role.component.scss']
})
export class SaveRoleComponent implements OnInit {

  roleName = new FormControl('', [Validators.required, Validators.pattern(/^((?!ROLE)(?!ROLE_)[A-Z0-9_])+$/)]);

  constructor(private roleService: RoleService,
              private addService: AdditionalService) { }

  ngOnInit(): void {
  }

  submitForm() {
    const role: Role = {
      name: this.roleName.value
    };
    console.log(role);
    this.roleService.saveRole(role).subscribe(
      (response: Role) => {
        console.log(response);
        this.addService.openSnackBar(`Role ${response.name} saved successfully`, 'Close');
      }
    );
  }

}
