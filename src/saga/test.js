function* generate() {
    let a = 10;
    while (a--){
        const value = yield a;
        console.log('value',value)
    }
}

const gen  = generate()
console.log(gen.next('ha'))
console.log(gen.next('ha').value)
