//takes in the first name, last name and date of a famous person
// as three command line arguments
//and uses Knex to perform an insert.

const settings = require ('./settings');

console.log('Adding ...');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const input = process.argv.slice(2);
const inputValues = {
  first_name: input[0],
  last_name: input[1],
  birthdate: input[2]
};

knex('famous_people')
.insert(inputValues)
.asCallback((err, result) => {
  if (err){
    return console.error("error running query", err);
  }
  console.log('Added!');
  knex.destroy(()=>{
    console.log('DESTROY, BYE');
  });
});
