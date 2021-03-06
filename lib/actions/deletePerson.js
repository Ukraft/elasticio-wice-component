const request = require('request-promise');

const wice = require('./wice.js');
const config = require('./../../config/config');

const cfg = config.getEnvironment();

let input = {
  rowid: 412149
};

wice.createSession(cfg, async () => {
  if (cfg.cookie) {

    let user = JSON.stringify(input);
    // const uri = `${cfg.path}/plugin/wp_elasticio_backend/json?method=delete_person&cookie=${cfg.cookie}&data=${user}`;

    let options = {
      method: 'POST',
      uri: `${cfg.path}/plugin/wp_elasticio_backend/json`,
      form: {
        method: 'delete_person',
        cookie: cfg.cookie,
        data: user
      },
      headers: {
        'X-API-KEY': cfg.apikey
      }
    };

    request.post(options).then((res) => {
      let deletedPerson = JSON.parse(res);
      console.log(JSON.stringify(deletedPerson, undefined, 2));
    }, (err) => {
      console.log(`ERROR: ${err}`);
    }).catch((e) => {
      console.log(`ERROR: ${e}`);
    });

    // try {
    //   let deletedPerson = await request.get(uri);
    //   console.log(`DELETED PERSON: ${deletedPerson}`);
    // } catch (e) {
    //   console.log(`ERROR: ${e}`);
    // }

  } else {
    console.log('ERROR: No cookie found...');
  }
});
