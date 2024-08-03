import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../model/user-info';
import { UsernameService } from '../../services/username.service';
import { UserNameMap } from '../../model/user-name-map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private userService: UserService,
    private usernameService: UsernameService,
  ){}

  userNameMapList: UserNameMap[] = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.getUserNameByEmail();
  }

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

    const currentUserList = this.userService.userInfoList.filter(e => e.email === email)
    if(currentUserList.length === 0) {
      console.log("New user... creating one")
      this.userService.userInfoObj.email = email
      const userNameEmailMap = this.userNameMapList.filter(e=>e.email === email)
      this.userService.userInfoObj.name = userNameEmailMap[0].name
      this.userService.addUser(this.userService.userInfoObj)
    } else {
      console.log("Existing user.. loging in")
      this.userService.userInfoObj = currentUserList[0]
    }
    console.log(this.userService.userInfoList)
    console.log(this.userService.userInfoObj)
  }

  getUserNameByEmail(){
    this.usernameService.getUserNameToEmailMap().subscribe(res=>{
      this.userNameMapList = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('error while fetching userName map data')
    })
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(res=> {
      this.userService.userInfoList = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('error while fetching user data')
    })
  }
}
