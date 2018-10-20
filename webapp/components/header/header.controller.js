(function() {
    'use strict';
    angular
        .module('app.module')
        .component('header', {
            templateUrl: '../components/header/header.template.html',
            controller: HeaderController,
            controllerAs: 'vm'
        });

    HeaderController.$inject = ['$rootScope', 'romsync', 'CONFIG','error'];
    function HeaderController($rootScope, romsync, CONFIG, error) {
        var vm = this;
    
        function onErrorCallback(response){
            //alert("Error: "+ response.data);
        }
        function onSuccessCallback(response){
            return response.data;
        }
        function onSearchTypeAhead(search){
            var query = {
                name: search, 
                platform: vm.selected.platform
            };
            return romsync.search(query)
                .then(onSuccessCallback, onErrorCallback);
        }
        function onSelectChange(selectedItem){
            console.log(selectedItem);
           
            $rootScope.$broadcast("searchResultClicked", selectedItem);
            //****************/
            $rootScope.platform = selectedItem;
            vm.searchQuery = null;
        }
        function getPlatforms(){
            return romsync.platforms().then(onSuccessCallback, onErrorCallback)
        }
        function onSelectPlatform(platform){
            vm.selected.platform = platform;
        }
        
        //////////////
        vm.$onInit = () => {    
            vm.waitTime = 1200;
            vm.minLength = 3;
            vm.placeholder = "Search for games";
            vm.platforms = CONFIG.platforms;
            vm.selected = romsync.selected;
            vm.searchQuery = null;
        };
        vm.$onChanges = function(changesObj) { };
        vm.$onDestroy = function() { };
        vm.onSearchTypeAhead = onSearchTypeAhead;
        vm.onSelectChange = onSelectChange;
        vm.getPlatforms = getPlatforms;
        vm.onSelectPlatform = onSelectPlatform;
    }
})();