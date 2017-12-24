import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';
import {MdSnackBar} from '@angular/material';

@Component({
    // moduleId: module.id,
    selector: 'alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(
      private alertService: AlertService,
      private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

}
