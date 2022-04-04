import dotenv from 'dotenv';
dotenv.config();

// ERC20
import Erc20Abi from '../api/abi/erc20Abi.js';
import Erc20Bytecode from '../api/abi/erc20Bytecode.js';

// ERC721
import Erc721Abi from '../api/abi/erc721abi.js';
import Erc721Bytecode from '../api/abi/erc721Bytecode.js';

// Collaboration
import CollaboAbi from '../api/abi/collaborationAbi.js';
import CollaboBytecode from '../api/abi/collaborationBytecode.js';

// Batcher
import BatcherAbi from '../api/abi/batcherAbi.js';
import BatcherBytecode from '../api/abi/batcherBytecode.js';

import UserInterface from '../services/user.js';
import { addAmount, subAmount, isBigger } from './utils/calculateKlay.js';
import Caver from 'caver-js';

class KlaytnService {
  #Erc20Bytecode;
  #Erc20Abi;

  #Erc721Bytecode;
  #Erc721Abi;

  #CollaboBytecode;
  #CollaboAbi;

  #BatcherBytecode;
  #BatcherAbi;

  #server;

  #myErc20Contract;
  #myErc721Contract;
  #myCollaboContract;
  #myBatcherContract;

  #Erc20Address;
  #Erc721Address;
  #CollaboAddress;
  #BatcherAddress;

  constructor() {
    this.caver = new Caver(process.env.BAOBAB_NETWORK);
    this.#server = this.caver.klay.accounts.wallet.add(
      process.env.SERVER_PRIVATEKEY
    );

    this.#Erc20Bytecode = Erc20Bytecode;
    this.#Erc20Abi = Erc20Abi;
    this.#Erc721Bytecode = Erc721Bytecode;
    this.#Erc721Abi = Erc721Abi;
    this.#CollaboBytecode = CollaboBytecode;
    this.#CollaboAbi = CollaboAbi;
    this.#BatcherBytecode = BatcherBytecode;
    this.#BatcherAbi = BatcherAbi;

    if (process.env.ERC20_ADDRESS != '') {
      // 이미 배포한 erc20 contract가 있음
      console.log('erc20 컨트랙트 배포 완료');
      this.setMyErc20Contract(process.env.ERC20_ADDRESS);
    } else {
      console.log('Erc20 컨트랙트 배포 필요');
      this.#myErc20Contract = new this.caver.klay.Contract(this.#Erc20Abi);
    }

    if (process.env.ERC721_ADDRESS != '') {
      // 이미 배포한 erc721 contract가 있음
      console.log('erc721 컨트랙트 배포 완료');
      this.setMyErc721Contract(process.env.ERC721_ADDRESS);
    } else {
      console.log('Erc721 컨트랙트 배포 필요');
      this.#myErc721Contract = new this.caver.klay.Contract(this.#Erc721Abi);
    }

    if (process.env.COLLABO_ADDRESS != '') {
      // 이미 배포한 collaboration contract가 있음
      console.log('Collaboration 컨트랙트 배포 완료');
      this.setMyCollaboContract(process.env.COLLABO_ADDRESS);
    } else {
      console.log('Collaboration 컨트랙트 배포 필요');
      this.#myCollaboContract = new this.caver.klay.Contract(this.#CollaboAbi);
    }

    if (process.env.BATCHER_ADDRESS != '') {
      // 이미 배포한 batcher contract가 있음
      console.log('Batcher 컨트랙트 배포 완료');
      this.setMyBatcherContract(process.env.BATCHER_ADDRESS);
    } else {
      console.log('Batcher 컨트랙트 배포 필요');
      this.#myBatcherContract = new this.caver.klay.Contract(this.#BatcherAbi);
    }

