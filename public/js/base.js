var eventToUse = 'click';


function makeTemplates() {
    var templateName = '';
    $('script[type="text/x-jquery-tmpl"]').each(function(index, item) {
        templateName = $(item).attr("id");
        $.template(templateName.replace("Template", ""), $(item).html());
    });
}

function rb(element, template, data, button, cb, rcb) {
    render(element, template, data, function() {
        if (rcb)
            rcb(button);

        bind(element + ' ' + button, function() {
            var r = $(this).tmplItem().data;
            cb($(this), r);
            //logClicks();
        });
    })
}


function render(element, template, data, cb) {
    $(element).html('');
    $.tmpl(template, data).appendTo(element);
    if (cb)
        cb($(element))
}

function bind(element, func, eventName) {
    //log('bind ' + element);
    if (eventName)
        $(element).unbind().bind(eventName, func);
    else
        $(element).unbind().bind(eventToUse, func);
}

function execute(command, request) {
    return new Promise(function(res, rej) {
        executeInternal(appUrl, command, 'POST', request, res, rej, 40000);
    });
}

function executeInternal(url, command, request_path, requestData, success, fail, timeout) {
    fail = ((fail == undefined) ? function() {
        //handle error
    } : fail);
    $.ajax({
        type: request_path,
        url: url + command,
        data: JSON.stringify(requestData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: timeout == undefined ? 0 : timeout, // in milliseconds
        success: success,
        error: fail
    });

}
