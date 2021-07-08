/*
* NOTE: the default settings use the service https://ethereal.email/ so are not real credentials and MUST be changed in case
* of real tests, even with fresh Ethereal Mail credentials.
*/

const server = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
};

const user = {
    smtp_name: 'Nikolas Bednar',
    smtp_username: 'nikolas.bednar63@ethereal.email',
    smtp_password: 'ZEhpAgYPuPuwdbJbQ9',
};

module.exports = {
    server,
    user,
}