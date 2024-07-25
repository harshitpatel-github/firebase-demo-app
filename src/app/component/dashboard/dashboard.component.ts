import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../model/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  transactionList: Transaction[] = []

  transaction: Transaction = {
    id: '',
    loaner: '',
    loanee: '',
    amount: '',
    description: ''
  }

  constructor(private auth: AuthService,
    private afs: AngularFirestore,
    private userService: UserService,
    private transactionService: TransactionService
  ){}

  ngOnInit(): void {
    this.getAllTransaction()
  }

  logout(f: NgForm){
    this.auth.logout();
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
    console.log(loaner)
    console.log(loanee)
    console.log(amount)
    console.log(description)
    this.transaction.loaner = loaner;
    this.transaction.loanee = loanee;
    this.transaction.amount = amount;
    this.transaction.description = description;
    this.transactionService.addTransaction(this.transaction);
    this.transaction.loaner = '';
    this.transaction.loanee = '';
    this.transaction.amount = '';
    this.transaction.description = '';
  }

  getAllTransaction(){
    this.transactionService.getAllTransaction().subscribe(res=> {
      this.transactionList = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('error while fetching transaction data')
    })
  }
}
