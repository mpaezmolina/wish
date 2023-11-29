import web3 from "./web3";
import RisaToken from "../bin/ethereum/contracts/RisaToken.json";

const instance = new web3.eth.Contract(
  RisaToken.abi,
  "0xd717dfF9d9fB78CF4e3a4CB1635Fa95dc877267d"
);

export default instance;
