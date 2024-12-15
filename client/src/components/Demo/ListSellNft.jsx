import React, { useState, useEffect, useCallback } from 'react';
import { useEth } from '../../contexts';
import '../Demo/css/stylelistsellnft.css'; // Import the CSS file

const ListSellNft = () => {
  const { state: { accounts, contracts, web3 } } = useEth();
  const [listItem, setListItem] = useState([]);

  const getListItem = useCallback(() => {
    if (contracts.Marketplace && contracts.MyCollection) {
      (async () => {
        const totalItem = await contracts.Marketplace.methods.totalItem().call();
        const _listItem = [];
        for (let itemId = 0; itemId < totalItem; itemId++) {
          const itemListed = await contracts.Marketplace.methods.item(itemId).call();
          const metadataOfTokenId = await contracts.MyCollection.methods
            .tokenMetadata(itemListed.tokenId)
            .call();
          const { nftContract, tokenId, seller, buyer, price } = itemListed;
          _listItem.push({
            itemId, nftContract, tokenId, seller, buyer, price,
            name: metadataOfTokenId.name,
            description: metadataOfTokenId.description,
            image: metadataOfTokenId.image,
          });
        }
        setListItem(_listItem);
      })();
    }
  }, [contracts.Marketplace, contracts.MyCollection]);

  useEffect(() => {
    getListItem();
  }, [getListItem]);

  const buyNft = async (itemId, price) => {
    await contracts.Marketplace.methods
      .buyNft(itemId)
      .send({ from: accounts[0], value: price });

    getListItem();
  };

  return (

    <div className="product-list-container">
      
      <div className="product-list">
     
        {listItem?.map(item => (
          <div key={item.itemId} className="product-item">
            <h4>#{item.itemId} {item.name}</h4>
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                className="nft-image" 
                style={{ maxWidth: '100%', height: 'auto' }} // Optional: control image size
              />
            )}
            <p>
              Description: {item.description}<br />
              From Collection: {item.nftContract}<br />
              Token ID: {item.tokenId.toString()}<br />
              Price: {web3.utils.fromWei(item.price, 'ether')} ETH<br />
              Seller: {item.seller}<br />
              Buyer: {item.buyer}
            </p>
            {item.buyer === '0x0000000000000000000000000000000000000000' && (
              <div
                onClick={() => buyNft(item.itemId, item.price.toString())}
                className="btn btn-primary mt-2"
              >Buy</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSellNft;
