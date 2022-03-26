const Art1stToken = artifacts.require("Art1stToken");
const should = require("should");

contract("Art1stToken", (accounts) => {

    let instance;

    before(async () => {
        // console.log(accounts);
    })

    beforeEach(async () => {
        instance = await Art1stToken.deployed();
    });

    describe("[테스트케이스 1: 스마트 컨트랙트가 잘 생성되었는지 확인] ", () => {
        it("1.1. 토큰 이름이 지정된 이름으로 생성되었는가?", async () => {
            const name = await instance.name();
            assert.equal(name, 'Art1stToken');
        });
        it("1.2. 토큰 심볼이 지정된 심볼으로 생성되었는가?", async () => {
            const symbol = await instance.symbol();
            assert.equal(symbol, 'AT');
        });
        it("1.3 토큰 decimal이 18으로 잘 생성되었는가?", async () => {
            const decimals = await instance.decimals();
            assert.equal(decimals, '18');
        });
    });

    describe("[테스트케이스 2: 토큰 보상(compensate)가 잘 진행되는지 점검]", () => {
        it("2.1. 일반적인 상황에서의 compensate가 잘 진행되는지 확인", async () => {
            const before_bal = (await instance.balanceOf(accounts[1])).toString();
            const before_total = (await instance.totalSupply()).toString();
            const amount = '300';

            const after_bal = (BigInt(before_bal) + BigInt(amount)).toString();
            const after_total = (BigInt(before_total) + BigInt(amount)).toString();

            await instance.compensate(accounts[1], amount);

            assert.equal(after_bal, await instance.balanceOf(accounts[1]), "balance가 맞지 않음");
            assert.equal(after_bal, await instance.allowance(accounts[1], accounts[0]), "allowance가 맞지 않음");
            assert.equal(after_total, await instance.totalSupply(), "totalSupply가 맞지 않음");

        });
        it("2.2. 토큰 보상을 받는 사람의 address가 잘못된 address일 때 제대로 revert되는가?", async () => {
            try{
                await instance.compensate('0x20w94ew9v', '300');
                should.fail("No error was throw when it should have been");
            }
            catch (err) {
                console.log(err.toString());
            }
        });

    });

    describe("[테스트케이스 3: 토큰 후원(donate)가 잘 진행되는지 점검]", () => {
        it("3.1. 일반적인 상황에서의 donate가 잘 진행되는지 확인", async () => {
            const before_from_bal = (await instance.balanceOf(accounts[1])).toString();
            const before_to_bal = (await instance.balanceOf(accounts[2])).toString();
            const before_total = (await instance.totalSupply()).toString();
            const amount = '100';

            const after_from_bal = (BigInt(before_from_bal) - BigInt(amount)).toString();
            const after_to_bal = (BigInt(before_to_bal) + BigInt(amount)).toString();
            
            await instance.donate(accounts[1], accounts[2], amount);

            assert.equal(after_from_bal, await instance.balanceOf(accounts[1]), "from의 balance가 맞지 않음");
            assert.equal(after_from_bal, await instance.allowance(accounts[1], accounts[0]), "from의 allowance가 맞지 않음");
            assert.equal(after_to_bal, await instance.balanceOf(accounts[2]), "to의 balance가 맞지 않음");
            assert.equal(after_to_bal, await instance.allowance(accounts[2], accounts[0]), "to의 allowance가 맞지 않음");
            assert.equal(before_total, await instance.totalSupply(), "totalSupply가 맞지 않음");
        });
        it("3.2 후원 할 사람의 잔액이 부족할 때 제대로 revert되는가?", async () => {
            try{
                await instance.donate(accounts[3], accounts[2], '300'); // account[3]은 토큰 잔액 0
                should.fail("No error was throw when it should have been");
            }
            catch(err) {
                console.log(err.toString());
            }
            
        });
        it("3.3 후원 할 사람의 address가 잘못된 address일 때 제대로 revert되는가?", async () => {
            try{
                await instance.donate('0x20w94ew9v',accounts[2], '300');
                should.fail("No error was throw when it should have been");
            }
            catch (err) {
                console.log(err.toString());
            }

        });
        it("3.4 후원 받을 사람의 address가 잘못된 address일 때 제대로 revert되는가?", async () => {
            try{
                await instance.donate(accounts[1], '0x20w94ew9v', '300');
                should.fail("No error was throw when it should have been");
            }
            catch (err) {
                console.log(err.toString());
            }
        });
    })


})
