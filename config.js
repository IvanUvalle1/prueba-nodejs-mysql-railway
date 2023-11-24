module.exports = {
    PORT: 9000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'library',
    DB_PORT: process.env.DB_PORT || '3306'

};