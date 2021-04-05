const MemoryToken = artifacts.require('./MemoryToken.sol');

require('chai').use(require('chai-as-promised')).should()

contract('Memory Token', (accounts) => {
    let token;
    before(async() => {
        token = await MemoryToken.deployed();
    })

    describe('deploment', async() => {
        it('deploys successfully', async() => {
            const address = token.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })

        it('has a name', async() => {
            const name = await token.name();
            assert.equal(name, 'Memory Token');
        })

        it('has a symbol', async() => {
            const symbol = await token.symbol();
            assert.equal(symbol, 'MEMORY');
        })
    })
    describe('deploment', async() => {
        let results;
        
        it('mints tokens', async() => {
            await token.mint(accounts[0], "https://www.latercera.com/resizer/XH7yyUm8NR0Ojb0XJ2v6lm8Uzik=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/KHAZYNTEJNH65HPTUU47KYX2I4.jpg")

            //deberia incrementar el totalSupply
            results = await token.totalSupply();
            assert.equal(results.toString(), '1', 'total supply is correct');

            //deberia incrementar el ownerBalace
            results = await token.balanceOf(accounts[0])
            assert.equal(results.toString(), '1', 'balanceOf is correct');

            // el usuario tiene token?
            results = await token.ownerOf('1')
            assert.equal(results.toString(), accounts[0], 'ownerOf is correct');
            results = await token.tokenOfOwnerByIndex(accounts[0], 0);

            let balaceOf = await token.balanceOf(accounts[0])
            let tokenIds = [];
            for (let index = 0; index < balaceOf; index++) {
                let id = await token.tokenOfOwnerByIndex(accounts[0], index);
                tokenIds.push(id.toString());
            }
            let expect = ['1'];
            assert.equal(tokenIds.toString(), expect.toString(), 'tokenIds are correct');

            //url es correcta

            let tokenURI = await token.tokenURI('1');
            assert.equal(tokenURI, 'https://www.latercera.com/resizer/XH7yyUm8NR0Ojb0XJ2v6lm8Uzik=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/KHAZYNTEJNH65HPTUU47KYX2I4.jpg');

        })
    })
});