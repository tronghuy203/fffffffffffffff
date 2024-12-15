import React, { useState } from 'react';
import { useEth } from '../../contexts';
import '../Demo/css/stylesellnft.css'; 
const SellNft = () => {
  const { state: { accounts, contracts, web3 } } = useEth();

  const [nftCollection, setNftCollection] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');

  const sellNft = async () => {
    const priceInWei = web3.utils.toWei(price, 'ether');
    await contracts.Marketplace.methods
      .sellNft(nftCollection, tokenId, priceInWei)
      .send({ from: accounts[0] });
  };

  return (
    <div className="product-form-container">
      <div className="product-form">
        <h2><b>Marketplace</b></h2>
        <p>Address: {contracts?.Marketplace?.options?.address}</p>
        <input
          type="text"
          placeholder="NFT Collection address"
          className="form-control my-3"
          value={nftCollection}
          onChange={(e) => setNftCollection(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID"
          className="form-control my-3"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price (ETH)"
          className="form-control my-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="btn btn-primary" onClick={sellNft}>Sell Item</div>
      </div>
    </div>
  );
};

export default SellNft;
