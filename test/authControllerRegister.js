const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../backend/models/userModel');
const AuthController = require('../backend/controllers/userController');
describe('Auth controller -register',function(){
    it('should throw an error with code 400 if accessing the database fails',function(){
        sinon.stub(User,'findOne');
        User.findOne.throws();
        
        const req = {
            body:{
                bame:'test',
                email:'test@test.com',
                password:'test'
            }
        }

        AuthController.registerUser(req,{},()=>{}).then(result=>{
            
            //console.log(result);
            expect(result).to.be.an('error');
            expect(result).to.be.property('status',400);
            //done();
        })
        User.findOne.restore();
    })
})