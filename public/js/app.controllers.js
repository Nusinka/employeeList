angular.module('myApp')
    .controller('loginController', function ($scope, localStorage, $state, usersList) {
        $scope.user = {};
        $scope.submit = function (form) {
            if (form.$invalid) {
                return false;
            }
            var name = $scope.user.name;
            var password = $scope.user.password;
            var reversName = name.split("").reverse().join("");
            if (reversName === password) {
                var user;

                for (var i = 0; i < usersList.length; i++) {
                    if (name === usersList[i].name) {
                        user = usersList[i];
                        break;
                    }
                }

                if (!user) {
                    user = $scope.user;
                    localStorage.addUser(user);
                }
                localStorage.setCurrUser(user);

                $state.go('main');
            } else {
                $scope.message = 'Invalid data';
            }
        };
    })

    .controller('DashboardController', function ($scope, staffList, $state, user, localStorage, $modal) {
        if (!user) {
            $state.go('login');
        }
        $scope.logout = function () {
            localStorage.setCurrUser(null);
            $state.reload()
        };
        $scope.staffList = staffList;
        $scope.user = user;

        $scope.editPerson = function (person) {
            $state.go('main.edit', {
                idx: staffList.indexOf(person)
            });
        };

        $scope.remove = function (person) {
            var idx = $scope.staffList.indexOf(person);
            var modalInstance = $modal.open({
                templateUrl: './template/myModalContent.html',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        localStorage.removePerson(idx);
                        $modalInstance.close();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    item: function () {
                        return $scope.item;
                    }
                }
            });
            modalInstance.result.then(function () {
                $state.go('main', {}, {
                    reload: true
                });
            });
       };
    })

    .controller('EditController', function ($scope, person, staffList, idx, localStorage, $state) {
        if (person) {
            $scope.message = 'Редактирование сотрудника';
            $scope.person = person;
        } else {
            $scope.person = {};
            $scope.message = 'Создание сотрудника';
        }

        $scope.action = function (form) {
            if (form.$invalid) {
                return false;
            }
            if (!idx) {
                idx = localStorage.addPerson($scope.person);
            }
            localStorage.updateStaff($scope.person, idx);
            $scope.message = 'Редактирование сотрудника';
            $state.go('main.edit', {
                idx: idx
            }, {
                reload: true
            })
        };
    });

    /*.controller('AddController', function ($scope, localStorage, $state) {
        $scope.person = {};
        $scope.message = 'Создание сотрудника';
        $scope.action = function (form) {
            if (form.$invalid) {
                return false;
            }
            var idx = localStorage.addPerson($scope.person);
            $state.go('main.edit', {
                idx: idx
            }, {
                reload: true
            })
        };
    });*/
