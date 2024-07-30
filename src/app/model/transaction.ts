import { TransactionComponent } from "./transaction-component";

export interface Transaction {
    id: string,
    loaner: string,
    loanee: string,
    amount: string,
    description: string,
    components: TransactionComponent[],
}
