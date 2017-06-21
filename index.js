let Slot = require('./src/Slot')
let PlaySlot = require('./src/PlaySlot')
function normalize(arr){
    let sumValue = arr.reduce(function(a,b){
        return a+b
    },0)
    arr.forEach((value,index,arr) => arr[index]=value/sumValue)
    return arr
}


let winLine = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
let multiplierTable = [0,5,10,20,50,100,200,500,1000]
let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:8,MIN_BET_PER_LINE:50,WIN_LINE:winLine,MULTIPLIER_TABLE:multiplierTable})
let playSlot = new PlaySlot(slot)
let probList = normalize([334,500,450,400,100,80,60,50])
let faceList = slot.getFaceList()
const NUMBER_OF_TURN = 10000
const OUT_SIDE_LOOP_LIMIT = 10
let totalMoneyPay = slot.MIN_BET_PER_LINE*NUMBER_OF_TURN*slot.NUMBER_OF_WINLINE
let sumReturnRate = 0
let sumPercenToWin = 0
for(let i=1;i<=OUT_SIDE_LOOP_LIMIT;i++){
    let cntWin = 0
    let sumReward = 0
    for(let playTime = 1; playTime<=NUMBER_OF_TURN;playTime++){
        let reward = playSlot.play(faceList,probList)
        sumReward +=reward
        if(reward!=0){
            cntWin++
        }
    }
    let percentToWin = cntWin/NUMBER_OF_TURN*100
    let returnRate = sumReward/totalMoneyPay*100
    // console.log("Percent to win: "+percentToWin)
    // console.log("Return rate: "+returnRate)
    sumPercenToWin+=percentToWin
    sumReturnRate+=returnRate
}
console.log("AVG percent to win: "+sumPercenToWin/OUT_SIDE_LOOP_LIMIT)
console.log("AVG returnRate: "+sumReturnRate/OUT_SIDE_LOOP_LIMIT)
// playSlot.printHitSummary()
console.log(probList)
