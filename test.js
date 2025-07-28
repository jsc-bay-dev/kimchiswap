// Simple test script for KimchiCoin
const { expect } = require('chai');

describe('KimchiCoin Tests', function() {
    let kimchiCoin;
    let owner, addr1, addr2;

    beforeEach(async function() {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        const KimchiCoin = await ethers.getContractFactory('KimchiCoin');
        kimchiCoin = await KimchiCoin.deploy(1000000); // 1M tokens
        await kimchiCoin.deployed();
    });

    it('Should have correct initial values', async function() {
        expect(await kimchiCoin.name()).to.equal('KimchiCoin');
        expect(await kimchiCoin.symbol()).to.equal('KCH');
        expect(await kimchiCoin.decimals()).to.equal(18);
        expect(await kimchiCoin.totalSupply()).to.equal(ethers.utils.parseEther('1000000'));
    });

    it('Should assign total supply to owner', async function() {
        const ownerBalance = await kimchiCoin.balanceOf(owner.address);
        expect(ownerBalance).to.equal(await kimchiCoin.totalSupply());
    });

    it('Should transfer tokens correctly', async function() {
        const transferAmount = ethers.utils.parseEther('100');
        
        await kimchiCoin.transfer(addr1.address, transferAmount);
        
        expect(await kimchiCoin.balanceOf(addr1.address)).to.equal(transferAmount);
    });

    it('Should reject transfers to zero address', async function() {
        const transferAmount = ethers.utils.parseEther('100');
        
        await expect(
            kimchiCoin.transfer(ethers.constants.AddressZero, transferAmount)
        ).to.be.revertedWith('ERC20: transfer to the zero address');
    });

    it('Should handle approvals correctly', async function() {
        const approvalAmount = ethers.utils.parseEther('100');
        
        await kimchiCoin.approve(addr1.address, approvalAmount);
        
        expect(await kimchiCoin.allowance(owner.address, addr1.address))
            .to.equal(approvalAmount);
    });

    it('Should handle transferFrom correctly', async function() {
        const transferAmount = ethers.utils.parseEther('100');
        
        // Approve first
        await kimchiCoin.approve(addr1.address, transferAmount);
        
        // Transfer from owner to addr2 via addr1
        await kimchiCoin.connect(addr1).transferFrom(
            owner.address, 
            addr2.address, 
            transferAmount
        );
        
        expect(await kimchiCoin.balanceOf(addr2.address)).to.equal(transferAmount);
        expect(await kimchiCoin.allowance(owner.address, addr1.address)).to.equal(0);
    });
});
