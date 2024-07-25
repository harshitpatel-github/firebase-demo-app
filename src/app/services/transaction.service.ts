import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private afs: AngularFirestore) { }

  addTransaction(transaction: Transaction) {
    transaction.id = this.afs.createId();
    return this.afs.collection('/Transaction').add(transaction);
  }

  getAllTransaction() {
    return this.afs.collection('/Transaction').snapshotChanges();
  }
}
