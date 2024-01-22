const { Umzug, SequelizeStorage } = require('umzug')
const fs = require('fs');
const { Sequelize } = require('sequelize');

function newMigration(sequelize) {
    const umzug = new Umzug({
        migrations: {
            glob: 'migrations/*.up.sql',
            resolve: ({ name, path, context: sequelize }) => ({
                name,
                up: async () => {
                    const sql = fs.readFileSync(path).toString()
                    sqls = sql.split(';');
                    try {
                        for (const s of sqls) {
                            if (s.trim() === '') {
                                continue;
                            }
                            await sequelize.query(s)
                        }
                    } catch (err) {
                        throw err;
                    }
                },
                down: async () => {
                    // Get the corresponding `.down.sql` file to undo this migration
                    const sql = fs.readFileSync(path.replace('.up.sql', '.down.sql')).toString()
                    print(sql);
                    return sequelize.query(sql)
                }
            })
        },
        context: sequelize,
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    });

    umzug.up().then(console.log('migrations complete'))
}

function newMigration_v2(sequelize) {
    const umzug = new Umzug({
        migrations: {
            glob: 'migrations/scripts/*.{js,ts,up.sql}',
            resolve: (params) => {
                if (!params.path.endsWith('.sql')) {
                    return Umzug.defaultResolver(params)
                }

                const { context: sequelize } = params
                return {
                    name: params.name,
                    up: async () => {
                        const sql = fs.readFileSync(params.path).toString()
                        sqls = sql.split(';');
                        try {
                            for (const s of sqls) {
                                if (s.trim() === '') {
                                    continue;
                                }
                                await sequelize.query(s)
                            }
                        } catch (err) {
                            throw err;
                        }
                    },
                    down: async () => {
                        // Get the corresponding `.down.sql` file to undo this migration
                        const sql = fs.readFileSync(params.path.replace('.up.sql', '.down.sql')).toString()
                        print(sql);
                        return sequelize.query(sql)
                    }
                }

            }
        },
        context: sequelize,
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    });

    umzug.up().then(console.log('migrations complete'))
}

module.exports = {
    newMigration,
    newMigration_v2
}