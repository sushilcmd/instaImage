var duration = 2;
var screenTimer = undefined;
$(document).ready(function() {
    makeTemplates();
    bind('.btn.search', function() {
        var hashTagMeta = {
            hashTag: $('.textBox .inputText').val(),
            end_cursor: ''
        }
        searchTag(hashTagMeta).then(function(r) {
            showScreen(r);
            if (screenTimer)
                screenTimer.clear();
            screenTimer = setInterval(function() {
                if (r.tag.media.page_info.has_next_page) {
                    hashTagMeta.end_cursor = r.tag.media.page_info.end_cursor;
                    searchTag(hashTagMeta).then(function(r) {
                        showScreen(r);
                    });
                }
            }, duration * 1000)
        });
    });
})

function showScreen(r) {
    var data = JSON.parse(r);
    $('.imagesContainer').show();
    render('.mainContainer .imagesContainer', 'allhashtagsImages', data.tag);
}

function searchTag(hashTag) {
    return new Promise(function(res, rej) {
        execute('getImages', hashTag).then(function(r) {
            res(r);
        });
    });
}