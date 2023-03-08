import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AdditionalService } from '../service/additional.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'name', 'email', 'username', 'roles', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() findUser: string;

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private addService: AdditionalService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers();
    this.userSubscription$ = this.userService.userSubject$.subscribe(
      (users: User[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if (this.userService.findUser) this.findUser = this.userService.findUser;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(username: string) {
    this.dialog.open(UpdateUserComponent, {data: username});
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe(
      response => {
        this.addService.openSnackBar(`User ${username} was deleted`, 'Close');
        this.router.navigate(['users']);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
  }

}
