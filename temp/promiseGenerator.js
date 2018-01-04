function solver(resolve, reject){
	var randomNumber = Math.floor((Math.random() * 10) + 1)
    if (randomNumber <= 5) {
      resolve(randomNumber);
    } else {
      reject(randomNumber);
    }
}
function randomNumber(number)
{
	let promise= new Promise(function (resolve,reject){
		if(number>5)
		resolve(number);
		else
		reject(number);
	});
	return promise;
}

randomNumber(4).then(function(result){
	console.log("ok"+result);
}).catch(function(error){
	console.log("bad"+error);
});

function* numberGen(){
	yield 1;
	yield 2;
	yield 3;
}
let num= numberGen();
console.log(num.next());
console.log(num.next());
console.log(num.next());
console.log(num);