# AInest Frontend

A decentralized AI dataset marketplace built on **StarkNet**, powered by **Cairo v2** smart contracts and integrated with **starknet-react** for wallet connectivity.

---

## 🚀 Overview

AInest enables secure, trustless trading of AI datasets while ensuring authenticity and preventing duplicates using:

- **StarkNet** (Layer 2 zk-rollup for Ethereum)
- **Cairo v2** smart contracts
- **IPFS** for decentralized dataset storage
- **Starknet.js / starknet-react** for contract interaction

This is the **frontend application** for interacting with AInest’s smart contracts.

---

## 🛠 Tech Stack

- **Framework:** Next.js / React
- **Blockchain:** StarkNet
- **Smart Contracts:** Cairo v2
- **Wallets:** starknet-react + starknetkit connectors (ArgentX, Braavos, Web Wallet)
- **Styling:** Tailwind CSS
- **Storage:** IPFS

---

## 📂 Project Structure

src/
├── components/ # Reusable UI components
├── context/ # StarkNet context providers
├── pages/ # Next.js routes
├── styles/ # CSS & Tailwind setup
└── utils/ # Helper functions

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/ainest.git
cd ainest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

## Environment Variables

Create a .env.local file in the root directory and add:

```bash
NEXT_PUBLIC_IPFS_GATEWAY=<your-ipfs-gateway>
NEXT_PUBLIC_STARKNET_NETWORK=sepolia
```

## 📦 Features (MVP)

- Wallet connection (ArgentX, Braavos, Web Wallet)

- Dataset registration form

- Dataset listing & browsing

- IPFS hash verification

- Ownership transfer UI

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

## 🐛 Issues & Support

If you encounter any issues:

1. Open an issue on GitHub

2. Or ping me directly if we’re collaborating on this repo

## 📜 License

MIT License © 2025 [AiNest]
