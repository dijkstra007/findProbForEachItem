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
        it('test haveWildFace true',function(){
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            let winLines = [[1,2,3]]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:winLines,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier,WILD_NUMBER:2})
            slot.haveWildFace().should.eql(true)  
        })
        it('test haveWildFace false',function(){
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            let winLines = [[1,2,3]]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:winLines,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            slot.haveWildFace().should.eql(false)  
        })
})
