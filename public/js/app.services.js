angular.module('myApp.Services', []);

angular.module('myApp.Services')
    .factory('localStorage', function($window) {
        var localStorage = $window.localStorage;
        var currentUser = JSON.parse(localStorage.currentUser || null);

        function stringify(data) {
            return JSON.stringify(data);
        }

        function parse(data) {
            data = data || stringify([]);
            return JSON.parse(data);
        }

        function addUser(user) {
            var users = parse(localStorage.usersList);
            users.push(user);
            localStorage.usersList = stringify(users);
        }

        function getUsers() {
            return parse(localStorage.usersList);
        }

        function setCurrUser(user) {
            currentUser = user;
            localStorage.currentUser = stringify(user);
        }

        function getCurrUser() {
            return currentUser;
        }

        function addPerson(person) {
            var staff = parse(localStorage.staffList) || [];
            var idx = staff.length;
            staff.push(person);
            localStorage.staffList = stringify(staff);
            return idx;
        }

        function removePerson(idx) {
            var list = parse(localStorage.staffList);
            list.splice(idx, 1);
            localStorage.staffList = stringify(list);
        }

        function getStuff() {
            var data = localStorage.staffList || '[]';
            return parse(data);
        }

        function updateStaff(person, idx) {
            var staffList = parse(localStorage.staffList);

            staffList[idx] = person;
            localStorage.staffList = stringify(staffList);

            return localStorage.staffList;
        }

        return {
            addUser: addUser,
            getUsers: getUsers,
            setCurrUser: setCurrUser,
            getCurrUser: getCurrUser,
            addPerson: addPerson,
            removePerson: removePerson,
            getStuff: getStuff,
            updateStaff: updateStaff
        };
    });
