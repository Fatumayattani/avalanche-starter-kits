import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// ⚠️ paste contract later
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

export default function App() {
  const [account, setAccount] = useState("");
  const [avaxBalance, setAvaxBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [network, setNetwork] = useState("");

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install Core Wallet");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAccount(address);

    const bal = await provider.getBalance(address);
    setAvaxBalance(ethers.formatEther(bal));

    const net = await provider.getNetwork();

    if (net.chainId === 43113n) {
      setNetwork("Avalanche Fuji");
    } else {
      setNetwork("Unsupported Network");
      return;
    }

    // Try token balance (will fail until contract exists)
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const tokenBal = await contract.balanceOf(address);
      setTokenBalance(ethers.formatUnits(tokenBal, 18));
    } catch {
      setTokenBalance("0");
    }
  }

  async function sendTokens() {
    if (!to || !amount) return alert("Fill all fields");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const tx = await contract.transfer(
        to,
        ethers.parseUnits(amount, 18)
      );

      await tx.wait();

      alert("Transaction successful");

      connectWallet(); // refresh balances
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Token Starter</h1>

        <button style={styles.button} onClick={connectWallet}>
          Connect Core Wallet
        </button>

        {/* WALLET INFO */}
        <div style={styles.section}>
          <p style={styles.label}>Account</p>
          <p style={styles.value}>{account || "Not connected"}</p>
        </div>

        <div style={styles.section}>
          <p style={styles.label}>AVAX Balance</p>
          <p style={styles.value}>{avaxBalance || "—"} AVAX</p>
        </div>

        <div style={styles.section}>
          <p style={styles.label}>Token Balance</p>
          <p style={styles.value}>{tokenBalance || "—"} STK</p>
        </div>

        <div style={styles.section}>
          <p style={styles.label}>Network</p>
          <p style={styles.value}>{network || "—"}</p>
        </div>

        <hr style={styles.divider} />

        {/* SEND TOKENS */}
        <div style={styles.section}>
          <p style={styles.label}>Send Tokens</p>

          <input
            style={styles.input}
            placeholder="Recipient address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button style={styles.button} onClick={sendTokens}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#111",
    borderRadius: "12px",
    padding: "28px",
    border: "1px solid #222",
    boxShadow: "0 0 30px rgba(255,0,0,0.15)"
  },
  title: {
    textAlign: "center",
    color: "#ff3b3b",
    marginBottom: "20px"
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff3b3b",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px"
  },
  section: {
    marginBottom: "16px"
  },
  label: {
    color: "#888",
    fontSize: "12px"
  },
  value: {
    color: "#fff",
    fontSize: "14px",
    wordBreak: "break-all"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#000",
    color: "#fff"
  },
  divider: {
    borderColor: "#222",
    margin: "20px 0"
  }
};