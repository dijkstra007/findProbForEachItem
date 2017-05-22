let Slot = require('./src/Slot')
let PlaySlot = require('./src/PlaySlot')
function normalize(arr){
    let sumValue = arr.reduce(function(a,b){
        return a+b
    },0)
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i]/sumValue
    }
    return arr
}

let winLine = [
        [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [6,2,3,4,5],
    [11,7,8,9,10],
    [1,7,8,9,10],
    [6,12,13,14,15],
    [1,2,3,4,10],
    [6,7,8,9,15],
    [6,7,8,9,5],
    [11,12,13,14,10],
    [1,7,3,4,5],
    [6,12,8,9,10],
    [6,2,8,9,10],
    [11,7,13,14,15],
    [1,2,3,9,5],
    [6,7,8,14,10],
    [6,7,8,4,10],
    [11,12,13,9,15],
    [1,2,8,4,5]
]
let multiplierTable = [0,5,5,10,10,20,20,50,100,200,500,1000]
let fourFaceMultiplier = [0,4,4,5,5,4,4,3,2,2,2,2]
let fiveFaceMultiplier = [0,20,20,15,15,10,10,6,5,5,4,5]
let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:5,NUMBER_OF_FACE:11,MIN_BET_PER_LINE:10,WIN_LINE:winLine,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier,WILD_NUMBER:5})
// let probList = normalize([3,2,1.9,1,1,4.1,1.6,1.8,1,1,0.2])
let probList = normalize([4.3,4.7,3,1,0.7,4.1,1.6,1.8,1,1,0.2])
let faceList = slot.getFaceList()
const NUMBER_OF_TURN = 10000
const OUT_SIDE_LOOP_LIMIT = 1
let sumReturnRate = 0
let sumPercenToWin = 0


for(let i=1;i<=OUT_SIDE_LOOP_LIMIT;i++){
    let cntWin = 0
    let sumReward = 0
    let playSlot = new PlaySlot(slot)
    let totalMoneyPay = slot.MIN_BET_PER_LINE*NUMBER_OF_TURN*slot.NUMBER_OF_WINLINE

    for(let playTime = 1; playTime<=NUMBER_OF_TURN;playTime++){
        let reward = playSlot.play(faceList,probList)
        sumReward +=reward
        if(reward!=0){
            cntWin++
        }
    }
    totalMoneyPay -= playSlot.freeSpin*slot.MIN_BET_PER_LINE*slot.NUMBER_OF_WINLINE
    let percentToWin = cntWin/NUMBER_OF_TURN*100
    let returnRate = sumReward/totalMoneyPay*100
    // console.log("Percent to win: "+percentToWin)
    // console.log("Return rate: "+returnRate)
    sumPercenToWin+=percentToWin
    sumReturnRate+=returnRate
}
// console.log("ProbList : ")
// for(let i=0;i<probList.length;i++)
//     console.log(probList[i])
console.log("AVG percent to win: "+sumPercenToWin/OUT_SIDE_LOOP_LIMIT)
console.log("AVG percent of returnRate: "+sumReturnRate/OUT_SIDE_LOOP_LIMIT)
// playSlot.printHitSummary()
console.log(probList)
