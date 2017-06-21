let Chance = require('chance')
let chance = new Chance()
class PlaySlot{
    constructor(slot){
        if(slot){
            this.slot = slot
            this.cntWin = 0
            this.hit = Array(this.slot.NUMBER_OF_WINLINE+1).fill(0)
            this.freeSpin = 0
            this.mapHitLineToItem = {}
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
        let [reward,lineWinList] = this.isWin(table,winLines,rewardTable)
        
        if(reward!=0){
            let numberOfHit = lineWinList.length
            sumReward+=reward
            this.hit[numberOfHit] += 1
            // console.log(lineWinList)
            //  console.log("-------------------------->               "+cntWin+ " reward: "+reward)
            // this.printTable(table,this.slot.NUMBER_OF_COL)
            this.cntWin++
            //   console.log("-------------------------------->   "+this.cntWin)
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
    isTableHitWinLine(table,eachLine){
        let firstItem = table[eachLine[0]]
        let cntHit = 0
        let isHit = true
        for(let i=0;i<eachLine.length;i++){
                        let tableIndex = eachLine[i]
                        let item = table[tableIndex]
                        if(this.slot.haveWildFace()==false){
                            if(cntHit<3 && item!=firstItem)
                                isHit = false
                            else if(cntHit>=3 && item!=firstItem)
                                break;
                            else if(item==firstItem)
                                cntHit++
                        }else{
                            if(isHit && (item == firstItem || item == this.slot.WILD_NUMBER) ){
                                cntHit++
                            }
                            else if(cntHit >= 3 && !(item == firstItem || item==this.slot.WILD_NUMBER)  ){
                                break;
                            }
                            else if(cntHit < 3 && !(item == firstItem || item==this.slot.WILD_NUMBER)  ){
                                isHit = false
                                break;
                            }
                        }
        }
        if(isHit){
                if(this.isItemHitThePreviousWinLine(firstItem,eachLine,cntHit,this.mapHitLineToItem)){
                    return [false,0];
                }
        }
        return [isHit,cntHit];
    }
    calculateReward(firstItem,cntHit,rewardTable,fourFaceMultiplier,fiveFaceMultiplier){

        if(cntHit==3)
            return  rewardTable[firstItem];
        else if(cntHit==4)
            return  rewardTable[firstItem]*fourFaceMultiplier[firstItem];
        else if(cntHit==5)
            return rewardTable[firstItem]*fiveFaceMultiplier[firstItem];
                    
    }
    isWin(table,winLinesBaseOnArrayIndex,rewardTable){
        let winLines = winLinesBaseOnArrayIndex
        let cnt_win = 0
        let reward = 0
        let lineNumber = 1
        let lineWinList = []
        for(let indexOfWinLines = 0 ; indexOfWinLines<winLines.length; indexOfWinLines++){
                let eachLine = winLines[indexOfWinLines];
                let firstItem = table[eachLine[0]];
                let cntHit = 0;
                let isHit = true;
                [isHit,cntHit] = this.isTableHitWinLine(table,eachLine)
                if(isHit){
                    
                    reward += this.calculateReward(firstItem,cntHit,rewardTable,this.slot.FOUR_FACE_MULTIPLIER,this.slot.FIVE_FACE_MULTIPLIER)
                    if(this.slot.haveFeverFace() && this.isGetFreeSpin(firstItem,this.slot.FEVER_NUMBER)){
                        this.freeSpin+=this.slot.FREE_SPIN_ADDER
                    }

                    cnt_win++;
                    lineWinList.push(lineNumber);
                    
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
    isThisLineAllWild(table,aWinLine,wildNum){
        for(let i=0;i<aWinLine.length;i++){
            let tableIndex = aWinLine[i]
            if(table[tableIndex]!=wildNum)
                return false
        }
        return true
    }
    getFirstItemThatIsNotWildItem(table,aWinLine,wildNum){
        for(let i=0;i<aWinLine.length;i++){
            let tableIndex = aWinLine[i]
            if(table[tableIndex]!=wildNum)
                return table[tableIndex]
        }
        return wildNum
    }
    isGetFreeSpin(firstItem,feverNum){
        return (firstItem==feverNum)
    }
    isItemHitThePreviousWinLine(faceNum,line,cntHit,mapHitLineToItem){
        let key = []
        for(let i=0 ; i<cntHit ; i++){
            key.push(line[i])
        }
        if(mapHitLineToItem[key] == faceNum){
            return true;
        }
        else{
            this.mapHitLineToItem[key] = faceNum;
            return false;
        }
    }
}

module.exports = PlaySlot
