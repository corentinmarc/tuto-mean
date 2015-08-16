var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var db = mongoose.connection;
var dbUrl = 'mongodb://localhost:27017/humanresource';

// TEAM
var TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
var Team = mongoose.model('Team', TeamSchema);
function insertTeams (callback) {
    Team.create([{
        name: 'Product Development'
    }, {
        name: 'Dev Ops'
    }, {
        name: 'Accounting'
    }], function (error, teams) {
        if (error) {
            return callback(error);
        } else {
            console.info('teams successfully added');
            var
                pd = teams[0],
                devops = teams[1],
                acct = teams[2];
            callback(null, pd, devops, acct);
        }
    });
}
function removeAllTeams() {
    Team.remove({}, function(){});
}


// EMPLOYEE
var EmployeeSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    image: {
        type: String,
        default: 'images/user.png'
    },
    address: {
        lines: {
            type: [String]
        },
        postal: {
            type: String
        }
    }
});
var Employee = mongoose.model('Employee', EmployeeSchema);
function insertEmployees (pd, devops, acct, callback) {
    console.log('insertEmployees');
    Employee.create([
        {
            name: {
                first: 'John',
                last: 'Adams'
            },
            team: pd._id,
            address: {
                lines: ['2 Lincoln Memorial Cir NW'],
                zip: 20037
            }
        }, {
            name: {
                first: 'Thomas',
                last: 'Jefferson'
            },
            team: devops._id,
            address: {
                lines: ['1600 Pennsylvania Avenue', 'White House'],
                zip: 20500
            }
        }, {
            name: {
                first: 'James',
                last: 'Madison'
            },
            team: acct._id,
            address: {
                lines: ['2 15th St NW', 'PO Box 8675309'],
                zip: 20007
            }
        }, {
            name: {
                first: 'James',
                last: 'Monroe'
            },
            team: acct._id,
            address: {
                lines: ['1850 West Basin Dr SW', 'Suite 210'],
                zip: 20242
            }
        }], function (error, employees) {
        if (error) {
            return callback(error);
        } else {
            console.info('employees successfully added');
            callback(null, {
                team: pd,
                employee: employees[0]
            });
        }
    })
}
function retrieveEmployee (data, callback) {
    Employee.findOne({
        _id: data.employee._id
    }).populate('team').exec(function (error, result) {
        if (error) {
            return callback (error);
        } else {
            console.log('*** Single Employee Result ***');
            console.dir(result);
            callback(null, data);
        }
    });
}
function retrieveEmployees (data, callback) {
    Employee.find({
        'name.first': /J/i
    }, function (error, results) {
        if (error) {
            return callback(error);
        } else {
            console.log('*** Multiple Employees Result ***')
            console.dir(results);
            callback(null, data);
        }
    });
}
function updateEmployee (first, last, data, callback) {
    console.log('*** Changing names ***');
    console.dir(data.employee);
    var employee = data.employee;
    employee.name.first = first;
    employee.name.last = last
    employee.save(function (error, result) {
        if (error) {
            return callback(error);
        } else {
            console.log('*** Changed name to Andrew Jackson ***');
            console.log(result);
            callback(null, data);
        }
    });
}
function removeAllEmployees() {
    Employee.remove({}, function(){});
}

// DB WORK
db.on('error', function () {
    console.log('there was an error communicating with the database');
});
mongoose.connect(dbUrl, function (err) {
    if (err) {
        return console.log('there was a problem connecting to the database!' + err);
    }

    console.log('connected!');
    cleanDB();
    insertTeams(function (err, pd, devops, acct) {
        if (err) {
            return console.log(err)
        }
        insertEmployees(pd, devops, acct, function (err, result) {
            retrieveEmployee(result, function (err, result) {
                retrieveEmployees(result, function (err, result) {
                    updateEmployee('Andrew' ,'Jackson' ,result, function (err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.info('database activity complete')
                        }
                        db.close();
                        process.exit();
                    });
                });
            });
        });
    });
});
function cleanDB() {
    console.log('cleanDB');
    removeAllEmployees();
    removeAllTeams()
}