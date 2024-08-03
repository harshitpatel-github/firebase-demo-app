import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserNameMap } from '../model/user-name-map';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  userNameMap: UserNameMap = {
    email: '',
    name: '',
  }

  constructor(private afs: AngularFirestore) { }

  addUserNameToEmailMap(email: string, name: string) {
    this.userNameMap.email = email;
    this.userNameMap.name = name;
    return this.afs.collection('/UserNameMap').add(this.userNameMap);
  }

  getUserNameToEmailMap() {
    return this.afs.collection('/UserNameMap').snapshotChanges();
  }
}
