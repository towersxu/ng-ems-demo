/**
 * Created by taox on 15-7-30.
 */
angular.module('app.home', ['ui.bootstrap','ngTouch', 'ui.grid', 'ui.grid.pagination','ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav','chieffancypants.loadingBar', 'ngAnimate'])
    .config(function($stateProvider){
    })
    .factory('urlState',function(){

    })
    .run(function ($rootScope, $urlRouter) {

        $rootScope.$on('$locationChangeSuccess', function(e) {
            console.log(arguments);
        });
        $urlRouter.listen();
    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items,userInfo) {
        $scope.userInfo = userInfo;
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('userController',['$scope','$http','uiGridConstants','$modal','$log',function ($scope, $http, uiGridConstants,$modal,$log){
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 100,
            sort: null
        };
        $scope.animationsEnabled = false;
        $scope.selectUser = {};
        $scope.showMe = function(row){
            //alert(row.entity.name)
            $scope.selectUser = row.entity;
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: './home/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size:'lg',
                resolve: {
                    items: function () {
                        return [];
                    },
                    userInfo: function(){
                        return $scope.selectUser;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 75,100],
            paginationPageSize: 100,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                { name: 'name' },
                { name: 'gender', enableSorting: false },
                { name: 'company', enableSorting: false },
                { name: 'operate', cellTemplate:'<button class="btn primary" ng-click="grid.appScope.showMe(row)">编辑</button>' }
            ],
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        paginationOptions.sort = null;
                    } else {
                        paginationOptions.sort = sortColumns[0].sort.direction;
                    }
                    getPage();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.pageNumber = newPage;
                    paginationOptions.pageSize = pageSize;
                    getPage();
                });
            }
        };

        var getPage = function() {
            var url;
            switch(paginationOptions.sort) {
                case uiGridConstants.ASC:
                    url = '../data/100_ASC.json';
                    break;
                case uiGridConstants.DESC:
                    url = '../data/100_DESC.json';
                    break;
                default:
                    url = '../data/100.json';
                    break;
            }

            $http.get(url)
                .success(function (data) {
                    $scope.gridOptions.totalItems = 100;
                    var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                    $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
                });
        };

        getPage();

    }])
    .controller('unPostController',['$scope','$modal','$log',function ($scope,$modal, $log){
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: './home/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }])
    .controller('channelController',['$scope', '$http', '$q', '$interval','cfpLoadingBar', function ($scope, $http, $q, $interval,cfpLoadingBar) {
        $scope.gridOptions = {};

        $scope.gridOptions.columnDefs = [
            { name: 'id', enableCellEdit: false },
            { name: 'name', displayName: 'Name (editable)' },
            { name: 'gender' },
            { name: 'age', displayName: 'Age' , type: 'number'},
            { name: 'registered', displayName: 'Registered' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"'},
            { name: 'isActive', displayName: 'Active', type: 'boolean'}
        ];

        $scope.saveRow = function( rowEntity ) {
            // create a fake promise - normally you'd use the promise returned by $http or $resource
            var promise = $q.defer();
            $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );

            // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
            $interval( function() {
                if (rowEntity.gender === 'male' ){
                    promise.reject();
                } else {
                    promise.resolve();
                }
            }, 3000, 1);
        };

        $scope.gridOptions.onRegisterApi = function(gridApi){
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
        };

        $http.get('../data/500.json')
            .success(function(data) {
                for(i = 0; i < data.length; i++){
                    data[i].registered = new Date(data[i].registered);
                }
                $scope.gridOptions.data = data;
            });

        /**bootstrap**/
        $scope.totalItems = 564;

        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.bigCurrentPage);
            cfpLoadingBar.start();
            setTimeout(get,1000);
            function get(){
                $http.get('../data/101.json')
                    .success(function(data) {
                        for(i = 0; i < data.length; i++){
                            data[i].registered = new Date(data[i].registered);
                        }
                        $scope.gridOptions.data = data;
                        cfpLoadingBar.complete();
                    })
            }
        };

        $scope.maxSize = 10;
        $scope.bigTotalItems = 575;
        $scope.bigCurrentPage = 1;
    }])
    .controller('checkController',['$scope','$http', '$timeout', 'cfpLoadingBar',function($scope, $http, $timeout, cfpLoadingBar){
        $scope.start = function() {
            cfpLoadingBar.start();
        };

        $scope.complete = function () {
            cfpLoadingBar.complete();
        };
    }])
    .controller('AppCtrl', ['$scope','$state','$location', function ($scope,$state,$location) {
        $scope.current =$location.$$path;
        $scope.tabStatus ={
            user:$scope.current === "/user",
            channel:$scope.current === "/channel",
            check:$scope.current === "/check",
            post:$scope.current === "/post",
            unPost:$scope.current === "/unPost"
        };
        $scope.tabsStatus = {
            userTabs: $scope.tabStatus.user,
            channelTabs: $scope.tabStatus.channel ||  $scope.tabStatus.check,
            giftTabs: $scope.tabStatus.post ||  $scope.tabStatus.unPost
        };
        console.log($scope.tabStatus);
        console.log($scope.tabsStatus);
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }]);