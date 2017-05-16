let should = require('should')
let PlaySlot = require('../src/PlaySlot')
let Slot = require('../src/Slot')
describe("PlaySlot class",function(){
        it('test initTable',function(){
            let playSlot = new PlaySlot()
            let target = [0,0,0,0,0,0,0,0,0]
            playSlot.initTable(3,3).should.eql(target)
        })
        it('test printTable',function(){
            let playSlot = new PlaySlot()
            let table = [1,2,3,4,5,6,7,8,9]
            let target = [[1,2,3],[4,5,6],[7,8,9]]
            playSlot.printTable(table,3).should.eql(target)
        })
        it('test transformWinLine',function(){
            let playSlot = new PlaySlot()
            let winLines = [[1,2,3],[4,5,6],[7,8,9]]
            let target = [[0,1,2],[3,4,5],[6,7,8]]
            playSlot.transformWinLine(winLines).should.eql(target)
        })
        it('test isWin case#1',function(){
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:[[1,2,3],[4,5,6],[7,8,9]],MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            
            let playSlot = new PlaySlot(slot)
            let table = [1,1,1,2,2,2,3,3,3]
            let rewardTable = [0,50,100,200]
            let winLines = playSlot.transformWinLine([[1,2,3],[4,5,6],[7,8,9]])
            let target = [350,[1,2,3]]
            playSlot.isWin(table,winLines,rewardTable).should.eql(target)
        })
        it('test isWin case#2',function(){
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:[[1,2,3],[4,5,6],[7,8,9]],MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            
            let playSlot = new PlaySlot(slot)
            
            let table = [1,1,1,2,2,2,3,2,3]
            let rewardTable = [0,50,100,200]
            let winLines = playSlot.transformWinLine([[1,2,3],[4,5,6],[7,8,9]])
            let target = [150,[1,2]]
            playSlot.isWin(table,winLines,rewardTable).should.eql(target)
        })
        it('test isWin case#3',function(){
            
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            
            let rewardTable = [0,50,100,200]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:[[1,2,3],[4,5,6],[7,8,9]],MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            let playSlot = new PlaySlot(slot)
            let table = [1,1,1,2,3,2,3,3,3]
            let winLines = playSlot.transformWinLine([[1,2,3],[4,5,6],[7,8,9]])
            let target = [250,[1,3]]
            playSlot.isWin(table,winLines,rewardTable).should.eql(target)
        })
        it('test isWin case#4',function(){ //1*5
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            let winLines = [[1,2,3,4,5]]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:5,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:winLines,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            let rewardTable = slot.getRewardTableFromMultiplierTable(multiplierTable,slot.MIN_BET_PER_LINE)
            let playSlot = new PlaySlot(slot)
            let table = [1,1,1,1,1,3,2,1,1,2,3,3,2,1,3]
            let target = [1000,[1]]
            
            playSlot.isWin(table,[[0,1,2,3,4]],rewardTable).should.eql(target)
        })
        it('test isWin case#5',function(){//2*4
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            let winLines = [[1,2,3,4,5],[6,7,8,9,10]]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:5,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:winLines,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            let rewardTable = slot.getRewardTableFromMultiplierTable(multiplierTable,slot.MIN_BET_PER_LINE)
            let playSlot = new PlaySlot(slot)
            let table = [1,2,3,1,2,2,2,2,2,3,3,3,1,2,3]
            let target = [200,[2]]
            
            playSlot.isWin(table,[[0,1,2,3,4],[5,6,7,8,9]],rewardTable).should.eql(target)
        })
        it('test isWin case#6',function(){//3*5
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            let winLines = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:5,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:winLines,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            let rewardTable = slot.getRewardTableFromMultiplierTable(multiplierTable,slot.MIN_BET_PER_LINE)
            let playSlot = new PlaySlot(slot)
            let table = [1,2,3,1,2,1,3,1,2,3,3,3,3,3,3]
            let target = [1500,[3]]
            
            playSlot.isWin(table,[[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14]],rewardTable).should.eql(target)
        })
        it('test isWin case#7',function(){//1*3,2*4,3*5
            let multiplierTable = [0,5,5,10]
            let fourFaceMultiplier = [0,4,4,5]
            let fiveFaceMultiplier = [0,20,20,15]
            let winLines = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]
            let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:5,NUMBER_OF_FACE:3,MIN_BET_PER_LINE:10,WIN_LINE:winLines,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
            let rewardTable = slot.getRewardTableFromMultiplierTable(multiplierTable,slot.MIN_BET_PER_LINE)
            let playSlot = new PlaySlot(slot)
            let table = [1,1,1,2,1,2,2,2,2,3,3,3,3,3,3]
            let target = [1750,[1,2,3]]
            
            playSlot.isWin(table,[[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14]],rewardTable).should.eql(target)
        })
})
