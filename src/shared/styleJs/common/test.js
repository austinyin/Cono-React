function resolveAfter2Seconds(x) {
    try{
        throw 'sds';
    }catch(DOMException){
        console.log('haha')
    }
    return new Promise(resolve => {
        resolve(x);
    });

}

var x = await resolveAfter2Seconds(10).then(data =>{consl});

console.log('ha')