    this.UserServiceInterface = new UserInterface();
  }

  setMyErc20Contract(erc20Addr) {
    try {
      this.#Erc20Address = erc20Addr;
      this.#myErc20Contract = new this.caver.klay.Contract(
        this.#Erc20Abi,
        erc20Addr,
        {
          from: this.#server.address, // server Addr
        }
      );
      return true;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  setMyErc721Contract(erc721Addr) {
    try {
      this.#Erc721Address = erc721Addr;
      this.#myErc721Contract = new this.caver.klay.Contract(
        this.#Erc721Abi,
        erc721Addr,
        {
          from: this.#server.address, // server Addr
        }
      );
      return true;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  setMyCollaboContract(collaboAddr) {
    try {
      this.#CollaboAddress = collaboAddr;
      this.#myCollaboContract = new this.caver.klay.Contract(
        this.#CollaboAbi,
        collaboAddr,
        {
          from: this.#server.address,
        }
      );
      return true;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  setMyBatcherContract(batcherAddr) {
    try {
      this.#BatcherAddress = batcherAddr;
      this.#myBatcherContract = new this.caver.klay.Contract(
        this.#BatcherAbi,
        batcherAddr,
        {
          from: this.#server.address,
        }
      );
      return true;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  async getServerKlay() {
    try {
      var balance = await this.caver.klay.getBalance(this.#server.address);
      balance = (Number(balance) / 1000000000000000000).toString();
      return balance;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  async deployErc20() {
    try {
      if (process.env.ERC20_ADDRESS != '') {
        throw Error('ERC20 contract already deployed');
      }

      let payload = { data: this.#Erc20Bytecode };
      let parameter = {
        from: this.#server.address,
        gas: 20000000,
        value: 0,
      };
      var _transactionHash;
      const { _address } = await this.#myErc20Contract
        .deploy(payload)
        .send(parameter, (err, transactionHash) => {
          if (err) {
            throw Error(err.toString());
          }
          _transactionHash = transactionHash;
        });

      if (!this.setMyErc20Contract(_address)) {
        throw Error(err.toString());
      }

      return {
        ERC20ContractAddress: _address,
        ERC20ContractTxHash: _transactionHash,
      };
    } catch (err) {
      console.log('ERC20: \n', err);
      throw Error(err.toString());
    }
  }

  async deployErc721() {
    try {
      if (process.env.ERC721_ADDRESS != '') {
        throw Error('ERC721 contract already deployed');
      }

      let payload = { data: this.#Erc721Bytecode };
      let parameter = {
        from: this.#server.address,
        gas: 20000000,
        value: 0,
      };
      var _transactionHash;
      const { _address } = await this.#myErc721Contract
        .deploy(payload)
        .send(parameter, (err, transactionHash) => {
          if (err) {
            throw Error(err.toString());
          }
          _transactionHash = transactionHash;
        });

      if (!this.setMyErc721Contract(_address)) {
        throw Error('setMyErc721Contract: \n', err.toString());
      }

      await this.#myErc721Contract.methods
        .setToken(this.#Erc20Address)
        .send({
          from: this.#server.address,
          to: this.#Erc721Address,
          gas: 2000000,
        });

      return {
        ERC721ContractAddress: _address,
        ERC721ContractTxHash: _transactionHash,
      };
    } catch (err) {
      console.log('ERC721: \n', err);
      throw Error(err.toString());
    }
  }

  async deployCollabo() {
    if (process.env.COLLABO_ADDRESS != '') {
      throw Error('COLLABORATION contract already deployed');
    }
    let payload = {
      data: this.#CollaboBytecode,
      arguments: [this.#Erc20Address],
    };
    let parameter = {
      from: this.#server.address,
      gas: 20000000,
      value: 0,
    };
    var _transactionHash;

    const { _address } = await this.#myCollaboContract
      .deploy(payload)
      .send(parameter, (err, transactionHash) => {
        if (err) {
          throw Error(err.toString);
        }
        _transactionHash = transactionHash;
      });

    if (!this.setMyCollaboContract(_address)) {
      throw Error('setMyCollaboContract: \n', err.toString());
    }

    return {
      CollaboContractAddress: _address,
      CollaboContractTxHash: _transactionHash,
    };
  }

  async deployBatcher() {
    try {
      if (process.env.BATCHER_ADDRESS != '') {
        throw Error('BATCHER contract already deployed');
      }
      // batcher contract deploy
      let payload = {
        data: this.#BatcherBytecode,
        arguments: [
          this.#Erc20Address,
          this.#Erc721Address,
          this.#CollaboAddress,
        ],
      };
      let parameter = {
        from: this.#server.address,
        gas: 20000000,
        value: 0,
      };
      var _transactionHash;

      const { _address } = await this.#myBatcherContract
        .deploy(payload)
        .send(parameter, (err, transactionHash) => {
          if (err) {
            throw Error(err.toString());
          }
          _transactionHash = transactionHash;
        });

      // change contract owner
      const receipt721 = await this.#myErc721Contract.methods
        .transferOwnership(_address)
        .send({
          from: this.#server.address,
          to: this.#Erc721Address,
          gas: 2000000,
        });

      if (!this.setMyBatcherContract(_address)) {
        throw Error(err.toString());
      }

      return {
        BatcherContractAddress: _address,
        BatcherContractTxHash: _transactionHash,
      };
    } catch (err) {
      console.log('Batcher: \n', err);
      throw Error(err.toString());
    }
  }

  async getTokenBalance(user_id) {
    try {
      const user = await this.UserServiceInterface.getOneUser(user_id); // id가 아니라 user_id 통해서 검색하는 걸로 바뀜.
      const db_balance = user.balance;
      const user_address = user.address;
      const db_donation_balance = user.donation_balance;
      const chain_balance = this.caver.utils.fromPeb(
        await this.#myErc20Contract.methods.balanceOf(user.address).call(),
        'KLAY'
      );
      const chain_allowance = this.caver.utils.fromPeb(
        await this.#myErc20Contract.methods
          .allowance(user.address, this.#server.address)
          .call(),
        'KLAY'
      );

      var exchangable_balance;
      if (await isBigger(db_balance, chain_balance)) {
        // true면 chain_balance가 더 큼
        exchangable_balance = db_balance;
      } else {
        exchangable_balance = chain_balance;
      }

      return {
        user_address,
        db_balance,
        db_donation_balance,
        chain_balance,
        chain_allowance,
        exchangable_balance,
      };
    } catch (err) {
      console.log(err);
      throw Error(err.toString());
    }
  }

  async getNftBalance(user_id) {
    // 유저가 갖고 있는 NFT의 개수 반환
    try {
      const user = await this.UserServiceInterface.getOneUser(user_id);
      const balance = await this.#myErc721Contract.methods
        .balanceOf(user.address)
        .call();
      return { balance };
    } catch (err) {
      console.log(err);
      throw Error(err.toString());
    }
  }
}

export default KlaytnService;
