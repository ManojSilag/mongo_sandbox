const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({name : 'joe'});
        joe.save().then(() => done())
    })

    it('Model instance remove', (done) =>{
        joe.remove().then(()=>{
         return User.findOne({name : 'joe'})
        }).then((user) => {
        console.log('dev: user', user)
            assert(user === null);
            done();
        });
    });

    // instanceof('Class method remove', () =>{

    // });

    // instanceof('Class method findAndRemove', () =>{

    // });

    // instanceof('Class method findbyIdAndRemove', () =>{

    // });
});