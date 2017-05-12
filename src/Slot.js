class Slot{
    // let slot = new Slot({NUMBER_OF_ROW:,NUMBER_OF_COL:,NUMBER_OF_FACE:,MIN_BET_PER_LINE:,WIN_LINE:,MULTIPLIER_TABLE:})
    constructor(props){
        if(props){
            this.NUMBER_OF_ROW = props.NUMBER_OF_ROW
            this.NUMBER_OF_COL = props.NUMBER_OF_COL
            this.NUMBER_OF_FACE = props.NUMBER_OF_FACE
            this.MIN_BET_PER_LINE = props.MIN_BET_PER_LINE
            this.WIN_LINE = props.WIN_LINE
            this.MULTIPLIER_TABLE = props.MULTIPLIER_TABLE
            this.FOUR_FACE_MULTIPLIER = props.FOUR_FACE_MULTIPLIER
            this.FIVE_FACE_MULTIPLIER = props.FIVE_FACE_MULTIPLIER
            if(props.WIN_LINE)
                this.NUMBER_OF_WINLINE = props.WIN_LINE.length
        }
    }
    getRewardTableFromMultiplierTable(multiplierTable,money){
        let temp = []
        for(let i=0 ;i<multiplierTable.length;i++)
            temp.push(multiplierTable[i]*money)
        return temp
    }
}

module.exports = Slot