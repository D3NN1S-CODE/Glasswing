// Frontend-only mock API service
import { User, Transaction, LoyaltyReward } from '../types';

type StoredUser = User & { password: string };

const USERS_KEY = 'mocha_users_v1';
const TX_KEY = 'mocha_transactions_v1';

function nowIso() {
  return new Date().toISOString();
}

function loadUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw);

  const demo: StoredUser = {
    id: '1',
    matricNumber: '18CSC001',
    firstName: 'Demo',
    lastName: 'Student',
    email: 'demo@stu.cu.edu.ng',
    balance: 1000,
    loyaltyPoints: 120,
    level: 'Bronze',
    createdAt: nowIso(),
    password: 'password',
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([demo]));
  return [demo];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadTx(): Transaction[] {
  const raw = localStorage.getItem(TX_KEY);
  if (raw) return JSON.parse(raw);

  const demoTx: Transaction[] = [
    {
      id: 't1',
      type: 'received',
      amount: 500,
      description: 'Initial top-up',
      date: nowIso(),
      status: 'completed',
    },
  ];
  localStorage.setItem(TX_KEY, JSON.stringify(demoTx));
  return demoTx;
}

function saveTx(tx: Transaction[]) {
  localStorage.setItem(TX_KEY, JSON.stringify(tx));
}

class ApiService {
  // Auth
  async register(data: { matricNumber: string; firstName: string; lastName: string; email: string; password: string }) {
    const users = loadUsers();
    if (users.find((u) => u.matricNumber === data.matricNumber)) {
      const err: any = new Error('Matric number already registered');
      err.response = { data: { message: 'Matric number already registered' } };
      throw err;
    }

    const newUser: StoredUser = {
      id: String(Date.now()),
      matricNumber: data.matricNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      balance: 0,
      loyaltyPoints: 0,
      level: 'Bronze',
      createdAt: nowIso(),
      password: data.password,
    };

    users.push(newUser);
    saveUsers(users);

    const token = `mock-token-${newUser.matricNumber}`;
    localStorage.setItem('token', token);

    const userResponse: User = { ...newUser };
    delete (userResponse as any).password;

    return { message: 'Registration successful', data: { token, user: userResponse } };
  }

  async login(data: { matricNumber: string; password: string }) {
    const users = loadUsers();
    const user = users.find((u) => u.matricNumber === data.matricNumber && u.password === data.password);
    if (!user) {
      const err: any = new Error('Invalid credentials');
      err.response = { data: { message: 'Invalid matric number or password' } };
      throw err;
    }

    const token = `mock-token-${user.matricNumber}`;
    localStorage.setItem('token', token);

    const userResponse: User = { ...user };
    delete (userResponse as any).password;

    return { message: 'Login successful', data: { token, user: userResponse } };
  }

  async googleAuth(credential: string) {
    // Credential is ignored in mock; create/fetch a demo google user
    const users = loadUsers();
    let user = users.find((u) => u.email === 'google@demo.cu.edu.ng');
    if (!user) {
      user = {
        id: String(Date.now()),
        matricNumber: `G${Date.now() % 100000}`,
        firstName: 'Google',
        lastName: 'User',
        email: 'google@demo.cu.edu.ng',
        balance: 500,
        loyaltyPoints: 50,
        level: 'Bronze',
        createdAt: nowIso(),
        password: 'google',
      };
      users.push(user);
      saveUsers(users);
    }

    const token = `mock-token-${user.matricNumber}`;
    localStorage.setItem('token', token);

    const userResponse: User = { ...user };
    delete (userResponse as any).password;

    return { message: 'Google sign-in successful', data: { token, user: userResponse } };
  }

  async getMe() {
    const token = localStorage.getItem('token');
    if (!token) {
      const err: any = new Error('Not authenticated');
      err.response = { data: { message: 'Not authenticated' } };
      throw err;
    }

    const users = loadUsers();
    const matric = token.replace('mock-token-', '');
    const user = users.find((u) => u.matricNumber === matric) || users[0];

    const userResponse: User = { ...user };
    delete (userResponse as any).password;

    return { data: { user: userResponse } };
  }

  // Transactions
  async getBalance() {
    const me = await this.getMe();
    return { data: { balance: me.data.user.balance } };
  }

  async getTransactions() {
    const tx = loadTx();
    return { data: { transactions: tx } };
  }

  async topUpWallet(data: { amount: number; paymentMethod: string }) {
    const token = localStorage.getItem('token');
    if (!token) {
      const err: any = new Error('Not authenticated');
      err.response = { data: { message: 'Not authenticated' } };
      throw err;
    }

    const users = loadUsers();
    const matric = token.replace('mock-token-', '');
    const user = users.find((u) => u.matricNumber === matric) as StoredUser;
    if (!user) throw new Error('User not found');

    user.balance += data.amount;
    saveUsers(users);

    const tx = loadTx();
    const newTx: Transaction = {
      id: String(Date.now()),
      type: 'payment',
      amount: data.amount,
      description: `Top up via ${data.paymentMethod}`,
      date: nowIso(),
      status: 'completed',
    };
    tx.unshift(newTx);
    saveTx(tx);

    return { message: 'Top up successful', data: { transaction: newTx } };
  }

