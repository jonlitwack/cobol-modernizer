// Type definitions based on CardDemo ERD

export interface User {
  user_id: string;
  password: string;
  user_type: string;
  first_name: string;
  last_name: string;
  last_login?: Date;
  account_status: 'Active' | 'Inactive' | 'Locked';
}

export interface Customer {
  customer_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone_number: string;
  email: string;
  ssn: string;
  date_of_birth: Date;
  credit_rating: string;
  created_date: Date;
  updated_date: Date;
}

export interface Account {
  account_id: string;
  customer_id: string;
  account_number: string;
  account_type: 'Credit' | 'Debit';
  account_status: 'Active' | 'Closed' | 'Suspended';
  current_balance: number;
  credit_limit: number;
  available_credit: number;
  cash_advance_limit: number;
  interest_rate: number;
  disclosure_group: string;
  account_open_date: Date;
  account_close_date?: Date;
  last_statement_date: Date;
  past_due_amount: number;
  days_past_due: number;
}

export interface Card {
  card_number: string;
  account_id: string;
  card_type: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  card_status: 'Active' | 'Blocked' | 'Lost' | 'Stolen';
  cardholder_name: string;
  issue_date: Date;
  expiration_date: Date;
  cvv: string;
  pin: string;
  last_used_date?: Date;
  failed_pin_attempts: number;
}

export interface CardXref {
  xref_card_num: string;
  xref_acct_id: string;
  xref_cust_id: string;
  created_date: Date;
  updated_date: Date;
}

export interface Transaction {
  transaction_id: string;
  account_id: string;
  card_number: string;
  transaction_type: string;
  transaction_category: string;
  transaction_date: Date;
  transaction_amount: number;
  merchant_name: string;
  merchant_city: string;
  merchant_zip: string;
  description: string;
  post_status: 'Posted' | 'Pending' | 'Declined';
  post_date?: Date;
  authorization_code: string;
  decline_reason?: string;
  original_amount?: number;
  currency_code: string;
  exchange_rate: number;
}

export interface DisclosureGroup {
  disclosure_group: string;
  group_name: string;
  description: string;
  terms_conditions: string;
  disclosure_text: string;
}

export interface TransactionType {
  type_code: string;
  type_description: string;
  debit_credit_indicator: 'Debit' | 'Credit';
  category_code: string;
}

export interface TransactionCategory {
  category_code: string;
  category_name: string;
  category_description: string;
  category_group: string;
}

export interface CategoryBalance {
  account_id: string;
  category_code: string;
  balance_date: Date;
  category_balance: number;
  transaction_count: number;
  average_transaction: number;
  max_transaction: number;
  min_transaction: number;
  last_updated: Date;
}
