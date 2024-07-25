import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  // email: string = '';
  // password: string = '';

  constructor(private auth: AuthService){}
  ngOnInit(): void {}

  login(f: NgForm) {
    if(f.value.email==='') {
      alert('Please enter email');
      return;
    }

    if(f.value.password==='') {
      alert('Please enter password');
      return;
    }
    const {email, password} = f.value;
    console.log(email);
    console.log(password);

    this.auth.login(email, password);
    console.log("Login Successful")
  }


}
