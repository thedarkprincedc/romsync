(function(){
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app.module']);
        $(document).foundation('topbar', 'reflow');
        $(document).foundation();
    });
})();