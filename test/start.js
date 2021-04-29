const expect = require('chai').expect;

it('should add number correctly',function(){
    const num1 =5;
    const num2=5;
    expect(num1+num2).to.equal(10);
})


it('should not give 10',function(){
    const num1 =5;
    const num2=5;
    expect(num1+num2).to.not.equal(11);
})