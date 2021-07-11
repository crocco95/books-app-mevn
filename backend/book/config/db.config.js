const username = 'books';
const password = 'MongoMevn2021!';
const host = '127.0.0.1';
const port = 27017;
const defaultAuthDb = 'admin';
const options = [
    'retryWrites=true',
    'w=majority',
];

/*
* URI Format : mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
* Source: https://docs.mongodb.com/manual/reference/connection-string/
*/
const connectionUri = `mongodb${port ? '' : '+srv'}://${username}:${password}@${host}${port ? ':' + port : ''}/${defaultAuthDb}?${options.join('&')}`;

module.exports = {
    connectionUri,
}