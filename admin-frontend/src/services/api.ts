import type {
  User,
  Customer,
  Account,
  Card,
  Transaction,
  DisclosureGroup,
  TransactionType,
  TransactionCategory,
  CategoryBalance,
} from '../types';

import {
  mockUsers,
  mockCustomers,
  mockAccounts,
  mockCards,
  mockTransactions,
  mockDisclosureGroups,
  mockTransactionTypes,
  mockTransactionCategories,
  mockCategoryBalances,
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic CRUD operations
class ApiService<T> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  async getAll(): Promise<T[]> {
    await delay(300);
    return [...this.data];
  }

  async getById(id: string, idField: keyof T): Promise<T | undefined> {
    await delay(200);
    return this.data.find(item => item[idField] === id);
  }

  async create(item: T): Promise<T> {
    await delay(400);
    this.data.push(item);
    return item;
  }

  async update(id: string, idField: keyof T, updates: Partial<T>): Promise<T | undefined> {
    await delay(400);
    const index = this.data.findIndex(item => item[idField] === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updates };
      return this.data[index];
    }
    return undefined;
  }

  async delete(id: string, idField: keyof T): Promise<boolean> {
    await delay(400);
    const index = this.data.findIndex(item => item[idField] === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Export service instances for each entity
export const userService = new ApiService<User>(mockUsers);
export const customerService = new ApiService<Customer>(mockCustomers);
export const accountService = new ApiService<Account>(mockAccounts);
export const cardService = new ApiService<Card>(mockCards);
export const transactionService = new ApiService<Transaction>(mockTransactions);
export const disclosureGroupService = new ApiService<DisclosureGroup>(mockDisclosureGroups);
export const transactionTypeService = new ApiService<TransactionType>(mockTransactionTypes);
export const transactionCategoryService = new ApiService<TransactionCategory>(mockTransactionCategories);
export const categoryBalanceService = new ApiService<CategoryBalance>(mockCategoryBalances);

// Additional helper methods
export const api = {
  users: {
    getAll: () => userService.getAll(),
    getById: (id: string) => userService.getById(id, 'user_id'),
    create: (user: User) => userService.create(user),
    update: (id: string, updates: Partial<User>) => userService.update(id, 'user_id', updates),
    delete: (id: string) => userService.delete(id, 'user_id'),
  },
  customers: {
    getAll: () => customerService.getAll(),
    getById: (id: string) => customerService.getById(id, 'customer_id'),
    create: (customer: Customer) => customerService.create(customer),
    update: (id: string, updates: Partial<Customer>) => customerService.update(id, 'customer_id', updates),
    delete: (id: string) => customerService.delete(id, 'customer_id'),
  },
  accounts: {
    getAll: () => accountService.getAll(),
    getById: (id: string) => accountService.getById(id, 'account_id'),
    getByCustomerId: async (customerId: string) => {
      const accounts = await accountService.getAll();
      return accounts.filter(a => a.customer_id === customerId);
    },
    create: (account: Account) => accountService.create(account),
    update: (id: string, updates: Partial<Account>) => accountService.update(id, 'account_id', updates),
    delete: (id: string) => accountService.delete(id, 'account_id'),
  },
  cards: {
    getAll: () => cardService.getAll(),
    getById: (id: string) => cardService.getById(id, 'card_number'),
    getByAccountId: async (accountId: string) => {
      const cards = await cardService.getAll();
      return cards.filter(c => c.account_id === accountId);
    },
    create: (card: Card) => cardService.create(card),
    update: (id: string, updates: Partial<Card>) => cardService.update(id, 'card_number', updates),
    delete: (id: string) => cardService.delete(id, 'card_number'),
  },
  transactions: {
    getAll: () => transactionService.getAll(),
    getById: (id: string) => transactionService.getById(id, 'transaction_id'),
    getByAccountId: async (accountId: string) => {
      const transactions = await transactionService.getAll();
      return transactions.filter(t => t.account_id === accountId);
    },
    create: (transaction: Transaction) => transactionService.create(transaction),
    update: (id: string, updates: Partial<Transaction>) => transactionService.update(id, 'transaction_id', updates),
    delete: (id: string) => transactionService.delete(id, 'transaction_id'),
  },
  disclosureGroups: {
    getAll: () => disclosureGroupService.getAll(),
    getById: (id: string) => disclosureGroupService.getById(id, 'disclosure_group'),
    create: (group: DisclosureGroup) => disclosureGroupService.create(group),
    update: (id: string, updates: Partial<DisclosureGroup>) => disclosureGroupService.update(id, 'disclosure_group', updates),
    delete: (id: string) => disclosureGroupService.delete(id, 'disclosure_group'),
  },
  transactionTypes: {
    getAll: () => transactionTypeService.getAll(),
    getById: (id: string) => transactionTypeService.getById(id, 'type_code'),
    create: (type: TransactionType) => transactionTypeService.create(type),
    update: (id: string, updates: Partial<TransactionType>) => transactionTypeService.update(id, 'type_code', updates),
    delete: (id: string) => transactionTypeService.delete(id, 'type_code'),
  },
  transactionCategories: {
    getAll: () => transactionCategoryService.getAll(),
    getById: (id: string) => transactionCategoryService.getById(id, 'category_code'),
    create: (category: TransactionCategory) => transactionCategoryService.create(category),
    update: (id: string, updates: Partial<TransactionCategory>) => transactionCategoryService.update(id, 'category_code', updates),
    delete: (id: string) => transactionCategoryService.delete(id, 'category_code'),
  },
  categoryBalances: {
    getAll: () => categoryBalanceService.getAll(),
    getByAccountId: async (accountId: string) => {
      const balances = await categoryBalanceService.getAll();
      return balances.filter(b => b.account_id === accountId);
    },
  },
};
