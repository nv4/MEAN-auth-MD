import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {fadeInAnimation} from "../../../route.animation";

import {AuthenticationService} from '../../../_services/index';
import {MdSnackBar} from '@angular/material';

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
  loading = false;
  returnUrl: string;

  remembered = false;

  // email: string;
  // password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MdSnackBar
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

  login() {
    // this.router.navigate(['/']);
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.snackBar.open('You have successfully logged in!', 'Close', {
            duration: 7000
          });
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.snackBar.open(error, 'Close', {
            duration: 7000
          });
          this.loading = false;
        }
      );
  }

}
