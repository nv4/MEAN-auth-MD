import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {fadeInAnimation} from "../../../route.animation";

import {AlertService, AuthenticationService} from '../../../_services/index';
// import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {
  model: any = {};
  // loading = false;
  returnUrl: string;
  // failure = false;
  // success = false;
  // remembered = false;
  statusText: string;
  statusIcon: string;
  statusColor: string;
  statusHeight = "0px";

  // email: string;
  // password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    // public snackBar: MdSnackBar,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    /*
    // reset login status if "remember me" checked
    if(!this.remembered) {
      this.authenticationService.logout();
    }
    */

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  clearStatus () {
    this.statusHeight = "0px";
    this.statusIcon = "";
    this.statusText = "";
    this.statusColor = "";
  }

  login() {
    // this.router.navigate(['/']);
    // this.loading = true;
    this.statusIcon = "";
    this.statusText = "";
    // this.failure = false;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.statusHeight = "20px";
          this.statusIcon = "check";
          this.statusText = "Login successful! Redirecting..."
          this.statusColor = "#4CAF50";
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.failure = true;
          this.statusHeight = "20px";
          this.statusIcon = "warning";
          this.statusText = error;
          this.statusColor = "#D50000";
          // this.loading = false;
        }
      );
  }

}
