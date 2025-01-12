/*
  # Initial Schema for Sahayika Platform

  1. New Tables
    - `lessons`
      - Voice-guided financial education content
      - Supports multiple languages
    - `transactions`
      - Budget tracking for income and expenses
    - `business_plans`
      - Business planning and analysis data
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Lessons table for voice-guided content
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  language text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all lessons"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (true);

-- Transactions table for budget tracking
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  description text NOT NULL,
  amount decimal NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Business plans table
CREATE TABLE IF NOT EXISTS business_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  business_type text NOT NULL,
  initial_investment decimal NOT NULL,
  monthly_expenses decimal NOT NULL,
  expected_revenue decimal NOT NULL,
  description text,
  roi decimal,
  breakeven_months integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own business plans"
  ON business_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);