
export default class Action {
  static amountTypes = {
    income: "income",
    expense: "expense"
  }
  static types = {
    type: "type",
    desc: "description",
    amount: "amount",
    id: "id"
  }
  constructor(type, description, amount) {
    this.type = type;
    this.description = description;
    this.amount = type == Action.amountTypes.income ? amount : -amount;
    this.id = Math.ceil(Math.random() * 1000);
  }

  get(varName) {
    return this[varName];
  }

  set(varName, newValue) {
    this[varName] = newValue;
  }
}

//const a = new Action(Action.amountTypes.income, "asdasdasdasd", 123)
//a.get(Action.types.desc);
