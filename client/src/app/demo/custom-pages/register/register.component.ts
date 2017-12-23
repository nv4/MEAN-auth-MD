import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {Router} from "@angular/router";

import { AlertService, UserService } from '../../../_services/index';
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
  loading = false;

  // username: string;
  // email: string;
  // password: string;
  passwordConfirm: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MdSnackBar,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  register() {
    // this.router.navigate(['/']);
    this.loading = true;
    if (this.model.password != this.passwordConfirm) {
      // this.snackBar.open('Password mismatch, try again!','Close',{
      //   duration: 7000
      // });
      console.log("password mismatch");
    } else {
      this.userService.create(this.model)
        .subscribe(
          data => {
            // this.snackBar.open('You have successfully registered!', 'Close', {
            //   duration: 7000
            // });
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            // this.snackBar.open(error, 'Close', {
            //   duration: 7000
            // });
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }
  }
}
