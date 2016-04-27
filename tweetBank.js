var _ = require('lodash');
var id = 0;
var data = [];

function add(name, text) {
    data.unshift({
        name: name,
        text: text,
        id:id++
    });
}

function list() {
    return _.cloneDeep(data);
}

function find(properties) {
    return _.cloneDeep(_.filter(data, properties))
}

module.exports = {
    add: add,
    list: list,
    find: find
};

var randArrayEl = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function () {
    var fakeFirsts = ['Tailer', 'TaiLer', 'Taylor', 'TAILor', 'Tay', 'TayTweets', 'taiLOR', '@tayTweets'];
    var fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma', 'Swift', 'Schwifty'];
    return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function () {
    var awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing'];
    return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

var randomData = function (n) {
    for (var i = 0; i < n; i++) {
        module.exports.add(getFakeName(), getFakeTweet());
    }
}

randomData(10);
