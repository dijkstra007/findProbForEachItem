let Chance = require('chance')
let chance = new Chance()
class PlaySlot{
    constructor(slot){
        if(slot){
            this.slot = slot
            this.cntWin = 0
            this.hit = Array(this.slot.NUMBER_OF_WINLINE+1).fill(0)
        }
    }
    initTable(row,col){
        return Array(row*col).fill(0)
    }
    play(faceList,probList){
        let table = this.initTable(this.slot.NUMBER_OF_ROW,this.slot.NUMBER_OF_COL)
        let winLines = this.transformWinLine(this.slot.WIN_LINE)
        let rewardTable = this.slot.getRewardTableFromMultiplierTable(this.slot.MULTIPLIER_TABLE,this.slot.MIN_BET_PER_LINE)
        let sumReward = 0
        for(let i=0;i<table.length;i++){
            table[i] = chance.weighted(faceList,probList)
        
        }
        //
        let [reward,lineWinList] = this.isWin(table,winLines,rewardTable)
        if(reward!=0){
            let numberOfHit = lineWinList.length
            sumReward+=reward
            this.hit[numberOfHit] += 1
            // console.log(lineWinList)
            //  console.log("-------------------------->               "+cntWin+ " reward: "+reward)
        //    this.printTable(table,this.slot.NUMBER_OF_COL)
            this.cntWin++
        //    console.log("-------------------------------->   "+this.cntWin)
            // console.log(reward)
        }
        return reward
        
    }
    transformWinLine(winLines){
        let newArr = []
        for(let line of winLines){
            let temp = []
            for(let i=0;i<line.length;i++)
                temp.push(line[i]-1)
            newArr.push(temp)
        }
        return newArr
    }
    isWin(table,winLines,rewardTable){
        let cnt_win = 0
        let isHit = true
        let reward = 0
        let lineNumber = 1
        let lineWinList = []
        let fourFaceMultiplier = this.slot.FOUR_FACE_MULTIPLIER
        let fiveFaceMultiplier = this.slot.FIVE_FACE_MULTIPLIER

        for(let indexOfWinLines = 0 ; indexOfWinLines<winLines.length; indexOfWinLines++){
                let eachLine = winLines[indexOfWinLines]
                let firstItem = table[eachLine[0]]
                let cntHit = 0
                isHit = true
                for(let i=0;i<eachLine.length;i++){
                    if(cntHit<3 && table[eachLine[i]]!=firstItem)
                        isHit = false
                    else if(cntHit>=3 && table[eachLine[i]]!=firstItem)
                        break;
                    else if(table[eachLine[i]]==firstItem)
                        cntHit++
                }
                if(isHit){
                    if(cntHit==3)
                        reward += rewardTable[firstItem]
                    else if(cntHit==4)
                        reward += rewardTable[firstItem]*fourFaceMultiplier[firstItem]
                    else if(cntHit==5)
                        reward += rewardTable[firstItem]*fiveFaceMultiplier[firstItem]
                        
                    cnt_win++
                    lineWinList.push(lineNumber)
                    
                }
                lineNumber++
        }
        if(cnt_win==0)
            return [0,[]]
        else
            return [reward,lineWinList]
    }
    printTable(table,col){
        let arr = Array.from(table)
        let newArr = []
        while(arr.length)
            newArr.push(arr.splice(0,col))
        for(let eachRow of newArr)
            console.log(eachRow)
        return newArr
    }
    printHitSummary(){
        let sum = 0
        for(let i=1;i<this.hit.length;i++){
            sum += this.hit[i]
        }
        for(let i=1;i<this.hit.length;i++){
            console.log("HIT: "+i+"LINE = "+this.hit[i]/sum*100+" %")
        }
    }
}

module.exports = PlaySlot
