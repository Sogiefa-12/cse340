//  In the above code, you should replace "username", "password", "hostname", and "5432" with the values provided by render.com.
module.exports = {
      development: {
        database: 'cse340',
        username: 'cse340',
        password: 'Hw2fbkG0CYPI35e76DrifqpsAcVMzZXj',
        dialect: 'postgres',
        host: 'dpg-crt9o6d6l47c73d8omdg-a.oregon-postgres.render.com',
        port: 5432,
        pool: {
        max: 5,
        min: 0,
        idle: 30000
        }
        },
    test: {
            
    database: 'cse340',
    username: 'cse340',
    password: 'Hw2fbkG0CYPI35e76DrifqpsAcVMzZXj',
    dialect: 'postgres',
    host: 'dpg-crt9o6d6l47c73d8omdg-a.oregon-postgres.render.com',
    port: 5432,
    pool: {
    max: 5,
    min: 0,
    idle: 30000
    }
    },
production: {
        
    database: 'cse340',
    username: 'cse340',
    password: 'Hw2fbkG0CYPI35e76DrifqpsAcVMzZXj',
    dialect: 'postgres',
    host: 'dpg-crt9o6d6l47c73d8omdg-a.oregon-postgres.render.com',
    port: 5432,
    pool: {
    max: 10,
    min: 0,
    idle: 30000}
    
    }
}

