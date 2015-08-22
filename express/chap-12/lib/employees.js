var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;
exports.retrieveEmployee = retrieveEmployee;

function getEmployees (callback) {
    Employee.find().sort('name.last').exec(callback);
}
function getEmployee (employeeId, callback) {
    Employee.findOne({
        id: employeeId
    }).populate('team').exec(callback);
}
function retrieveEmployee (req, res, next) {
    Employee.findOne({
        id: req.params.employeeId
    }).exec(function (error, employee) {
        if (error) {
            return next(error);
        }
        res.locals.employee = employee;
        return next();
    });
}