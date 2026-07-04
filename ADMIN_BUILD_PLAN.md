# Arvexus Admin Dashboard — Analysis & Build Requirements

---

## OVERVIEW

The Arvexus user dashboard is a task-earning platform. Users complete tasks, earn money,
refer others, spin a reward wheel, and manage their wallet. The admin panel needs to be
the CONTROL ROOM that manages everything users experience. Below is a complete breakdown
of every section the admin needs to mirror, control, or oversee.

---

## 1. ADMIN OVERVIEW / DASHBOARD (Home Page)

The user sees personal stats. The admin needs platform-wide stats.
This is the most important page to build first.

Cards needed (equivalent to user's DashboardStats):
  - Total Registered Users
  - Total Active Users (users who completed at least 1 task this month)
  - Total Tasks Created on the platform
  - Total Tasks Completed by all users
  - Total Withdrawals Processed (in Naira value)
  - Total Deposits Received (in Naira value)
  - Total Referrals across the platform
  - Platform Revenue or Commission collected

Additional sections:
  - Recent Registrations (last 5-10 users who just joined)
  - Recent Withdrawal Requests (last 5 pending requests needing action)
  - A quick activity graph or chart (user signups per week, tasks completed per day)
  - System alerts or flagged submissions needing review

---

## 2. USER MANAGEMENT

This is the biggest admin feature. Every user on the platform needs to be visible to admin.

What to build:
  - A full searchable and filterable table of all registered users
  - Each row shows:
      Username, Email, Date Joined, Membership Status (Free/Pro),
      Account Status (Active/Suspended/Banned), Wallet Balance,
      Total Tasks Completed, Total Referrals
  - Clicking a user opens a User Detail page or modal showing:
      - Full profile info
      - Wallet history (deposits + withdrawals)
      - Task history (completed, pending, rejected)
      - Referral list
      - Current tier and points

Admin actions per user:
  - Suspend / Activate account
  - Manually credit wallet balance
  - Manually debit wallet balance
  - Reset password (or send reset email)
  - Upgrade / Downgrade membership tier (Free to Pro)
  - Delete account

---

## 3. TASK MANAGEMENT

Users see a Task Center where they browse, accept, and submit tasks.
The admin needs to CREATE and MANAGE these tasks.

What to build:
  - Full task list table (all tasks on the platform) with columns:
      Title, Category, Advertiser, Reward Amount, Status (Active/Paused/Closed),
      Number of Submissions, Date Created
  - Create New Task button that opens a form modal with fields:
      - Task Title
      - Description
      - Category (dropdown: App Testing, Social Media, Surveys, Reviews,
                  Video Review, Website Visit, etc.)
      - Reward amount in Naira
      - Time estimate
      - Requirements (multi-line text)
      - Advertiser name
      - Task status (Active/Paused)
  - Edit existing tasks
  - Delete tasks
  - Pause or activate a task (toggle)

Submissions Review Panel (separate tab or section):
  - Admin reviews user-submitted proof for tasks
  - Each submission shows: Username, Task Name, Date Submitted, Proof (screenshot or text)
  - Admin actions: Approve (credits user wallet) or Reject (with optional reason)
  - Filter submissions by: Pending, Approved, Rejected

  NOTE: This is critical because on the user side, when they submit proof it goes to
  "Pending Review". The admin must be the one approving or rejecting that.

---

## 4. WALLET / FINANCIAL MANAGEMENT

Users have a wallet with deposits, withdrawals, balance cards, and transaction history.
The admin controls the financial backend.

Deposits Panel:
  - List of all deposit requests/confirmations from all users
  - Columns: User, Amount, Date, Method (Bank Transfer), Status (Pending/Confirmed)
  - Admin action: Mark deposit as Confirmed (this credits the user's wallet)
  - IMPORTANT: When users make a bank transfer and click Confirm Payment, the admin should
    see it listed and manually verify it before the balance is actually credited.
    Currently the app credits balance instantly (mock), but in a real system admin confirms first.

Withdrawals Panel:
  - List of all withdrawal requests from all users
  - Columns: User, Amount, Bank Account Details, Date, Status (Pending/Processing/Processed/Failed)
  - Admin actions: Mark as Processed, Mark as Failed, add a rejection note
  - Filter by: Pending, Processed, Failed

Overall Financial Summary cards:
  - Total platform balance
  - Total paid out this month
  - Total pending withdrawals value
  - Total deposits received this month

---

## 5. REFERRAL MANAGEMENT

Users see their own referrals. The admin needs to see the entire referral network
and manage commission settings.

What to build:
  - Full referral table: Who referred whom, date, commission earned, status
  - Search and filter by user
  - Configure referral commission percentage (currently hardcoded as 5% in user view)
  - See top referrers (global leaderboard view)
  - Option to manually add or remove referral credits for a specific user

---

## 6. REWARDS / SPIN WHEEL MANAGEMENT

Currently the spin wheel has hardcoded sectors with fixed prizes.
The admin should be able to control this entirely.

Spin Wheel Configuration Panel:
  - A list of all sectors currently on the wheel (label, color, prize type, value)
  - Add new sector button
  - Edit existing sectors (change label, value, win/lose status, color)
  - Delete sectors
  - Adjust spin cost (currently 500 Naira per spin)
  - Adjust number of free spins per user per day or per session

Spin History Table:
  - Log of all user spins: User, Date, Result (won or lost), Prize Won
  - Filter by winners only, date range, specific user

Congratulations Modal Control:
  - Toggle the popup modal on or off (show or hide it for users on dashboard load)
  - Edit the modal content directly from admin: title text, bonus amount shown (currently
    shows 204,000 Naira), body message
  - This is the DIRECT LINK you mentioned — change it in admin and it reflects on user side
    without touching code

---

## 7. NOTIFICATIONS / ANNOUNCEMENTS

Users receive notifications for tasks, account updates, and system messages.
The admin should be able to send these.

What to build:
  - Broadcast Notification Panel:
      - Compose a notification with: Title, Message, Category (Task/Account/System)
      - Send to: All Users, a Specific User (by search), or users by status
        (e.g., all Pro members, all inactive users)
      - Notification history log (what was sent, to whom, when)
  - Individual User Notification:
      - From User Management page, send a direct notification to one specific user

---

## 8. SUPPORT / TICKETS

Users submit messages via the Contact Form on their Support page.
The admin needs to receive and respond to these messages.

What to build:
  - Support Ticket Inbox:
      - Table of all submitted support messages:
        Sender, Subject/Category, Date, Status (Open/In Progress/Closed)
      - Click a ticket to open a thread view
      - Admin reply field and send button
      - Mark ticket as Resolved/Closed
  - Filter by: Open, In Progress, Resolved
  - Optional: Assign tickets to a specific admin team member

---

## 9. SETTINGS / ADMIN PROFILE

The admin should also have their own account management settings.

What to build:
  - Admin Profile Page: Change name, email, profile picture
  - Change Password
  - Platform Settings (global configurations):
      - Referral commission rate (%)
      - Spin wheel cost per spin (Naira)
      - Minimum withdrawal amount
      - Minimum deposit amount
      - Platform maintenance mode toggle (disables login for all users)
  - Admin Activity Log:
      - Record of all admin actions taken (who approved what, when)
      - Useful for accountability and auditing

---

## 10. ADMIN NAVIGATION / SIDEBAR

The user sidebar has:
  Dashboard, Task Center, My Tasks, Wallet, Rewards Store, Referrals, Settings, Support

The admin sidebar should have:
  - Dashboard (Overview)
  - Users
  - Tasks (Create & Manage) + Submissions Review (as a sub-tab)
  - Financials (Deposits + Withdrawals as tabs)
  - Referrals
  - Rewards / Spin Wheel Config
  - Notifications / Announcements
  - Support Tickets
  - Settings

---

## KEY DECISIONS YOU NEED TO MAKE BEFORE BUILDING

Answer these questions before we start coding the admin panel:

  1. DEPOSIT CONFIRMATION FLOW
     Currently, users click "Confirm Payment" after doing a bank transfer and their balance
     updates instantly (this is mock/fake right now). In a real system, should deposits
     require admin manual confirmation before crediting the user? If YES, the admin deposit
     panel becomes critical infrastructure and the user flow needs to change too.

  2. WITHDRAWAL PROCESSING FLOW
     Currently withdrawals just change status to "Pending." Will the admin manually transfer
     money to users bank accounts and then mark it as processed? Or will there be an
     automated payout system integrated later?

  3. SPIN WHEEL SECTORS
     Should admin be able to fully edit the spin wheel sectors (add, remove, change values),
     or just toggle it on/off and change costs? Full editing is more complex to build.

  4. CONGRATULATIONS MODAL CONTROL
     The current modal is hardcoded to always show when users land on the dashboard.
     Should the admin be able to toggle it on/off and change the message from the admin panel?
     (This requires the modal content to be fetched from a shared state or database.)

  5. TASK SUBMISSION PROOF
     Currently the TaskDetailsModal has a textarea and screenshot dropzone for proof
     submission. Where does this proof actually go? Does the admin need to view uploaded
     screenshots? This affects whether you need file/image storage.

  6. MULTIPLE ADMINS OR SINGLE ADMIN
     Will there be one admin account, or do you want a team with roles?
     (Super Admin, Support Agent, Finance Manager). Single admin is much simpler to build.

  7. REAL-TIME OR MANUAL
     Should the admin dashboard update in real-time (e.g., a new withdrawal request pops up
     immediately without refreshing the page), or is a manual page refresh acceptable?

---

## SUMMARY TABLE

Section                       | Priority | Complexity | Mirrors User Feature
------------------------------|----------|------------|------------------------------
Overview Dashboard            | HIGH     | Medium     | DashboardStats
User Management               | HIGH     | High       | Profile/Settings
Task Management + Review      | HIGH     | High       | Task Center + My Tasks
Financial (Deposits)          | HIGH     | Medium     | Deposit Modal + Wallet
Financial (Withdrawals)       | HIGH     | Medium     | Withdrawal Modal + Wallet
Notifications/Broadcasts      | MEDIUM   | Low        | Notifications Page
Congrats Modal Control        | MEDIUM   | Low        | CongratulationsModal
Referral Management           | MEDIUM   | Medium     | Referrals Page
Spin Wheel Config             | MEDIUM   | High       | Rewards/SpinWheel
Support Tickets               | MEDIUM   | Medium     | Contact Form
Admin Settings                | LOW      | Low        | Settings Page

---

Take your time reviewing this. Once you decide on the questions above and confirm
any changes to the plan, we can build the admin panel section by section.
