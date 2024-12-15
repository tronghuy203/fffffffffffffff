import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CreateNft from "../Demo/CreateNft";
import ListNft from "../Demo/ListNft";
import SellNft from "../Demo/SellNft";
import ListSellNft from "../Demo/ListSellNft";
import Home from "../Demo/Home";
import Footer from "../Demo/Footer"; 
import Web3 from "web3";
import "./css/styleindex.css"; // Custom styles
import logo from "../Demo/images/logo.png";

const Demo = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request accounts from MetaMask
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error fetching account: ", error);
        }
      } else {
        console.log("MetaMask is not installed");
      }
    };

    getAccount();

    // Listen for account changes in MetaMask
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });

    // Clean up the event listener on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return (
    <div className="demo-container">
      <header className="custom-header">
        <NavLink to="/" className="custom-brand">
          <img src={logo} alt="Logo" className="custom-logo" />
        </NavLink>
        <nav className="custom-nav">
          <NavLink to="/" className={({ isActive }) => `custom-link ${isActive ? "active" : ""}`}>
            Trang Chủ
          </NavLink>
          <NavLink to="/create-nft" className={({ isActive }) => `custom-link ${isActive ? "active" : ""}`}>
            Create NFT
          </NavLink>
          <NavLink to="/nft-collection" className={({ isActive }) => `custom-link ${isActive ? "active" : ""}`}>
            List NFT
          </NavLink>
          <NavLink to="/sell-nft" className={({ isActive }) => `custom-link ${isActive ? "active" : ""}`}>
          Marketplace
          </NavLink>
          <NavLink to="/sold-nft" className={({ isActive }) => `custom-link ${isActive ? "active" : ""}`}>
            Sold NFT
          </NavLink>
        </nav>
        {account && (
          <div className="custom-account-display">
           s
            <span className="custom-account-text">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
          </div>
        )}
      </header>
      <main className="custom-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-nft" element={<CreateNft />} />
          <Route path="/nft-collection" element={<ListNft />} />
          <Route path="/sell-nft" element={<SellNft />} />
          <Route path="/sold-nft" element={<ListSellNft />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
