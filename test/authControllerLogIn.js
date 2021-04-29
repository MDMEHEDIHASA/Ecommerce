const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../backend/models/userModel');
const AuthController = require('../backend/controllers/userController');

describe('Auth controller -login',function(){
    it('should throw an error with code 401 if accessing the database fails',function(){
        sinon.stub(User,'findOne');
        User.findOne.throws();
        
        const req = {
            body:{
                email:'test@test.com',
                password:'test'
            }
        }

        AuthController.authUser(req,{},()=>{}).then(result=>{
            
            //console.log(result);
            expect(result).to.be.an('error');
            expect(result).to.be.property('status',401);
            //done();
        })
        User.findOne.restore();
    })

    
})




