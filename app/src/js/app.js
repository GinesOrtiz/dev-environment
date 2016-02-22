$(document).ready(function () {
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results ? results[1] : null;
    };
    if($.urlParam('file')) {
        $.get('/html/' + $.urlParam('file') + '.html')
            .then(function (res) {
                $('#template').html(res);
            }, function () {
                $('#template').html('<div class="alert alert-danger">File ' +
                    '<b>' + $.urlParam('file') + '</b> not found</div>');
            });
    }else{
        $('#template').html('<div class="alert alert-danger">File param not found <b>?file=example</b></div>');
    }
});