const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.myTokenAddress;
const Nft_Token_Address = process.env.nftTokenAddress;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const { ethers } = require("hardhat");
const hre = require("hardhat");

const contract = require("../artifacts/contracts/NftToken.sol/MyNfttoken.json");

//provider -> gives read access to the blockchain -> like alchemy

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
);

//signer  -> is an agent who interact with the blockchian , this requires gas cost etc

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract

// const contractAddress = "";
// const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const nftContract = new ethers.Contract(
  Nft_Token_Address,
  contract.abi,
  signer
);

async function mintNFT(tokenURI) {
  console.log("Querying token supply...");
  // const totalSupply = await nftContract.rate();
  const totalSupply = await nftContract.rate();
  console.log(
    `Total supply including all decimals comma separated: ${ethers.utils.commify(
      totalSupply
    )}`
  );
  const nonce = await alchemyProvider.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  console.log(nonce); //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: Nft_Token_Address,
    nonce: nonce,
    gas: 500000,
    gasLimit: 250000,
    data: nftContract.safeMint(tokenURI),
  };

  const signPromise = signer.signTransaction(tx);
  signPromise
    .then((signedTx) => {
      signer.sendTransaction(signedTx, function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      });
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT(
  "https://gateway.pinata.cloud/ipfs/Qmck8PKNRSABLiZAtVHd9HevJwbf4oB5qjgABTZKCWeuS8"
);
