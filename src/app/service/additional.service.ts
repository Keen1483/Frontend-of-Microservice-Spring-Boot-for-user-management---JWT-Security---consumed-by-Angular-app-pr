import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
