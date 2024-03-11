import { Component, inject, OnInit } from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SignInFacade } from "../../application/facade/sign-in.facade";
import { NzFormControlComponent, NzFormItemComponent } from "ng-zorro-antd/form";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzInputDirective,
    NzIconDirective,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NgIf
  ],
  templateUrl: './sign-in.view.html',
  styleUrl: './sign-in.view.scss'
})
export class SignInView implements OnInit {

  loginFormGroup!: FormGroup<{ email: FormControl<string>, password: FormControl<string> }>;

  private signIn = inject(SignInFacade)

  ngOnInit() {
    this.setLoginFormGroup();
  }

  private setLoginFormGroup() {
    this.loginFormGroup = new FormGroup<{ email: FormControl<string>, password: FormControl<string> }>({
      email: new FormControl<string>(
        '',
        {
          nonNullable: true,
          validators: [
            Validators.email,
            Validators.required
          ]
        }
      ),
      password: new FormControl<string>(
        '',
        {
          nonNullable: true,
          validators: [
            Validators.required
          ]
        }
      )
    })
  }

  signInWithPassword() {
    this.signIn
      .signInWithPassword(
        this.loginFormGroup.value.email!,
        this.loginFormGroup.value.password!
      )
      .subscribe(value => {
        console.log(value)
      });
  }
}
