const settings = require ('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});
// const client = new pg.Client({
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
// });

const input = process.argv[2];
const query = "SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1";

// function outputEntry(entry){
//   console.log(`Found ${entry.rows.length} person(s) by the name '${input}':`);
//   console.log(`- ${entry.rows[0].id}: ${entry.rows[0].first_name} ${entry.rows[0].last_name}, born ${entry.rows[0].birthdate.toLocaleDateString()}`);
// }

console.log(input);
knex('famous_people')
.where('id', input)
.asCallback((err, result) => {
  console.log(result);
});
knex.destroy(()=>{
  console.log('DESTROY, BYE');
});
// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query(query, [input], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log('Searching ...');
//     outputEntry(result);
//     client.end();
//   });
// });