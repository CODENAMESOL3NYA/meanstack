const {info} = require('./model');
 
const readInfo =(info)=>{
    let {names} = info;
    let {scores} = info;
    let {data}=info;
    console.log('iD\tNames\tScores\n+================+')
    for (let index = 0; index < names.length; index++) {
       console.log(`|${data[index]}|\t|${names[index]}|\t|${scores[index]}|`)
        
    }
    console.log('+================+')
}
readInfo(info)
console.log(info)