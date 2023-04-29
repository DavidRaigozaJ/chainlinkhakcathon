import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, expect } from "chai";
import { SimpleStorage } from "../typechain-types";

describe.only("SimpleStorage Unit Test", function (){

    // fixtures

    async function deploySimpleStorageFixture(){
    
        const _message = "hello something";
        const [owner, otherAccount] = await ethers.getSigners();
        const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        const simpleStorage = await SimpleStorageFactory.connect(owner).deploy(_message);



        return { simpleStorage, _message, owner, otherAccount }
    }
    
    it("Sould test deployment stuff", async function(){
        const {simpleStorage, _message, owner } = await loadFixture(deploySimpleStorageFixture);
       
        const message = await simpleStorage.message();

        console.log("My message:", message);

        assert(message === _message, "Messages are not the same");

        const currentOwner = await simpleStorage.owner();

        assert(currentOwner === owner.address, "Owner not set properly");     

    });

    describe(" setMessage", async function() {
        let simpleStorageContract: SimpleStorage;
        let user;

        beforeEach(async function () {
            const {simpleStorage, otherAccount, owner } = await loadFixture(deploySimpleStorageFixture);
            
            simpleStorageContract = simpleStorage;
            user = otherAccount
           
        })

        it("should be called only by an owner", async function () {
          //  const { simpleStorage, otherAccount } = await loadFixture(deploySimpleStorageFixture);
            
            await expect(
                simpleStorageContract
                // .connect(otherAccount)
                .setMessage("hello world"))
                .to.be.revertedWith("Error Only Owner!");
        })

        it.only("should set new message", async function () {
            // const { simpleStorage, otherAccount, owner } = await loadFixture(deploySimpleStorageFixture);

            const newMessage = "Chainlink Springhackagton";

            await simpleStorageContract.setMessage(newMessage);

            const actualMessage =await simpleStorageContract.message();
            assert(actualMessage == newMessage, "Message not set")
        })

             it("should emit newMessage event", async function () {
            const { simpleStorage, otherAccount, owner } = await loadFixture(deploySimpleStorageFixture);
            
            const newMessage = "This is fun!";

            await expect(
                simpleStorage
                .connect(owner)
                .setMessage(newMessage))
                .to.emit(simpleStorage, "NewMessage")
                .withArgs(newMessage);


        })


    })
})