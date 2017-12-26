import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {Router} from "@angular/router";

import { AlertService, UserService } from '../../../_services/index';
import { AlertComponent } from '../../../_directives/index';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class RegisterComponent implements OnInit {
  model: any = {};
  // loading = false;

  // username: string;
  // email: string;
  // password: string;
  passwordConfirm: string;
  statusText: string;
  statusIcon: string;
  statusColor: string;
  statusHeight = "0px";
  checked = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MdSnackBar,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  openSnackBar() {
    this.snackBar.open("There are currently no terms or conditions.","Dismiss",{
      duration: 4000,
    });
  }

  clearStatus () {
    this.statusHeight = "0px";
    this.statusIcon = "";
    this.statusText = "";
    this.statusColor = "";
  }

  register() {
    // this.router.navigate(['/']);
    // this.loading = true;
    if (this.model.password != this.passwordConfirm) {
      this.statusHeight = "32px";
      this.statusIcon = "warning";
      this.statusText = "Passwords do not match!";
      this.statusColor = "#D50000";
      // this.snackBar.open("Passwords do not match!","Dismiss");
      console.log("password mismatch");
    } else {
      this.userService.create(this.model)
        .subscribe(
          data => {
            // this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            // this.alertService.error(error);
            this.statusHeight = "32px";
            this.statusIcon = "warning";
            this.statusText = error;
            this.statusColor = "#D50000";
            // this.loading = false;
          }
        );
    }
  }
}
