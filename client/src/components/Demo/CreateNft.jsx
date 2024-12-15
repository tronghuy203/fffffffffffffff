import React, { useState } from 'react';
import { useEth } from "../../contexts";
import '../Demo/css/stylecratenft.css'; // Ensure you import the CSS file

const CreateNft = () => {
    const { state: { accounts, contracts, web3 } } = useEth();
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const createItem = async () => {
        try {
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: contracts.MyCollection.options.address,
                data: contracts.MyCollection.methods.mint(
                    accounts[0],
                    itemName,
                    itemDescription,
                    imageUrl
                ).encodeABI()
            });
        } catch (error) {
            console.error(error);
        }
        setItemName('');
        setItemDescription('');
        setImageUrl('');
    };

    return (
        <div className="product-form-container">
            <div className="product-form">
                <h2>Create NFT</h2>
                <p>
                    <label htmlFor="itemName">Item Name</label>
                    <input
                        type="text"
                        id="itemName"
                        className="form-control"
                        value={itemName}
                        onChange={e => setItemName(e.target.value)}
                        placeholder="Enter item name"
                    />
                </p>
                <p>
                    <label htmlFor="itemDescription">Item Description</label>
                    <textarea
                        id="itemDescription"
                        className="form-control"
                        value={itemDescription}
                        onChange={e => setItemDescription(e.target.value)}
                        placeholder="Enter item description"
                    />
                </p>
                <p>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="form-control"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="Enter image URL (e.g., IPFS URL)"
                    />
                </p>
                <button className="btn btn-primary" onClick={createItem}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateNft;
