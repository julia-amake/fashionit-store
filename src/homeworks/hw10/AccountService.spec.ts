import { AccountService } from './AccountService';

describe('AccountService', () => {
  describe('для Premium пользователя', () => {
    it(`должен вернуть 21 для категории Car`, () => {
      const account = new AccountService('Premium', 'Car');
      expect(account.discount).toBe(21);
    });
    it('должен вернуть 25 для категории Toy', () => {
      const account = new AccountService('Premium', 'Toy');
      expect(account.discount).toBe(25);
    });
    it('должен вернуть 30 для категории Food', () => {
      const account = new AccountService('Premium', 'Food');
      expect(account.discount).toBe(30);
    });
  });

  describe('для Gold пользователя', () => {
    it('должен вернуть 10 для категории Car', () => {
      const account = new AccountService('Gold', 'Car');
      expect(account.discount).toBe(10);
    });
    it('должен вернуть 13 для категории Toy', () => {
      const account = new AccountService('Gold', 'Toy');
      expect(account.discount).toBe(13);
    });
    it('должен вернуть 15 для категории Food', () => {
      const account = new AccountService('Gold', 'Food');
      expect(account.discount).toBe(15);
    });
  });

  describe('для Standard пользователя', () => {
    it('должен вернуть 5 для категории Car', () => {
      const account = new AccountService('Standard', 'Car');
      expect(account.discount).toBe(5);
    });
    it('должен вернуть 5 для категории Toy', () => {
      const account = new AccountService('Standard', 'Toy');
      expect(account.discount).toBe(5);
    });
    it('должен вернуть 8 для категории Food', () => {
      const account = new AccountService('Standard', 'Food');
      expect(account.discount).toBe(8);
    });
  });

  describe('для Free пользователя', () => {
    it('должен вернуть 0 для категории Car', () => {
      const account = new AccountService('Free', 'Car');
      expect(account.discount).toBe(0);
    });
    it('должен вернуть 0 для категории Toy', () => {
      const account = new AccountService('Free', 'Toy');
      expect(account.discount).toBe(0);
    });
    it('должен вернуть 0 для категории Food', () => {
      const account = new AccountService('Free', 'Food');
      expect(account.discount).toBe(0);
    });
  });
});
