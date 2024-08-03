import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../model/transaction';
import { TransactionComponent } from '../../model/transaction-component';
import { SimplifiedTransaction } from '../../model/simplified-transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  transactionList: Transaction[] = []
  transactionComponents: TransactionComponent[]=[];
  payListTransaction: Transaction[] = []
  receiveListTransaction: Transaction[] = []
  payList: SimplifiedTransaction[] = []
  receiveList: SimplifiedTransaction[] = []
  finalPayList: SimplifiedTransaction[] = []
  finalReceiveList: SimplifiedTransaction[] = []

  transaction: Transaction = {
    id: '',
    loaner: '',
    loanee: '',
    amount: '',
    description: '',
    components: [],
  }

  constructor(private auth: AuthService,
    private afs: AngularFirestore,
    private userService: UserService,
    private transactionService: TransactionService
  ){}

  ngOnInit(): void {
    this.getAllTransaction(this.userService.userInfoObj.name)
    this.getAllPayList(this.userService.userInfoObj.name)
    this.getAllReceiveList(this.userService.userInfoObj.name)
    this.combineAndAggregate(this.payList, this.receiveList)
  }

  logout(f: NgForm){
    this.auth.logout();
  }

  generateDummyTransactionComponent(){
    let transactionComponents: { component: string, amount: string }[] = [
      { "component": "coffee", "amount": "40" },
      { "component": "cupcake", "amount": "30" },
      { "component": "pizza", "amount": "100" }
    ];
    return transactionComponents
  }

  addTransaction(g: NgForm){
    if(g.value.loaner==='') {
      alert('Please enter loaner');
      return;
    }
    if(g.value.loanee==='') {
      alert('Please enter loanee');
      return;
    }
    if(g.value.amount==='') {
      alert('Please enter amount');
      return;
    }
    if(g.value.description==='') {
      alert('Please enter description');
      return;
    }

    const {loaner, loanee, amount, description} = g.value;
    this.transaction.loaner = loaner;
    this.transaction.loanee = loanee;
    this.transaction.amount = amount;
    this.transaction.description = description;
    // this.transaction.components = this.generateDummyTransactionComponent()
    this.transactionService.addTransaction(this.transaction);
    this.transaction.loaner = '';
    this.transaction.loanee = '';
    this.transaction.amount = '';
    this.transaction.description = '';
  }

  getAllTransaction(person: string){
    this.transactionService.getAllTransaction().subscribe(res=> {
      this.transactionList = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }).filter(t=> (t.loaner === person || t.loanee === person))
    }, err => {
      alert('error while fetching transaction data')
    })
  }

  getAllPayList(person: string){
    this.transactionService.getAllPayList(person).subscribe(res=> {
      this.payListTransaction = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      this.payList = this.generateSimplifiedPayTransactionList(this.payListTransaction)
      this.combineAndAggregate(this.payList, this.receiveList)
    }, err => {
      alert('error while fetching payList data')
    })
  }

  getAllReceiveList(person: string){
    this.transactionService.getAllReceiveList(person).subscribe(res=> {
      this.receiveListTransaction = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      this.receiveList = this.generateSimplifiedReceiveTransactionList(this.receiveListTransaction)
      this.combineAndAggregate(this.payList, this.receiveList)
    }, err => {
      alert('error while fetching receiveList data')
    })
  }

  deleteTransaction(transaction: Transaction) {
    if (window.confirm('Are you sure you want to delete this transaction of amount' + transaction.amount)) {
      this.transactionService.deleteTransaction(transaction)
    }
  }

  generateSimplifiedPayTransactionList(transList: Transaction[]): SimplifiedTransaction[]{
    const simplifiedTransactionMap: Map<string, number> = new Map();
  
    for (const transaction of transList) {
      const loanee = transaction.loanee;
      const amount = parseFloat(transaction.amount); // Convert string amount to number
  
      if (simplifiedTransactionMap.has(loanee)) {
        simplifiedTransactionMap.set(loanee, simplifiedTransactionMap.get(loanee)! + amount);
      } else {
        simplifiedTransactionMap.set(loanee, amount);
      }
    }
    const simplifiedTransactionList: SimplifiedTransaction[] = [];
    for (const [person, amount] of simplifiedTransactionMap.entries()) {
      simplifiedTransactionList.push({ person, amount: amount.toString() }); // Convert back to string
    }
  
    return simplifiedTransactionList;
  }

  generateSimplifiedReceiveTransactionList(transList: Transaction[]): SimplifiedTransaction[]{
    const simplifiedTransactionMap: Map<string, number> = new Map();
  
    for (const transaction of transList) {
      const loaner = transaction.loaner;
      const amount = parseFloat(transaction.amount); // Convert string amount to number
  
      if (simplifiedTransactionMap.has(loaner)) {
        simplifiedTransactionMap.set(loaner, simplifiedTransactionMap.get(loaner)! + amount);
      } else {
        simplifiedTransactionMap.set(loaner, amount);
      }
    }
    const simplifiedTransactionList: SimplifiedTransaction[] = [];
    for (const [person, amount] of simplifiedTransactionMap.entries()) {
      simplifiedTransactionList.push({ person, amount: amount.toString() }); // Convert back to string
    }
  
    return simplifiedTransactionList;
  }

  combineAndAggregate(payList: SimplifiedTransaction[], receiveList: SimplifiedTransaction[])/*: { payList: SimplifiedTransaction[], receiveList: SimplifiedTransaction[] }*/ {
    const combinedMap: Map<string, number> = new Map();
  
    // Process payList
    for (const transaction of payList) {
      const person = transaction.person;
      const amount = parseFloat(transaction.amount);
  
      if (combinedMap.has(person)) {
        combinedMap.set(person, combinedMap.get(person)! + amount);
      } else {
        combinedMap.set(person, amount);
      }
    }
  
    // Process receiveList (subtract from combinedMap)
    for (const transaction of receiveList) {
      const person = transaction.person;
      const amount = parseFloat(transaction.amount);
  
      if (combinedMap.has(person)) {
        combinedMap.set(person, combinedMap.get(person)! - amount);
      } else {
        combinedMap.set(person, -amount); 
      }
    }
  
    // const finalPayList: SimplifiedTransaction[] = [];
    // const finalReceiveList: SimplifiedTransaction[] = [];
    this.finalPayList = [];
    this.finalReceiveList = [];
  
    for (const [person, amount] of combinedMap.entries()) {
      if (amount > 0) {
        this.finalPayList.push({ person, amount: amount.toString() });
      } else if (amount < 0) {
        this.finalReceiveList.push({ person, amount: (-amount).toString() }); 
      }
    }
  
    // return { payList: finalPayList, receiveList: finalReceiveList };
  }
}
