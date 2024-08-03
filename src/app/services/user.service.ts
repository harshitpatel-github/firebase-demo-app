import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserInfo } from '../model/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfoList: UserInfo[] = [];

  userInfoObj: UserInfo = {
    id: '',
    email: '',
    name: '',
  }

  constructor(private afs: AngularFirestore) { }

  addUser(userInfo: UserInfo) {
    userInfo.id = this.afs.createId();
    return this.afs.collection('/UserInfo').add(userInfo);
  }

  getAllUsers() {
    return this.afs.collection('/UserInfo').snapshotChanges();
  }
}
