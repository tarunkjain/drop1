$(document).ready(function() {

    //check all checkbox
    $('.container').on("click", 'input[name="all"]', function() {
        var status = $(this).is(':checked');
        $('input[type="checkbox"]').attr('checked', status);
    });

    $('.container').on("click", 'input[name="app"]', function() {
        var status = $(this).is(':checked');
        $('input[name="all"]').removeAttr('checked');
    });

    //populate the select box from the data.json file
    $.getJSON('./js/data.json', function(data) {
        $.each(data.services, function(key, val) {
            $('select')
                .append($("<option></option>")
                    .attr("value", val.name)
                    .text(val.name));
        });
    });

    //make the div focus color
    $('.container').on("click", 'input[type=checkbox]', function() {
        $(this).parent('div').css('border', '1px solid #33b5e5');
    }).on("blur", 'input[type=checkbox]',
        function() {
            $(this).parent('div').css('border', '1px solid #d9d9d9');
        });


    $('.switch').click(function() {

        $(this).children('i').toggleClass('fa-pencil');
        $('.login').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
        $('.register').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
    });


    $('#nextBtn').click(function() {

        localStorage.setItem('serviceType', document.getElementById("serviceType").value);
        var apps = "";
        $("input:checkbox[name=app]:checked").each(function() {
            if (apps == "") {
                apps = $(this).parent().text();
            } else {
                apps = apps + ", " + $(this).parent().text();
            }
        });

        localStorage.setItem('appName', apps);

        localStorage.setItem('yourName', $('#yourName').val());
        localStorage.setItem('designation', $('#designation').val());
        localStorage.setItem('ProcessAssessment', "Incomplete");
        localStorage.setItem('ToolsAssessment', "Incomplete");

        if ($('#yourName').val() == "" || $('#designation').val() == "") {

        } else {
            window.location.href = 'flowselection.html';
            return false;
        }
    });


    $('#tools').click(function() {
        window.location.href = 'ToolsAssessment.html';
        if (typeof(Storage) !== "undefined") {
            localStorage.assessment = "second";
        }



    });

    $('#process').click(function() {
        window.location.href = 'ProcessAssessment.html';
        if (typeof(Storage) !== "undefined") {
            localStorage.assessment = "first";            
        } 
    });
});

//populate the checkbox options after slecting a service
function populate() {
    var x = document.getElementById("serviceType").value;

    $('.container').empty();
    $('.container').append('<label><input type="checkbox" name="all" id="all" style="display:initial;width: auto;" /> Select all </label> <br />');
    $.getJSON('./js/data.json', function(data) {

        $.each(data.services, function(key, val) {
            if (val.name == x) {
                $.each(val.apps, function(index, value) {
                    $('.container').append('<label> <input type="checkbox" name="app" style="display:initial;width: auto;" />' +" "+ value + '</label><br />');
                });
            }
        });

    });
}