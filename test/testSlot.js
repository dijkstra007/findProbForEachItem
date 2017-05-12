let should = require('should')
let Slot = require('../src/Slot')
describe("Slot class",function(){
        it('test getRewardTableFromMultiplierTable',function(){
            let multiplierTable = [0,50,50,100]
            let money = 50
            let target = [0,2500,2500,5000]
            let slot = new Slot()
            slot.getRewardTableFromMultiplierTable(multiplierTable,money).should.eql(target)
        })
})
