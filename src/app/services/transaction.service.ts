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

  deleteTransaction(transaction: Transaction) {
    this.afs.doc('/Transaction/'+transaction.id).delete();
  }

  getAllTransaction1() {
    return this.afs.collection('/Transaction',(x) =>
      x
      .where('loaner', '==', 'testUser')
      .where('amount', '>=', '170') 
      ).snapshotChanges();
  }

  getAllPayList(person: string) {
    return this.afs.collection('/Transaction',(x) =>
      x
      .where('loaner', '==', person)
      ).snapshotChanges();
  }

  getAllReceiveList(person: string) {
    return this.afs.collection('/Transaction',(x) =>
      x
      .where('loanee', '==', person)
      ).snapshotChanges();
  }
}
