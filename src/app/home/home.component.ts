import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  openLoginDialog() {
    let dialogref = this.dialog.open(LoginComponent);
  }

}
