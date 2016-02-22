$(document).ready(function () {
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results ? results[1] : null;
    };
    if ($.urlParam('file')) {
        $.get('/src/html/' + $.urlParam('file') + '.html')
            .then(function (res) {
                $('body').attr('id', $.urlParam('file'));
                $('#template').html(res);
            }, function () {
                $('#template').html('<div class="alert alert-danger">File ' +
                    '<b>' + $.urlParam('file') + '</b> not found</div>');
            });

        if (app[$.urlParam('file')]) {
            app[$.urlParam('file')]();
        }
    } else {
        $('#template').html('<div class="alert alert-danger">File param not found <b>?file=example</b></div>');
    }
});