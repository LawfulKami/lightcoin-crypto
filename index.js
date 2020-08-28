
class Transaction {

  constructor(amount, user) {
    this.id = "t" + user.history.length;
    this.account = user.id;
    this.amount = amount;
    this.date = new Date();
    this.user = user;
  }

}

class Withdrawal extends Transaction {

  commit() {
    this.user.balance -= this.amount;
  }

}

class Deposit extends Transaction {

  commit() {
    this.user.balance += this.amount;
  }

}


class Account {

  constructor(initalDeposit) {
    // this.name = name;
    this.id = Math.floor(Math.random() * 65823);
    this.balance = initalDeposit;
    this.history = [];
  }

  deposit(amount) {
    const trans = new Deposit(amount, this);
    trans.commit();
    this.history.push(trans);
  }

  withdrawal(amount) {
    try {
      if (amount > this.balance) {
        throw (new Error("Insufficient funds"));
      }
    } catch (err) {
      console.log(err);
    }
    const trans = new Withdrawal(amount, this);
    trans.commit();
    this.history.push(trans);
  }

  get getHistory() {
    return this.history.map(val => {
      delete val.user;
      return val;
    });
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


const acc1 = new Account(2000);
const acc2 = new Account(500);


console.log(acc1);
console.log(acc2);
console.log(acc1.getHistory);
console.log(acc1.balance);

acc1.deposit(500);
console.log(acc1.balance);
acc1.withdrawal(1000);
console.log(acc1.balance);
console.log(acc1.getHistory);
acc1.withdrawal(1501);


