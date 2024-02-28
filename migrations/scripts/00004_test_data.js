const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

async function up({ context: sequelize }) {
    let queryInterface = sequelize.getQueryInterface();

    let students = [
        {
            id: 1,
            code: '1612000',
            name: 'Nguyen Van A',
        },
        {
            id: 2,
            code: '1612001',
            name: 'Nguyen Van B',
        },
        {
            id: 3,
            code: '1612002',
            name: 'Nguyen Van C',
        },
        {
            id: 4,
            code: '1612003',
            name: 'Nguyen Van D',
        },
        {
            id: 5,
            code: '1612004',
            name: 'Nguyen Van E',
        },
    ]

    let teachers = [
        {
            id: 1,
            code: 'GV001',
            name: 'Nguyen Van D',
        },
        {
            id: 2,
            code: 'GV002',
            name: 'Nguyen Van E',
        },
        {
            id: 3,
            code: 'GV003',
            name: 'Nguyen Van F',
        },
        {
            id: 4,
            code: 'GV004',
            name: 'Nguyen Van G',
        },
        {
            id: 5,
            code: 'GV005',
            name: 'Nguyen Van H',
        },
    ]

    let classes = [
        {
            id: 1,
            code: 'I32',
            name: 'Internship 32',
            start_date: new Date(),
            end_date: new Date()
        },
        {
            id: 2,
            code: 'C33',
            name: 'Internship 33',
            start_date: new Date(),
            end_date: new Date()
        }
    ]

    let assignments = [
        {
            class_id: 1,
            name: 'Mid-term assignment',
        },
        {
            class_id: 1,
            name: 'Final-term assignment',
        },
        {
            class_id: 2,
            name: 'Mid-term assignment',
        },
        {
            class_id: 2,
            name: 'Final-term assignment',
        }
    ]
    
    let class_students = [
        {
            class_id: 1,
            student_id: 1,
        },
        {
            class_id: 1,
            student_id: 2,
        },
        {
            class_id: 1,
            student_id: 3,
        },
        {
            class_id: 2,
            student_id: 4,
        },
        {
            class_id: 2,
            student_id: 5,
        }
    ]

    let roles = [
        {
            id: 1,
            name: 'admin',
            description: 'I am Admin'
        },
        {
            id: 2,
            name: 'teacher',
            description: 'I am Teacher'
        },
        {
            id: 3,
            name: 'student',
            description: 'I am Student'
        }
    ]

    let users = [
        {
            id: 1,
            username: 'admin',
            password: await bcrypt.hash('1', 10),
            role_id: 1
        },
        {
            id: 2,
            username: 'teacher',
            password: await bcrypt.hash('1', 10),
            role_id: 2,
            binding: 1
        },
        {
            id: 3,
            username: 'student',
            password: await bcrypt.hash('1', 10),
            role_id: 3,
            binding: 1
        }
    ]

    await queryInterface.bulkInsert('students', students);
    await queryInterface.bulkInsert('teachers', teachers);
    await queryInterface.bulkInsert('classes', classes);
    await queryInterface.bulkInsert('assignments', assignments);
    await queryInterface.bulkInsert('class_students', class_students);
    await queryInterface.bulkInsert('roles', roles);
    await queryInterface.bulkInsert('users', users);
}

async function down({ context: queryInterface }) {
}

module.exports = { up, down };