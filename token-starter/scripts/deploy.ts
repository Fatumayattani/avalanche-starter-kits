import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("StarterToken");
  const token = await Token.deploy();

  await token.waitForDeployment();

  console.log("Deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});