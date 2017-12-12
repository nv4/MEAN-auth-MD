import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {Router} from "@angular/router";

import { AlertService, UserService } from '../../../_services/index';

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

  username: string;
  email: string;
  password: string;
  passwordConfirm: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  register() {
    // this.router.navigate(['/']);

  }

}
