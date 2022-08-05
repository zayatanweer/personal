function printDate(){
    const date = new Date()
    console.log("Current date", date.getDate())
};

function printMonth(){
    const month = new Date()
    console.log("Current month", month.getMonth()+1)
};

function getBatchInfo(){
    const day = new Date()
    console.log("Plutonium," , "W3","D",day.getDate(), "the topic for today is Nodejs module system")
}
module.exports.currentDate = printDate
module.exports.currentMonth = printMonth
module.exports.getBatch = getBatchInfo