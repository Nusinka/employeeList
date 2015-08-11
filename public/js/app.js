angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'myApp.Services'
]);

angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './template/login.html',
                controller: 'loginController',
                resolve: {
                    usersList: ['localStorage', function (localStorage) {
                        return localStorage.getUsers();
                    }]
                }
            })
            .state('main', {
                    url: '/dashboard',
                    templateUrl: './template/dashboard.html',
                    controller: 'DashboardController',
                    resolve: {
                        user: ['localStorage', function (localStorage) {
                            return localStorage.getCurrUser();
                        }],
                        staffList: ['localStorage', function (localStorage) {
                            return localStorage.getStuff();
                        }]
                    }
                })
                .state('main.edit', {
                    url: "/edit/:idx",
                    templateUrl: "./template/person.edit.html",
                    controller: 'EditController',
                    resolve: {
                        idx: function ($stateParams) {
                            return $stateParams.idx;
                        },
                        person: function (idx, staffList) {
                            return staffList[idx];
                        }
                    }
                })
                .state('main.add', {
                    url: "/add",
                    templateUrl: "./template/person.edit.html",
                    controller: 'EditController',
                    resolve: {
                        idx: function () {
                            return null;
                        },
                        person: function () {
                            return null;
                        }
                    }
            });

        $urlRouterProvider.otherwise("/login");
    })
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error){
                console.log(fromState);
                console.log(toState);
                if (error) {
                    throw error;
                }
            })
    });
