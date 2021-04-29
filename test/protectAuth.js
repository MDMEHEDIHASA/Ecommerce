const expect = require('chai').expect;

const protctAuth = require('../middlewares/authMiddlware');

describe('auth Middlware',function(){
    
    it('should throw an error if no authorization is present',  function(){
        const req = {
          startsWith: function(){
              return null;
          }
        }
        expect(protctAuth.bind(this,req,{},()=>{})).to.throw();  
      })

     
})
