# Finstable

**Finstable** is a personal finance management platform built to help users track spending, manage multiple financial accounts, and stay organized with recurring financial obligations.

Many expense trackers stop at basic transaction logging and simple analytics. Finstable goes beyond that by helping users manage different sources of money, monitor recurring expenses, track debt-related payments, and maintain better financial discipline from one centralized platform.

This platform is built for:

- Students managing limited monthly budgets
- Young professionals tracking salary and expenses
- Individuals managing multiple bank accounts or credit cards
- Users handling recurring expenses such as rent, subscriptions, and EMIs
- Anyone who wants better visibility into their financial habits

---

## Features

Users will be able to:

- Create an account and securely log in
- Track income and expenses
- Categorize spending (food, travel, shopping, bills, etc.)

### Manage Multiple Financial Accounts
Users can create and manage:

- Bank accounts
- Savings accounts
- Credit cards
- Recurring payment accounts

---

### Track Spending Behavior

- Track spending from specific accounts
- View spending history between custom date ranges
- Analyze monthly spending patterns

---

### Savings Management

- Set aside money into savings accounts
- Use savings funds for future expenses

---

### Credit Card Management

- Manage credit card spending
- Monitor unpaid balances
- Handle partial payments
- Track unpaid dues carried into future billing cycles

---

### Recurring Payment Management

Track recurring expenses such as:

- EMI payments
- Rent
- Subscriptions

Users can also:

- Receive reminders before payment deadlines
- Manage ongoing recurring obligations

---

### Export Features

- Export transaction history as CSV files

---

## Goal

Finstable aims to help users better understand their financial behavior, manage recurring obligations, track multiple financial accounts, and make smarter financial decisions from one platform.



```mermaid
erDiagram
    USERS {
        bigint id PK
        string name
        string email UK
        string password_hash
        string role
        string auth_provider
        string provider_id
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    CATEGORIES {
        bigint id PK
        bigint user_id FK
        string name
        string type
        boolean is_default
        timestamp created_at
        timestamp updated_at
    }

    ACCOUNTS {
        bigint id PK
        bigint user_id FK
        string account_name
        string account_type
        decimal current_balance
        decimal credit_limit
        decimal interest_rate
        int payment_due_day
        decimal remaining_balance
        date end_date
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    TRANSACTIONS {
        bigint id PK
        bigint user_id FK
        bigint account_id FK
        bigint category_id FK
        decimal amount
        string transaction_type
        string description
        date transaction_date
        timestamp created_at
        timestamp updated_at
    }

    ALERTS {
        bigint id PK
        bigint user_id FK
        bigint account_id FK
        bigint reference_id
        string reference_type
        string alert_type
        string message
        date alert_date
        string status
        timestamp created_at
    }

    USERS ||--o{ CATEGORIES : creates
    USERS ||--o{ ACCOUNTS : owns
    USERS ||--o{ TRANSACTIONS : performs
    USERS ||--o{ ALERTS : receives

    ACCOUNTS ||--o{ TRANSACTIONS : records
    ACCOUNTS ||--o{ ALERTS : triggers

    CATEGORIES ||--o{ TRANSACTIONS : classifies
```