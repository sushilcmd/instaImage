var duration = 5;
var screenTimer = undefined;
$(document).ready(function() {
    makeTemplates();
    bind('.btn.search', function() {
        var hashTagMeta = {
            hashTag: $('.textBox .inputText').val(),
        };
        searchTag(hashTagMeta).then(function(r) {
            var data = JSON.parse(r);
            $('.imagesContainer').show();
            render('.mainContainer .imagesContainer', 'allhashtagsImages', data.tag);
            if (screenTimer)
                screenTimer.clear();
            screenTimer = setInterval(function() {
                if (data.tag.media.page_info.has_next_page) {
                    hashTagMeta.end_cursor = data.tag.media.page_info.end_cursor;
                    searchTag(hashTagMeta).then(function(r) {
                        var newData = JSON.parse(r)
                        data = newData
                        showImageScreen(r);
                    });
                }
            }, duration * 1000)
        });
    });
})

function searchTag(hashTagMeta) {
    console.log(hashTagMeta);
    return new Promise(function(res, rej) {
        execute('getImages', hashTagMeta).then(function(r) {
            res(r);
        });
    });
}

function showImageScreen(r) {
    var data = JSON.parse(r);
    for (i in data.tag.media.nodes) {
        $('.allImages').append('<div class="hashTagImage" data-index="' + data.tag.media.nodes[i].id + '"><div class="img"><img src="' + data.tag.media.nodes[i].display_src + '" class="instaImage"></div><div class="imageInfo"><div class="info date"><div class="imageIcon"><img src="../images/calendar.png" class="icon"></div><div class="value">' + data.tag.media.nodes[i].likes.count + '</div> </div><div class="info likes"><div class="imageIcon"><img src="../images/likes.png" class="icon"></div><div class="value">' + data.tag.media.nodes[i].likes.count + '</div> </div><div class="info comment"><div class="imageIcon"><img src="../images/comment.png" class="icon"></div><div class="value">' + data.tag.media.nodes[i].comments.count + '</div> </div></div><div class="caption">' + data.tag.media.nodes[i].caption + '</div></div > ')
    }
}