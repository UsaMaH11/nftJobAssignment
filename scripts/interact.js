// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.myTokenAddress;
const { ethers } = require("hardhat");
const hre = require("hardhat");

const contract = require("../artifacts/contracts/MyToken.sol/Mytoken.json");

//provider -> gives read access to the blockchain -> like alchemy

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
);

//signer  -> is an agent who interact with the blockchian , this requires gas cost etc

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract

const myTokenContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  console.log("Querying token name...");
  const name = await myTokenContract.name();
  console.log(`Token Name: ${name}\n`);

  // decimals()
  console.log("Querying decimals...");
  const decimals = await myTokenContract.decimals();
  console.log(`Token Decimals: ${decimals}\n`);

  // totalSupply()
  console.log("Querying token supply...");
  const totalSupply = await myTokenContract.totalSupply();
  console.log(`Total Supply including all decimals: ${totalSupply}`);
  console.log(
    `Total supply including all decimals comma separated: ${ethers.utils.commify(
      totalSupply
    )}`
  );
  console.log(
    `Total Supply in FUN: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`
  );

  // balanceOf(address account)
  //   console.log("Getting the balance of contract owner...");
  //   const signers = await ethers.getSigners();
  //   const ownerAddress = signers[0].address;
  //   let ownerBalance = await myTokenContract.balanceOf(ownerAddress);
  //   console.log(
  //     `Contract owner at ${ownerAddress} has a ${symbol} balance of ${ethers.utils.formatUnits(
  //       ownerBalance,
  //       decimals
  //     )}\n`
  //   );

  // approve(address spender, uint256 amount)
  //   console.log(
  //     `Setting allowance amount of spender over the caller\'s ${symbol} tokens...`
  //   );
  const ownerAddress = "0x96e3B62c16953ae95E908B177101b9ad9D746414";
  const approveAmount = 100;
  console.log(
    `This example allows the contractOwner to spend up to ${approveAmount} of the recipient\``
  ); // Creates a new instance of the contract connected to the recipient
  await myTokenContract.approve(
    ownerAddress,
    ethers.utils.parseUnits(approveAmount.toString(), decimals)
  );
  console.log(`Spending approved\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
