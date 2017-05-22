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
      [16,17,18,19,20],
      [1,2,8,4,5],
      [6,7,13,9,10],
      [11,12,18,14,15],
      [6,7,3,9,10],
      [11,12,8,14,15],
      [16,17,13,19,20],
      ///////////////////////////////////////  1
      [1,7,8,9,5],
      [6,12,13,14,10],
      [11,17,18,19,15],
      [6,2,3,4,10],
      [11,7,8,9,15],
      [16,12,13,14,20],
      [1,7,3,9,5],
      [6,12,8,14,10],
      [11,17,13,19,15],
      [6,2,8,4,10],
      /////////////////////////////////////////  2
      [11,7,13,9,15],
      [16,12,18,14,20],
      [1,7,13,9,5],
      [6,12,18,14,10],
      [16,12,8,14,20],
      [11,7,3,9,15],
      [6,2,3,4,5],
      [11,7,8,9,10],
      [16,12,13,14,15],
      [1,2,3,4,10],
      /////////////////////////////////////////  3
      [6,7,8,9,15],
      [11,12,13,14,20],
      [1,2,8,9,10],
      [6,7,13,14,15],
      [11,12,18,19,20],
      [6,7,8,4,5],
      [11,12,13,9,10],
      [16,17,18,14,15],
      [1,7,3,4,5],
      [6,12,8,9,10],
      ////////////////////////////////////////  4
      [11,17,13,14,15],
      [6,7,8,4,10],
      [11,12,13,9,15],
      [16,17,18,14,20],
      [1,7,8,4,5],
      [6,12,13,9,10],
      [11,17,18,14,15],
      [6,2,3,9,10],
      [11,7,8,14,15],
      [16,12,13,19,20],
      //////////////////////////////////////  5
      [1,2,13,4,5],
      [6,7,18,9,10],
      [11,12,3,14,15],
      [16,17,8,19,20],
      [1,12,13,4,5],
      [6,17,18,9,10],
      [11,2,3,14,15],
      [16,7,8,19,20],
      [1,2,13,14,5],
      [6,7,18,19,10],
      /////////////////////////////////////  6
      [11,2,3,4,5],
      [16,7,8,9,10],
      [1,12,13,14,15],
      [6,17,18,19,20],
      [1,2,3,4,15],
      [6,7,8,9,20],
      [11,2,3,14,5],
      [16,7,8,19,10],
      [1,12,13,4,15],
      [6,17,18,9,20],
      ////////////////////////////////////  7
      [1,12,3,4,15],
      [6,17,8,9,20],
      [1,12,3,4,5],
      [6,17,8,9,10],
      [11,2,13,14,15],
      [16,7,18,19,20],
      [1,2,3,14,5],
      [6,7,8,19,10],
      [1,12,3,14,5],
      [6,17,8,19,10],
      /////////////////////////////////  8
      [11,2,13,4,15],
      [16,7,18,9,20],
      [1,7,13,4,5],
      [6,12,18,9,10],
      [11,7,3,14,15],
      [16,12,8,19,20],
      [1,2,13,9,5],
      [6,7,18,14,10],
      [11,17,18,14,5],
      [6,2,3,9,20],
      ////////////////////////////////  9
      [1,12,18,19,15],
      [16,7,3,4,10],
      [1,17,3,19,5],
      [16,2,18,4,20],
      [11,2,3,4,15],
      [16,7,8,9,20],
      [1,12,13,14,5],
      [6,17,18,19,10],
      [6,12,8,4,10],
      [11,17,13,9,15]
      /////////////////////////////// 10
]
let multiplierTable = [0,5,5,10,10,20,20,25,30,35,50,50,100,100,200,500,1000]
let fourFaceMultiplier = [0,4,4,5,5,4,4,4,4,4,3,3,2,2,2,2,2]
let fiveFaceMultiplier = [0,20,20,15,15,10,10,10,10,10,6,6,5,5,5,4,5]
let slot = new Slot({NUMBER_OF_ROW:4,NUMBER_OF_COL:5,NUMBER_OF_FACE:16,MIN_BET_PER_LINE:10,WIN_LINE:winLine,MULTIPLIER_TABLE:multiplierTable,FOUR_FACE_MULTIPLIER:fourFaceMultiplier,FIVE_FACE_MULTIPLIER:fiveFaceMultiplier})
let playSlot = new PlaySlot(slot)
// let probList = normalize([15,10,20,25,60,100,160,150,200,200,100,60,40,20,20,15])
let probList = normalize([100,105,110,123,129,120,130,160,395,160,140,130,100,50,200,100])

let faceList = slot.getFaceList()
const NUMBER_OF_TURN = 1000
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
// console.log("ProbList : ")
// for(let i=0;i<probList.length;i++)
//     console.log(probList[i])
console.log("AVG percent to win: "+sumPercenToWin/OUT_SIDE_LOOP_LIMIT)
console.log("AVG percent of returnRate: "+sumReturnRate/OUT_SIDE_LOOP_LIMIT)
// playSlot.printHitSummary()
console.log(probList)
