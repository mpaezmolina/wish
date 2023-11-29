import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import Game from "../bin/ethereum/contracts/Game.json" assert { type: "json" };

class EthConfig {
  static WEB3;
  static MAIN_ACCOUNT;
  static GAME_CONTRACT;
  static ACCOUNTS;

  static MNEMONIC_STR =
    "habit staff near captain before expand pretty feed ginger crouch amazing cost";
  static GAME_CONTRACT_ADDRESS_STR = "0x8167Ed652b32175C84304B184f844A930E68CBF5";
  static PROVIDER_URL_STR = "https://goerli.infura.io/v3/209cc5cc0d1e4264a0aa1b95a7be42e2";

  //static TEST_MNEMONIC_STR = this.MNEMONIC_STR;
  //static TEST_GAME_CONTRACT_ADDRESS_STR = this.GAME_CONTRACT_ADDRESS_STR;
  static TEST_PROVIDER_URL_STR = this.PROVIDER_URL_STR;

  static async initMetaMask() {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // We are in the browser and metamask is running.
      window.ethereum.request({ method: "eth_requestAccounts" });
      WEB3 = new Web3(window.ethereum);
    }
  }

  static async initWallet() {
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: this.MNEMONIC_STR,
      },
      providerOrUrl: this.PROVIDER_URL_STR,
    });

    this.WEB3 = new Web3(provider);
    this.GAME_CONTRACT = new this.WEB3.eth.Contract(Game.abi, this.GAME_CONTRACT_ADDRESS_STR);
    this.ACCOUNTS = await this.WEB3.eth.getAccounts();
    this.MAIN_ACCOUNT = this.ACCOUNTS[0];

    this.printInitData();
  }

  static async initTestMode() {
    this.WEB3 = new Web3("http://127.0.0.1:7545");

    this.WEB3.eth.net
      .isListening()
      .then(() => console.log("Connected to Ganache"))
      .catch((err) => console.error("Error connecting to Ganache:", err));

    this.ACCOUNTS = await this.WEB3.eth.getAccounts();
    this.MAIN_ACCOUNT = this.ACCOUNTS[0];

    this.GAME_CONTRACT = await new this.WEB3.eth.Contract(Game.abi)
      .deploy({ data: Game.bytecode })
      .send({ from: this.MAIN_ACCOUNT, gas: "6400000" });

    this.printInitData();
  }

  static async printInitData() {
    console.log("Web3 Initialization");
    console.log("MAIN_ACCOUNT: " + this.MAIN_ACCOUNT);
    console.log("GAME_CONTRACT: " + this.GAME_CONTRACT.options.address);
  }
}

export { EthConfig };
