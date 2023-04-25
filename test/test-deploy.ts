import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
    let SimpleStorageFactory: SimpleStorage__factory
    let SimpleStorage: SimpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        SimpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const txResponse = await SimpleStorage.store(expectedValue)
        await txResponse.wait(1)

        const currentValue = await SimpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
