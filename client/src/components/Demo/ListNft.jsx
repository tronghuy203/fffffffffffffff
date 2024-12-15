import React, { useState, useEffect } from 'react';
import { useEth } from "../../contexts";
import '../Demo/css/stylelistnft.css'; // Import the CSS file

const ListNft = () => {
    const { state: { accounts, contracts, web3 } } = useEth();
    const [listItem, setListItem] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for approval transactions

    const getListItem = async () => {
        const totalSupply = await contracts.MyCollection.methods.totalSupply().call();
        const _listItemPromises = [];

        for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
            const tokenDetails = contracts.MyCollection.methods.tokenMetadata(tokenId).call();
            const ownerOfTokenId = contracts.MyCollection.methods.ownerOf(tokenId).call();
            const approvedOfTokenId = contracts.MyCollection.methods.getApproved(tokenId).call();

            _listItemPromises.push(
                Promise.all([tokenDetails, ownerOfTokenId, approvedOfTokenId]).then(([metadata, owner, approved]) => ({
                    tokenId,
                    owner,
                    approved,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image, 
                }))
            );
        }

        // Resolve all promises in parallel
        const items = await Promise.all(_listItemPromises);
        setListItem(items);
    };

    useEffect(() => {
        if (contracts.MyCollection) getListItem();
    }, [contracts.MyCollection]);

    const handleOnApprove = async (event, tokenId) => {
        event.preventDefault();
        const approveTo = event.target.approveTo.value;

        setLoading(true);
        try {
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: contracts.MyCollection.options.address,
                data: contracts.MyCollection.methods.approve(approveTo, tokenId).encodeABI(),
            });
            getListItem(); // Refresh the list after approval
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div >
               <div className="header-section">
                <h2><b>My Collection</b></h2>
                <p>Address: {contracts?.MyCollection?.options?.address}</p>
            </div>
        <div className="product-list">
           
            <div className="product-list-items">
               
                {listItem?.map(item => (
                    <div key={item.tokenId} className="product-item card p-3 my-3">
                        <h4>#{item.tokenId}: {item.name}</h4>
                        <p>Description: {item.description}</p>
                        <p>Token ID: {item.tokenId}</p>
                        <p>Owner: {item.owner}</p>
                        <p>Approved: {item.approved}</p>
                        {item.image && <img src={item.image} alt={item.name} className="nft-image" />}

                        {/* Approve Section */}
                        <form onSubmit={(e) => handleOnApprove(e, item.tokenId)}>
                            <label htmlFor="approveTo">Approve to</label>
                            <input
                                type="text"
                                name="approveTo"
                                className="form-control"
                                placeholder="Address to approve"
                            />
                            <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
                                {loading ? 'Approving...' : 'Approve'}
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default ListNft;
