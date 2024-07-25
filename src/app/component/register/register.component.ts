import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private auth: AuthService){}

  register(f: NgForm) {
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

    this.auth.register(email, password);
    console.log("Registeration Successful")
  }

}
