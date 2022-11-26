import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect,assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage } from "../typechain-types";

describe("Simple Storage Unit Tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySimpleStorageFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, alice] = await ethers.getSigners();

    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage : SimpleStorage = await simpleStorageFactory.deploy("Harahat Workshop");

    return {simpleStorage,owner,alice};
  }
  
  describe("Deployment", async () => {
    it("should set message to Hardhat Workshop",async () => {
      const {simpleStorage} = await loadFixture(deploySimpleStorageFixture);

      const expectedMessage = "Harahat Workshop";
      const actualMessage = await simpleStorage.getMessage();
      
      assert(expectedMessage === actualMessage , "Msg data is not same");

    })
  })


  describe("#setMessage", async() => {
    describe("failure", async () => {
      it("should revert if caller is not an owner", async () => {
        const {alice,simpleStorage} = await loadFixture(deploySimpleStorageFixture);

        await expect(simpleStorage.connect(alice).setMessage("Harthat WorkshopNew Message")).to.be.revertedWith("Caller is not an owner");
      }),

      it("should revert if empty string is provider", async () => {
        const {owner,simpleStorage} = await loadFixture(deploySimpleStorageFixture);

        await expect(simpleStorage.connect(owner).setMessage("")).to.be.revertedWith("Empty string not allowed");
      })
    })

    describe("success", async () => {
      it("should update the message variable",async() => {
        const {owner,simpleStorage} = await loadFixture(deploySimpleStorageFixture);

        const newMeaage = "Harthat WorkshopNew Message";
        await simpleStorage.connect(owner).setMessage(newMeaage)

        const actualMessage = await simpleStorage.getMessage();

        assert(actualMessage === newMeaage,"Message not set");
      }),

      it("should emit MessageChanged event",async() => {
        const {owner,simpleStorage} = await loadFixture(deploySimpleStorageFixture);

        const newMeaage = "Harthat Workshop NewMessage From Event";
        // await expect(simpleStorage.connect(owner).setMessage(newMeaage)).to.emit(simpleStorage,"MessageChanged").withArgs("Harthat Workshop NewMessage")
        await expect(simpleStorage.connect(owner).setMessage(newMeaage)).to.emit(simpleStorage,"MessageChanged").withArgs(newMeaage)
      })
    })
  })
  
});
