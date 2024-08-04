type UserType = 'Premium' | 'Gold' | 'Standard' | 'Free';
type Category = 'Car' | 'Toy' | 'Food';

type UsersDiscount = {
  [key in UserType]: {
    basic: number;
  } & { [key in Category]?: number };
};

export class AccountService {
  private readonly userType: UserType;
  private readonly category: Category;

  constructor(userType: UserType, category: Category) {
    this.userType = userType;
    this.category = category;
  }

  private readonly usersDiscount: UsersDiscount = {
    Premium: {
      basic: 20,
      Car: 1,
      Toy: 5,
      Food: 10,
    },
    Gold: {
      basic: 10,
      Toy: 3,
      Food: 5,
    },
    Standard: {
      basic: 5,
      Food: 3,
    },
    Free: {
      basic: 0,
    },
  };

  // для каждого типа пользователей устанавливается своя скидка на все товары
  private getBasicDiscount = () => this.usersDiscount[this.userType].basic;

  // для конкретного типа товаров может быть своя скидка у конкретного типа пользователей
  private getCategoryDiscount = () => this.usersDiscount[this.userType][this.category] || 0;

  // скидки суммируются
  get discount() {
    return this.getBasicDiscount() + this.getCategoryDiscount();
  }
}
