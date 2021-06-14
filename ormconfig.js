function TypeOrmConfig() {

  return {
    database: 'db.sqlite',
    type: 'sqlite',
    entities: [__dirname + '/**/*.entity.ts'],
    synchronize: true,
    logging: true
  };
}

module.exports = TypeOrmConfig();
