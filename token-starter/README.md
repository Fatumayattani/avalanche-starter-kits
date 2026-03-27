# Token Starter

A minimal ERC20 starter for Avalanche.

This project shows how to deploy a token and interact with it using a simple frontend connected via Core Wallet.

---

## ⚙️ What’s included

- ERC20 token contract (OpenZeppelin)
- Hardhat setup (Avalanche Fuji testnet)
- Deployment script
- React + TypeScript frontend (Vite)
- Core Wallet integration

---

## 🔑 Requirements

- Node.js (v22 recommended)
- Core Wallet (set to Fuji testnet)
- AVAX test tokens (for deployment and transactions)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
````

---

### 2. Set up environment

Create a `.env` file in the root:

```env
PRIVATE_KEY=your_private_key
```

⚠️ Use a test wallet only

---

### 3. Deploy contract

```bash
npx hardhat run scripts/deploy.ts --network fuji
```

Copy the deployed contract address.

---

### 4. Configure frontend

Open:

```
frontend/src/App.tsx
```

Replace:

```ts
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
```

With your deployed address.

---

### 5. Run frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 What you can do

* Connect Core Wallet
* View AVAX balance
* View token balance
* Send tokens

---

## ⚠️ Notes

* Transactions require AVAX for gas
* Token features work only after deploying contract
* Make sure you are on Avalanche Fuji testnet

---

## 🎯 Goal

Provide a simple, runnable starting point for building token-based applications on Avalanche.