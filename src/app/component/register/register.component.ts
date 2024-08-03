import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsernameService } from '../../services/username.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private auth: AuthService, private usernameService: UsernameService){}

  register(f: NgForm) {
    if(f.value.email==='') {
      alert('Please enter email');
      return;
    }

    if(f.value.password==='') {
      alert('Please enter password');
      return;
    }

    if(f.value.name==='') {
      alert('Please enter name');
      return;
    }
    const {email, password, name} = f.value;
    console.log(email);
    console.log(password);
    console.log(name);

    this.auth.register(email, password);
    this.usernameService.addUserNameToEmailMap(email, name);
    console.log("Registeration Successful")
  }

}
