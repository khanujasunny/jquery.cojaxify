/*
@Author : SUNNY KHANUJA | 
@Description : generic ajax plugin for http://codev.torosm.ca/ */
$(document).ready(function() {

    $("body").on("click", "a[data-cojaxify]", function(e) {
        e.preventDefault();
        var cObj = {};
        cObj._this = $(this);
        cObj.url = cObj._this.attr("data-url");
        cObj.target = cObj._this.attr("data-target");
        cObj.type = cObj._this.attr("data-type"); // Expected Value : xml, html, json, or jsonp
        cObj.section = cObj._this.attr("data-section"); // if html/xml then which section to load , if json then first parent section will be loaded
        cObj.option = cObj._this.attr("data-option"); // object
        cObj.animation = cObj._this.attr("data-animation"); // object
        cObj.speed = cObj._this.attr("data-speed"); // object
        cObj.script = cObj._this.attr("data-script"); // object
        cObj.cors = cObj._this.attr("data-cors"); // object

        var ajaxObj = {};

        if (!cObj.url) {
            console.log("cojaxify", "URL not defined...");
            return;
        }
        ajaxObj.url = cObj.url;

        if (!cObj.target || !$("#" + cObj.target).length) {
            console.log("cojaxify", "Target not defined or #" + cObj.target + " not exist");
            return;
        }

        if (!cObj.type) {
            ajaxObj.dataType = "html";
            cObj.type = "html";
        } else ajaxObj.dataType = cObj.type;

        if (typeof cObj.option == "object") {
            cObj.option = eval(cObj.option);
        }

        ajaxObj.crossOrigin = true;
        ajaxObj.timeout = 10000; // 10 seconds timeout



        //takin care of cors
        if (ajaxObj.url.indexOf("http") == 0 || ajaxObj.url.indexOf("https") == 0) {
            ajaxObj.url = 'http://whateverorigin.org/get?url=' + ajaxObj.url;
            ajaxObj.dataType = "jsonp";
            cObj.cors = true;
        }
        ajaxObj.error = function(objAJAXRequest, strError) {
            if (strError == 'error') {
                $("#" + cObj.target).html('<span class="padding10 errorText">error not found</span>');
            } else if (strError == 'timeout') {
                $("#" + cObj.target).html('<span class="padding10 errorText">error timeout or no connection</span>');
            };
        };

        ajaxObj.success = function(data) {
            var loadData = "";
            if (cObj.section) {
                if (cObj.type == 'html' || cObj.type == 'xml') {
                    if ($(data).find(cObj.section).length)
                        loadData = $(data).find(cObj.section);
                    else
                        loadData = '<span class="padding10 errorText">Section not found...</span>';
                } else if (cObj.type == 'json' || cObj.type == 'jsonp')
                    loadData = data[cObj.section];

            } else {
                loadData = data;
            }
            setTimeout(function() {

                $("#" + cObj.target).hide();

                if (cObj.cors) {
                    if (cObj.type == 'xml') {
                        loadData = $.parseXML(loadData.contents)
                    } else if (cObj.type == 'html') {
                        loadData = unescape(loadData.contents);
                    } else if (cObj.type == 'json') {
                        loadData = JSON.parse(loadData.contents);
                    }

                }
                if (cObj.type == 'html')
                    $("#" + cObj.target).html(loadData);
                else if (cObj.type == 'text')
                    $("#" + cObj.target).text(data);
                else if (cObj.type == 'xml') {
                    var htmlc = "<" + $(loadData).children().prop("tagName") + ">" + $(loadData).children().html() + "</" + $(loadData).children().prop("tagName") + ">";
                    $("#" + cObj.target).html('<textarea class="fullText" disabled>' + vkbeautify.xml(htmlc) + '</textarea>');
                } else if (cObj.type == 'json' || cObj.type == 'jsonp') {
                    $("#" + cObj.target).html('<textarea class="fullText" disabled>' + vkbeautify.json(loadData) + '</textarea>');
                }




                if (cObj.animation) {
                    if (!isNaN(cObj.speed)) {
                        cObj.speed = parseInt(cObj.speed);
                    }
                    if (cObj.animation == 'fade')
                        $("#" + cObj.target).stop(true, true).fadeIn(cObj.speed);
                    if (cObj.animation == 'slide')
                        $("#" + cObj.target).stop(true, true).slideDown(cObj.speed);

                } else {
                    $("#" + cObj.target).show();
                }

                if (cObj.script) {
                    var fn = window[cObj.script];
                    if (typeof fn === 'function') {
                        fn(loadData);
                    }
                }

            }, 1500); //for showing loader | testing purpose




        };

        $("#" + cObj.target).html('<span class="padding10"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></span>');
        $.ajax(ajaxObj)




    });



});