  async sendMoney(data: { recipientMatricNumber: string; amount: number; note?: string }) {
    const token = localStorage.getItem('token');
    if (!token) {
      const err: any = new Error('Not authenticated');
      err.response = { data: { message: 'Not authenticated' } };
      throw err;
    }

    const users = loadUsers();
    const senderMatric = token.replace('mock-token-', '');
    const sender = users.find((u) => u.matricNumber === senderMatric) as StoredUser;
    const recipient = users.find((u) => u.matricNumber === data.recipientMatricNumber);

    if (!recipient) {
      const err: any = new Error('Recipient not found');
      err.response = { data: { message: 'Recipient not found' } };
      throw err;
    }

    if (sender.balance < data.amount) {
      const err: any = new Error('Insufficient funds');
      err.response = { data: { message: 'Insufficient funds' } };
      throw err;
    }

    sender.balance -= data.amount;
    (recipient as StoredUser).balance += data.amount;
    saveUsers(users);

    const tx = loadTx();
    const newTx: Transaction = {
      id: String(Date.now()),
      type: 'transfer',
      amount: data.amount,
      description: data.note || `Send to ${recipient.matricNumber}`,
      sender: sender.matricNumber,
      recipient: recipient.matricNumber,
      date: nowIso(),
      status: 'completed',
    };
    tx.unshift(newTx);
    saveTx(tx);

    return { message: 'Transfer successful', data: { transaction: newTx } };
  }

  // Payments / QR (mocked)
  async generateQRCode() {
    return { data: { qr: 'MOCK_QR_CODE_DATA' } };
  }

  async processQRPayment(data: { amount: number; vendorName: string; qrData?: any }) {
    // simple mock: deduct from current user
    const token = localStorage.getItem('token');
    if (!token) {
      const err: any = new Error('Not authenticated');
      err.response = { data: { message: 'Not authenticated' } };
      throw err;
    }

    const users = loadUsers();
    const matric = token.replace('mock-token-', '');
    const user = users.find((u) => u.matricNumber === matric) as StoredUser;
    if (user.balance < data.amount) {
      const err: any = new Error('Insufficient funds');
      err.response = { data: { message: 'Insufficient funds' } };
      throw err;
    }

    user.balance -= data.amount;
    saveUsers(users);

    const tx = loadTx();
    const newTx: Transaction = {
      id: String(Date.now()),
      type: 'payment',
      amount: data.amount,
      description: `QR payment to ${data.vendorName}`,
      date: nowIso(),
      status: 'completed',
    };
    tx.unshift(newTx);
    saveTx(tx);

    return { message: 'Payment successful', data: { transaction: newTx } };
  }

  async getPopularVendors() {
    return { data: { vendors: [{ name: 'Campus Cafe' }, { name: 'Library Shop' }] } };
  }

  // Loyalty
  async getRewards() {
    const rewards: LoyaltyReward[] = [
      { id: 'r1', title: 'Free Coffee', description: 'Redeem for a free coffee', pointsRequired: 100, icon: 'coffee', unlocked: false },
      { id: 'r2', title: 'Discount Voucher', description: '10% off at Campus Cafe', pointsRequired: 200, icon: 'ticket', unlocked: false },
    ];
    return { data: { rewards } };
  }

  async redeemReward(rewardId: string) {
    // simple mock: deduct fixed points
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const users = loadUsers();
    const matric = token.replace('mock-token-', '');
    const user = users.find((u) => u.matricNumber === matric) as StoredUser;
    if (user.loyaltyPoints < 100) {
      const err: any = new Error('Insufficient loyalty points');
      err.response = { data: { message: 'Insufficient loyalty points' } };
      throw err;
    }
    user.loyaltyPoints -= 100;
    saveUsers(users);
    return { message: 'Reward redeemed', data: { rewardId } };
  }

  async getMyRewards() {
    return { data: { rewards: [] } };
  }

  async getLoyaltyStatus() {
    const me = await this.getMe();
    return { data: { status: { points: me.data.user.loyaltyPoints, level: me.data.user.level } } };
  }

  // Users
  async searchUsers(query: string) {
    const users = loadUsers();
    const results = users.filter((u) => u.matricNumber.includes(query) || `${u.firstName} ${u.lastName}`.toLowerCase().includes(query.toLowerCase()));
    const publicUsers = results.map((u) => {
      const pu: any = { ...u };
      delete pu.password;
      return pu;
    });
    return { data: { users: publicUsers } };
  }

  async getUserProfile(matricNumber: string) {
    const users = loadUsers();
    const user = users.find((u) => u.matricNumber === matricNumber);
    if (!user) {
      const err: any = new Error('User not found');
      err.response = { data: { message: 'User not found' } };
      throw err;
    }
    const pu: any = { ...user };
    delete pu.password;
    return { data: { user: pu } };
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export const apiService = new ApiService();
