const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];
const query = "SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1";

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    // console.log('\n\n', result);
    client.end();
  });
});