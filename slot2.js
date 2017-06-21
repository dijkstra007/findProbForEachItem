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
        [ 1, 2, 3 ],
      [ 4, 5, 6 ],
      [ 7, 8, 9 ],
      [ 1, 2, 6 ],
      [ 1, 2, 9 ],
      [ 1, 5, 3 ],
      [ 1, 5, 6 ],
      [ 1, 5, 9 ],
      [ 1, 8, 3 ],
      [ 1, 8, 6 ],
      [ 1, 8, 9 ],
      [ 4, 2, 3 ],
      [ 4, 2, 6 ],
      [ 4, 2, 9 ],
      [ 4, 5, 3 ],
      [ 4, 5, 9 ],
      [ 4, 8, 3 ],
      [ 4, 8, 6 ],
      [ 4, 8, 9 ],
      [ 7, 2, 3 ],
      [ 7, 2, 6 ],
      [ 7, 2, 9 ],
      [ 7, 5, 3 ],
      [ 7, 5, 6 ],
      [ 7, 5, 9 ],
      [ 7, 8, 3 ],
      [ 7, 8, 6 ]
]
let multiplierTable = [0,5,5,10,10,20,20,50,100,200,500,1000]
let slot = new Slot({NUMBER_OF_ROW:3,NUMBER_OF_COL:3,NUMBER_OF_FACE:11,MIN_BET_PER_LINE:10,WIN_LINE:winLine,MULTIPLIER_TABLE:multiplierTable,FEVER_NUMBER:7,FREE_SPIN_ADDER:5})
let playSlot = new PlaySlot(slot)
let probList = normalize([50,50,100,120,170,200,250,160,100,50,70])
let faceList = slot.getFaceList()
const NUMBER_OF_TURN = 100000
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
console.log("AVG returnRate: "+sumReturnRate/OUT_SIDE_LOOP_LIMIT)
// playSlot.printHitSummary()
console.log(probList)
