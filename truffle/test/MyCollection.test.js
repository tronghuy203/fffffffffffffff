const toBN = (number) => web3.utils.toBN(number);

contract("MyCollection", async (accounts) => {
    const MyCollection = artifacts.require("MyCollection");
    const myCollectionName = "My Collection Name";
    const myCollectionSymbol = "MCN";

    before(async () => {
        this.accountOwner = accounts[0];
        this.account1 = accounts[1];
        this.MyCollectionInstance = await MyCollection.new(
            myCollectionName,
            myCollectionSymbol
        );
    });

    it("Should have token information", async () => {
        const name = await this.MyCollectionInstance.name();
        const symbol = await this.MyCollectionInstance.symbol();

        assert.equal(
            name,
            myCollectionName,
            "My Collection does not have the correct name"
        );
        assert.equal(
            symbol,
            myCollectionSymbol,
            "My Collection does not have the correct symbol"
        );
    });

    it("Should mint a token", async () => {
        const tokenMetadataName = "NFT item 01 name";
        const tokenMetadataDescription = "NFT item 01 description";
        const tokenMetadataImage = "https://example.com/nft01.png";

        const nftBalanceBefore = await this.MyCollectionInstance.balanceOf(
            this.accountOwner
        );

        await this.MyCollectionInstance.mint(
            this.accountOwner,
            tokenMetadataName,
            tokenMetadataDescription,
            tokenMetadataImage
        );

        const nftBalanceAfter = await this.MyCollectionInstance.balanceOf(
            this.accountOwner
        );

        const totalSupply = await this.MyCollectionInstance.totalSupply();
        const latestTokenId = totalSupply.sub(toBN(1));
        const ownerOfTokenId = await this.MyCollectionInstance.ownerOf(latestTokenId);
        const metadataOfTokenId = await this.MyCollectionInstance.tokenMetadata(latestTokenId);

        assert.isTrue(
            nftBalanceAfter.eq(nftBalanceBefore.add(toBN(1))),
            "NFT balance of the account did not increment as expected"
        );

        assert.equal(
            ownerOfTokenId,
            this.accountOwner,
            "Token owner is incorrect"
        );

        assert.equal(
            metadataOfTokenId.name,
            tokenMetadataName,
            "Token metadata name is incorrect"
        );

        assert.equal(
            metadataOfTokenId.description,
            tokenMetadataDescription,
            "Token metadata description is incorrect"
        );

        assert.equal(
            metadataOfTokenId.image,
            tokenMetadataImage,
            "Token metadata image is incorrect"
        );
    });

    it("Should transfer a token to another account", async () => {
        const tokenMetadataName = "NFT item 02 name";
        const tokenMetadataDescription = "NFT item 02 description";
        const tokenMetadataImage = "https://example.com/nft02.png";

        await this.MyCollectionInstance.mint(
            this.accountOwner,
            tokenMetadataName,
            tokenMetadataDescription,
            tokenMetadataImage
        );

        const totalSupply = await this.MyCollectionInstance.totalSupply();
        const latestTokenId = totalSupply.sub(toBN(1));

        const ownerBefore = await this.MyCollectionInstance.ownerOf(latestTokenId);

        await this.MyCollectionInstance.transferFrom(
            this.accountOwner,
            this.account1,
            latestTokenId
        );

        const ownerAfter = await this.MyCollectionInstance.ownerOf(latestTokenId);

        assert.equal(
            ownerBefore,
            this.accountOwner,
            "Token owner before transfer is incorrect"
        );
        assert.equal(
            ownerAfter,
            this.account1,
            "Token owner after transfer is incorrect"
        );
    });

    it("Should approve another account for a token", async () => {
        const tokenMetadataName = "NFT item 03 name";
        const tokenMetadataDescription = "NFT item 03 description";
        const tokenMetadataImage = "https://example.com/nft03.png";

        await this.MyCollectionInstance.mint(
            this.accountOwner,
            tokenMetadataName,
            tokenMetadataDescription,
            tokenMetadataImage
        );

        const totalSupply = await this.MyCollectionInstance.totalSupply();
        const latestTokenId = totalSupply.sub(toBN(1));

        const ownerBefore = await this.MyCollectionInstance.ownerOf(latestTokenId);

        await this.MyCollectionInstance.approve(this.account1, latestTokenId);
        const approvedAccount = await this.MyCollectionInstance.getApproved(latestTokenId);

        assert.equal(
            ownerBefore,
            this.accountOwner,
            "Token owner is incorrect before approval"
        );
        assert.equal(
            approvedAccount,
            this.account1,
            "Approved account is incorrect"
        );
    });
});
