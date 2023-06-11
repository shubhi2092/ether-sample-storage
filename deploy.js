
const ethers = require("ethers");
const fs = require("fs-extra");
require('dotenv').config();
async function main() {

    const provider = new ethers.providers.StaticJsonRpcProvider(process.env.RPC_URL);
    //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const encryptedJson = fs.readFileSync("./.encryptkey.json", "utf8");
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
    wallet = await wallet.connect(provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    const contract = await contractFactory.deploy();
    // console.log(contract);
    await contract.deployTransaction.wait(1);
    console.log(`contract address ${contract.address}`)
    const currentFavNumber = await contract.retrive();
    console.log(`current fav number : ${currentFavNumber.toString()}`);
    const transactionResponse = await contract.store("7");
    const transactionRecipt = await transactionResponse.wait(1);
    const updateFavNum = await contract.retrive();
    console.log(`the updated fav number is : ${updateFavNum.toString()}`);

    // console.log("lets deploy this contract with transaction data");
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //    nonce: nonce,
    //    gasPrice: 20000000000,
    //    gasLimit: 6721975,
    //    to: null,
    //   value: 0,

    //   chainId: 1337,
    //  };
    // const sentTxtResponse = await wallet.sendTransaction(tx);
    // await sentTxtResponse.wait(1);
    //console.log(sentTxtResponse);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });