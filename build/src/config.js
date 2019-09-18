"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    PORT: process.env.PORT || '8080',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgresql://staff:@localhost/hoa_project',
    DB_URL_TEST: process.env.DATABASE_URL_TEST || 'postgresql://staff:@localhost/hoa_project_test',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
    // add database
};
exports.default = config;
