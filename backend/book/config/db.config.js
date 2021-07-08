const username = 'mongo-db-user';
const password = 'AwZ0XqZ4z7hzMblm';
const host = 'cluster0.g9zhx.mongodb.net';
const port = null;
const defaultAuthDb = 'mevn-books-app';
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