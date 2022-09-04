// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Getting the fun token contract...");
  const contractAddress = "0xA13cF26228e500852679142d21b21f3c658e257e";
  const funToken = await ethers.getContractAt("MyToken", contractAddress);

  console.log("Querying token name...");
  const name = await funToken.name();
  console.log(`Token Name: ${name}\n`);

  // decimals()
  console.log("Querying decimals...");
  const decimals = await funToken.decimals();
  console.log(`Token Decimals: ${decimals}\n`);

  // totalSupply()
  console.log("Querying token supply...");
  const totalSupply = await funToken.totalSupply();
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
  //   let ownerBalance = await funToken.balanceOf(ownerAddress);
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
  const ownerAddress = "0xc967dd4037062D79d8D4DBD7e7580407144d2595";
  const approveAmount = 100;
  console.log(
    `This example allows the contractOwner to spend up to ${approveAmount} of the recipient\``
  );
  const signerContract = funToken.connect(signers[]); // Creates a new instance of the contract connected to the recipient
  await signerContract.approve(
    ownerAddress,
    ethers.utils.parseUnits(approveAmount.toString(), decimals)
  );
  console.log(`Spending approved\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
