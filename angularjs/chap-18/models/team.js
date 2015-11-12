var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');
var async = require('async');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [Schema.Types.Mixed]
    }
});
function _attachMembers (result, callback) {
    var Employee = mongoose.model('Employee');

    Employee.find({
        team: result._id
    }, function (error, employees) {
        if (error) {
            return callback(error);
        }
        result.members = employees;
        callback(null, result);
    });
}
// listen for find and findOne
TeamSchema.plugin(postFind, {
    find: function (result, callback) {
        async.each(result, function (item, callback) {
            _attachMembers(item, callback);
        }, function (error) {
            if (error) {
                return callback(error);
            }
            callback(null, result)
        });
    },
    findOne: function (result, callback) {
        _attachMembers(result, callback);
    }
});

module.exports = mongoose.model('Team', TeamSchema);