(function () {
    var crud = angular.module('CrudModule');

    crud.factory('CRUDUtils', ['Restangular', function (RestAngular) {
            function crudFunction($scope) {
                this.api = RestAngular.all(this.url);
                $scope.currentRecord = {};
                $scope.records = [];
                this.editMode = false;

                this.fetchRecords = function () {
                    var self = this;
                    this.api.getList().then(function (data) {
                        $scope.records = data;
                        $scope.currentRecord = {};
                        self.editMode = false;
                    });
                };
                this.createRecord = function () {
                    this.editMode = true;
                    $scope.currentRecord = {};
                };
                this.saveRecord = function () {
                    var self = this;
                    if ($scope.currentRecord.id) {
                        $scope.currentRecord.put().then(function () {
                            self.fetchRecords();
                        });
                    } else {
                        this.api.post($scope.currentRecord).then(function () {
                            self.fetchRecords();
                        });
                    }
                };
                this.deleteRecord = function (record) {
                    var self = this;
                    record.remove().then(function () {
                        self.fetchRecords();
                    });
                };
                this.editRecord = function (record) {
                    $scope.currentRecord = RestAngular.copy(record);
                    this.editMode = true;
                };
                this.maspoblado = function () {
                    var self = this;
                    this.api.getList().then(function (data) {
                        $scope.records = data;
                        $scope.currentRecord = {};
                        self.editMode = false;
                        var actual = $scope.currentRecord;
                        var mayor;
                        
                    });
                };
            }
            ;
            return {
                extendCtrl: function (obj, scope) {
                    crudFunction.call(obj, scope);
                }
            };
        }]);
})();