import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert-service';
import { CustomValidators, FormSubmittedMatcher } from '../shared/services/custom-validators';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  formSubmitted: boolean;


  constructor(private router: Router,
    private fb: FormBuilder,
    public alert: AlertService,
    private authService: AuthService,
    public formSubmittedMatcher: FormSubmittedMatcher,
  ) {
    this.formSubmitted = false;

  }

  ngOnInit() {
    // login form validations
    this.loginFormGroup = this.fb.group({
      jname: ['', Validators.required],
      jpassword: ['', Validators.required]
    });
  }


  // login form submit
  login() {
    if (this.loginFormGroup.valid && !this.formSubmitted) {
      this.formSubmitted = true;

      this.authService.login({
        userName: this.loginFormGroup.get('jname').value,
        password: this.loginFormGroup.get('jpassword').value
      }).then((response: any) => {
            this.router.navigateByUrl('/taskboard');
        }, (error) => {
          this.alert.error(error);
          this.formSubmitted = false;
        });
      }
    }
  }
