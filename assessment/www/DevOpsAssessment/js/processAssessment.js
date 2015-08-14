/*global $*/

$(document).ready(function () {
    'use strict';

    $("#demosMenu").change(function () {
        window.location.href = $(this).find("option:selected").attr("id") + '.html';
    });

    var assessmentType = localStorage.assessment;

    if (localStorage.assessment === 'first') {
        $('#list1').show();
    }

    function getOptions(obj, list) {
        var i;

        if (!obj) {
            return list;
        }

        if (obj instanceof Array) {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    list = list.concat(getOptions(obj[i], []));
                }
            }
            return list;
        }
        if (obj.Option) {
            list.push(obj.Option);
        }

        if (obj.children) {
            return getOptions(obj.children, list);
        }

        return list;
    }

    $("#section1").show();
    /* change the colour of progress bar items when selected
     */

    /*Get the questions and descriptions from the json file*/
    $.getJSON('./js/ProcessAssessmentQuestions.json', function (data) {
        var ob = 0,
            op;

        $.each(data.AssessmentQuestions, function (questionIndex, val) {
            $("#slide" + (questionIndex + 1) + " img:first").after("<h3>" + val.Question + "</h3>");
            $("#slide" + (questionIndex + 1) + " button").after('<span class="more myfont">' + val.Description + '</span>');

            var OptionArrays = getOptions(val, []),
                option;

            for (op = 0; op < OptionArrays[ob].length; op += 1) {
                option = (OptionArrays[ob])[op].Answer;

                $("#slide" + (questionIndex + 1) + " .container").append('<div id="' + ((OptionArrays[ob])[op].opid) + '" class="yes" data-catq="' + val.Category + val.id + '" data-slide="' + (questionIndex + 1) + '" data-level="' + val.level + '" style="font-size: 20px">' + option + '</div>');
            }

        });
    });

    function getQuestionByOp(catq, op) {
        var question = "",
            QuestionNo = catq.replace(/^\D+/g, ''), // replace all leading non-digits with nothing
            Category = catq.replace(/[0-9]/g, '');

        $.getJSON('./js/ProcessAssessmentQuestions.json', function (data) {
            $.each(data.AssessmentQuestions, function (questionIndex, val) {
                if (val.Category === Category && val.id === QuestionNo) {
                    $.each(val.Option, function (optionIndex, opt) {
                        if (opt.RelatedQuestion && val.Option[optionIndex].opid === op) {
                            //console.log(opt.RelatedQuestion.Question); // get the related question

                            $.each(opt.RelatedQuestion.Option, function (subOptionIndex, subOpt) {
                                //console.log(subOpt.Answer);
                            });
                        }
                    });
                }

            });

        });

    }

    function generateOptions(options, slideNum, level) {
        var slideId = '#slide' + slideNum;

        $(slideId + ' .container').empty();

        $.each(options, function (index, val) {
            $(slideId + ' .container').append('<div id="' + val.opid + '" class="yes" data-slide="' + slideNum + '" data-level="' + level + '" style="font-size: 20px">' + val.Answer + '</div>');
        });
    }

    function replaceQuestion(relatedQuestion, slideNum) {
        var slideId = '#slide' + slideNum;

        $(slideId + ' h3').html(relatedQuestion.Question);
        $(slideId + ' button').after('<span class="more myfont">' + relatedQuestion.Description + '</span>');

        generateOptions(relatedQuestion.Option, slideNum, relatedQuestion.level);
    }

//    function generateBackButton(previousQuestion, slideNum) {
//        if (!$('.backQ').length) {
//            $('#slide' + slideNum + ' .intro').append('<a href="#backQ" class="backQ">Back</a>');
//        }
//
//        console.log(previousQuestion);
//
//        $('.backQ').attr('id', previousQuestion.opid);
//        $('.backQ').data('level', previousQuestion.level);
//        $('.backQ').data('slide', slideNum);
//
//        if (+previousQuestion.level === 1) {
//            $('.backQ').data('catq', previousQuestion.Category + previousQuestion.level);
//        }
//    }

    function processRelatedQuestion(question, answerId, slideNum) {
        $.each(question.Option, function (index, option) {
            if (+option.opid === +answerId) {
                if (option.RelatedQuestion) {
//                    if (localStorage.currentRelatedQuestions) {
//                        generateBackButton(JSON.parse(localStorage.currentRelatedQuestions), slideNum);
//                    }

                    localStorage.currentRelatedQuestions = JSON.stringify(option.RelatedQuestion);
                    replaceQuestion(option.RelatedQuestion, slideNum, option.opid);
                }
            }
        });
    }

    function processAnswer(elem) {
        var catQ = $(elem).data('catq'),
            opId = $(elem).attr('id'),
            level = $(elem).data('level'),
            slideNum = $(elem).data('slide');

        if (+level === 1) {
            $.getJSON('js/ProcessAssessmentQuestions.json', function (data) {
                $.each(data.AssessmentQuestions, function (index, question) {
                    // get the Process ID from a split and check if it is equal to the question ID in the iteration
                    if (+catQ.split('Process')[1] === +question.id) {
                        // Pass the relevant question object and the ID of the option
                        processRelatedQuestion(question, opId, slideNum);
                    }
                });
            });
        } else {
            processRelatedQuestion(JSON.parse(localStorage.currentRelatedQuestions), opId, slideNum);
        }
    }

    $('.backQ').on('click', function(e) {
        e.preventDefault();
        processAnswer(this);
    });

    $(document).on('click', '.yes', function (e) {
        e.preventDefault();
        processAnswer(this);
    });

    function getQuestions(obj, list) {
        var i;

        if (!obj) {
            return list;
        }

        if (obj instanceof Array) {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    list = list.concat(getQuestions(obj[i], []));
                }
            }

            return list;
        }

        if (obj.Question) {
            list.push(obj.Question);
        }

        if (obj.children) {
            return getQuestions(obj.children, list);
        }

        return list;
    }

    function find(source, id) {
        var key,
            item,
            subresult;

        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];

                if (item.id === id) {
                    return item;
                }

                // Item not returned yet. Search its children by recursive call.
                if (item.children) {
                    subresult = find(item.children, id);

                    // If the item was found in the subchildren, return it.
                    if (subresult) {
                        return subresult;
                    }
                }
            }
        }
        // Nothing found yet? return null.
        return null;
    }

    $('div.quiz-progress').click(function (event) {
        $('div.quiz-progress').removeClass("select");
        $('div.quiz-progress').removeClass("activeselect");
        event.stopPropagation();

        var cls = $(this).attr('class');
        var subcls = cls.split(" ").pop();

        if (subcls === 'active') {
            $(this).addClass("activeselect");
        } else if (subcls === 'quiz-progress') {
            $(this).addClass("select");
        }

    });

    /* select the first question bar of a section when clicked on a section
     */
    $('li.quiz-intro-item').click(function () {

        var selectDiv = $(this).find("div:first").attr('id');

        var cls = $('#' + selectDiv).attr('class');
        var subcls = cls.split(" ").pop();

        $('div.quiz-progress').removeClass("select");
        $('div.quiz-progress').removeClass("activeselect");
        if (subcls === 'active') {
            $('#' + selectDiv).addClass("activeselect");
        } else if (subcls === 'activeselect') {
            $('#' + selectDiv).addClass("activeselect");
        } else {
            $('#' + selectDiv).addClass("select");
        }

    });

    function moveBars(slide) {
        var slideNo = $(slide).closest(".slide").attr("id");

        var slideNo = slideNo.replace(/[^\d]/g, '');
        $('#bar' + slideNo).addClass("active");
        $('#bar' + slideNo).removeClass("select");
        $('#bar' + slideNo).removeClass("activeselect");
        var nxtbar = ('#bar' + (parseInt(slideNo) + 1));

        if (($.inArray(-1, assesment)) == -1) {
            $('#bar31').addClass("active");
        }

        if ($(nxtbar).hasClass('active')) {
            $(nxtbar).addClass("activeselect");
        } else {
            $(nxtbar).addClass("select");
        }

    }

    // to delay showing answered text. slide no is passed as an argument
    function timeout(slide) {
        window.setTimeout(function () {
            $("#queans" + slide).show();
        }, 1000);
    }

    var assesment = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    var precentageVal = [];
    var a1 = 0; // result for part 1
    var a2 = 0; // result for part 2
    var a3 = 0; // result for part 3
    var a4 = 0; // result for part 4
    var a5 = 0;
    var a6 = 0; // result for part 5
    var status = 1;
    var assResultsInt = [];
    // db session count handle replicating same data
    var SessionCount = 0;
    $('div.yes,div.maybe,div.no').click(function () {

        var slideNo = $(this).closest(".slide").attr("id");
        var slideNo = slideNo.replace(/[^\d]/g, '');
        var cls = $(this).attr('class');

        $('#slide' + slideNo + ' *> div').removeClass('selected');
        $(this).addClass('selected');


        if ($.trim(cls) == 'yes') {
            assesment[slideNo - 1] = 1;
            $('#ans' + slideNo).text('Your answer: Yes');
        } else if ($.trim(cls) == 'maybe') {
            assesment[slideNo - 1] = 0.5;
            $('#ans' + slideNo).text('Your answer: Partially');
        } else if ($.trim(cls) == 'no') {
            assesment[slideNo - 1] = 0;
            $('#ans' + slideNo).text('Your answer: No');
        }

        // to delay showing answered text. slide no is passed as an argument
        timeout(slideNo);

        //a place to get redirected to the results page || slideNo == 30
        if (slideNo == 30) {
            // calls the results calcualting method
            checkResultsAssesment1();
            updateAssesmentResults();
        }
        moveBars($(this));
    });

    /*$('.container').on("click", 'div.yes,div.maybe,div.no', function () {

        $(this).attr("id")

    });
*/


    //send data to database if all the questions are answered
    function SendAssessmentData() {
        //if process assessment is selected.

        var IsMinus = "false";
        for (i = 0; i < 30; i++) {
            if (assesment[i] == -1) {
                IsMinus = "true";
                break;
            }
        }
        if (IsMinus == "false") {


            assResultsInt = [a1, a2, a3, a4, a6];
            var assResultsStr = "";

            for (i = 0; i < assResultsInt.length; i++) {
                if (assResultsInt[i] != -1) {
                    //category value is optimized if it greater than 4
                    assResultsInt[i] = parseInt(assResultsInt[i]);
                    if (assResultsInt[i] > 4) {
                        assResultsInt[i] = 4;
                    }
                    assResultsStr += assResultsInt[i] + ",";
                } else {
                    status = 0;
                    break;
                }
            }
            if (status === 1) {
                // set count as one . same record will not be added again
                SessionCount = 1;
                insertProcessAssessmentData(assesment, assResultsStr);
                UpdateResultsProcessAssessment(localStorage.getItem('appName'), localStorage.getItem('serviceType'), localStorage.getItem('yourName'), localStorage.getItem('designation'));
                localStorage.setItem("ProcessAssessment", "Completed");

                alert("Successfully saved in the Database");
                window.location.href = 'ToolsAssessment.html';
            }
        } else {
            alert("Please answer all the questions and come back");
        }

    }

    function checkResultsAssesment1() {
        a1 = 0;
        a2 = 0;
        a3 = 0;
        a4 = 0;
        a6 = 0;
        for (i = 0; i < 6; i++) {
            if (assesment[i] == -1) {
                a1 = -1;
                break;
            } else {
                a1 += assesment[i];
            }
        }
        for (i = 6; i < 12; i++) {
            if (assesment[i] == -1) {
                a2 = -1;
                break;
            } else {
                a2 += assesment[i];
            }
        }
        for (i = 12; i < 18; i++) {
            if (assesment[i] == -1) {
                a3 = -1;
                break;
            } else {
                a3 += assesment[i];
            }
        }
        for (i = 18; i < 24; i++) {
            if (assesment[i] == -1) {
                a4 = -1;
                break;
            } else {
                a4 += assesment[i];
            }
        }
        for (i = 24; i < 30; i++) {
            if (assesment[i] == -1) {
                a6 = -1;
                break;
            } else {
                a6 += assesment[i];
            }
        }

    }

    //update assesment results here
    function updateAssesmentResults() {
        //build n continuous integration

        var progressbar = $('#progressbar0'),
            result = a1,
            max = Math.round(a1 * (100 / 6)),
            time = (500 / max) * 5,
            value = 0;

        if (result < 0) {
            max = 0;
            $('#text00').html('Pending Results');
            $('#text01').html('Please answer all the questions and come back');

        } else if (result < 1) {

            $('#text00').html('Regressive');
            $('#text01').html('Manual process for building software, No management of artifacts and reports');

        } else if (result < 2) {
            $('#text00').html('Repeatable');
            $('#text01').html('Regulate automated build and testing. Any build can be recreated from source control');

        } else if (result < 3) {
            $('#text00').html('Consistent');
            $('#text01').html('Automated build and test cycles every time a change is committed. Dependencies are managed. Re-use of tools and scripts');

        } else if (result < 4) {
            $('#text00').html('Quantitatively Managed');
            $('#text01').html('Build metrics gathered made visible and acted upon. Broken builds are addressed immediately');

        } else {
            $('#text00').html('Optimized');
            $('#text01').html('Teams regularly meet to discuss integration problems and resolve them with automation, faster feedback and better visibility');
        }

        var loading = function () {

            addValue = progressbar.val(value);

            $('#progressvalue0').html((value) + '%');

            if (value == max) {
                clearInterval(animate);
            }
            value += 1;
        };

        var animate = setInterval(function () {
            loading();
        }, time);

        //
        var progressbar1 = $('#progressbar1'),
            max1 = Math.round(a2 * (100 / 6)),
            time1 = (500 / max1) * 5,
            value1 = 0;
        progressbar1.val(value1);
        if (a2 < 0) {
            max1 = 0;
            $('#text10').html('Pending Results');
            $('#text11').html('Please answer all the questions and come back');

        } else if (a2 < 1) {
            $('#text10').html('Regressive');
            $('#text11').html('Manual process for deploying software. Environment specific binaries, Environments provisioned manually');

        } else if (a2 < 2) {
            $('#text10').html('Repeatable');
            $('#text11').html('Automated deployments to some environments. Creation of new environments is cheap/fast. All configuration is externalized');

        } else if (a2 < 3) {
            $('#text10').html('Consistent');
            $('#text11').html('Fully automated, self service process for deployments to test environments. Repeatable process to deploy to every environment');

        } else if (a2 < 4) {
            $('#text10').html('Quantitatively Managed');
            $('#text11').html('Orchestrated deployments. Release and rollback processes are fully tested');

        } else {
            $('#text10').html('Optimized');
            $('#text11').html('All environments managed effectively. Provisioning fully automated, with Virtualization where applicable');
        }

        var loading1 = function () {

            addValue = progressbar1.val(value1);

            $('#progressvalue1').html((value1) + '%');

            if (value1 == max1) {
                clearInterval(animate1);
            }
            value1 += 1;
        };

        var animate1 = setInterval(function () {
            loading1();
        }, time1);

        var progressbar2 = $('#progressbar2'),
            max2 = Math.round(a3 * (100 / 6)),
            time2 = (500 / max2) * 5,
            value2 = 0;
        progressbar2.val(value2);
        if (a3 < 0) {
            max2 = 0;

            $('#text20').html('Pending Results');
            $('#text21').html('Please answer all the questions and come back');

        } else if (a3 < 1) {
            $('#text20').html('Regressive');
            $('#text21').html('Manual processes are being used to configure environments, check code quality and manage artifacts which makes the code un reliable and less in maintainability');

        } else if (a3 < 2) {
            $('#text20').html('Repeatable');
            $('#text21').html('Environment provisioning is not reliable and also error prone rate is considerably high also the artifacts are partially managed which will reduce the maintainability');

        } else if (a3 < 3) {
            $('#text20').html('Consistent');
            $('#text21').html('Development teams follow basic level of code coverage and also the development environments are manages up to a good level which makes the code to have good quality ');

        } else if (a3 < 4) {
            $('#text20').html('Quantitatively Managed');
            $('#text21').html('Code quality matrices are tracked well and artifacts are proactively managed');

        } else {
            $('#text20').html('Optimized');
            $('#text21').html('Code is being tested automatically and the artifacts are well published in a central repository which makes the error prone rate low as the environment configuration is too fully automated');
        }

        var loading2 = function () {

            addValue = progressbar2.val(value2);

            $('#progressvalue2').html((value2) + '%');

            if (value2 == max2) {
                clearInterval(animate2);
            }
            value2 += 1;
        };

        var animate2 = setInterval(function () {
            loading2();
        }, time2);
        //3

        //4
        var progressbar3 = $('#progressbar3'),
            max3 = Math.round(a4 * (100 / 6)),
            time3 = (500 / max3) * 5,
            value3 = 0;
        progressbar3.val(value3);
        if (a4 < 0) {
            max3 = 0;

            $('#text30').html('Pending Results');
            $('#text31').html('Please answer all the questions and come back');

        } else if (a4 < 1) {
            $('#text30').html('Regressive');
            $('#text31').html('Manual testing after development');

        } else if (a4 < 2) {
            $('#text30').html('Repeatable');
            $('#text31').html('Automated tests written as part of requirement development');

        } else if (a4 < 3) {
            $('#text30').html('Consistent');
            $('#text31').html('Automated unit and acceptance tests, written along with tests. Testing is part of the development process');

        } else if (a4 < 4) {
            $('#text30').html('Quantitatively Managed');
            $('#text31').html('Quality metrics and trends tracked, nonfunctional requirements defined and measured');

        } else {
            $('#text30').html('Optimized');
            $('#text31').html('Production rollbacks are rare, defects are found and fixed immediately');
        }

        var loading3 = function () {

            addValue = progressbar3.val(value3);

            $('#progressvalue3').html((value3) + '%');

            if (value3 == max3) {
                clearInterval(animate3);
            }
            value3 += 1;
        };

        var animate3 = setInterval(function () {
            loading3();
        }, time3);
        //4

        //5
        var progressbar4 = $('#progressbar4'),
            max4 = Math.round(a6 * (100 / 6)),
            time4 = (500 / max4) * 5,
            value4 = 0;

        progressbar4.val(value4);
        if (a6 < 0) {
            max4 = 0;

            $('#text40').html('Pending Results');
            $('#text41').html('Please answer all the questions and come back');

        } else if (a6 < 1) {
            $('#text40').html('Regressive');
            $('#text41').html('Manual testing after development');

        } else if (a6 < 2) {
            $('#text40').html('Repeatable');
            $('#text41').html('Automated tests written as part of requirement development');

        } else if (a6 < 3) {
            $('#text40').html('Consistent');
            $('#text41').html('Automated unit and acceptance tests, written along with tests. Testing is part of the development process');

        } else if (a6 < 4) {
            $('#text40').html('Quantitatively Managed');
            $('#text44').html('Quality metrics and trends tracked, nonfunctional requirements defined and measured');

        } else {
            $('#text40').html('Optimized');
            $('#text41').html('Production rollbacks are rare, defects are found and fixed immediately');
        }

        var loading4 = function () {

            addValue = progressbar4.val(value4);

            $('#progressvalue4').html((value4) + '%');

            if (value4 == max4) {
                clearInterval(animate4);
            }
            value4 += 1;
        };

        var animate4 = setInterval(function () {
            loading4();
        }, time4);

    }


    // this method called when result is clicked
    $('#list3,#results1,#results').click(function () {
        // calls the results calcualting method
        checkResultsAssesment1();
        updateAssesmentResults();
    });


    $("li.quiz-intro-item").mouseover(function () {
        $(this).css("background-color", "#6094EA");
    });

    $("li.quiz-intro-item").mouseout(function () {
        $(this).css("background-color", "#4F81BD");
    });

    // used to fill a table which is rendered to a PDF. IN PROGRESS....
    function fillTable() {

        var cell1 = Math.round(a1 * (100 / 6)) + '%';
        document.getElementById("perc01").innerHTML = cell1;

        var cell2 = $('#text00').text();

        document.getElementById("rec01").innerHTML = cell2;

        var cell3 = $('#text01').text();

        document.getElementById("desc01").innerHTML = cell3;

        var cell4 = Math.round(a2 * (100 / 6)) + '%';

        document.getElementById("perc02").innerHTML = cell4;

        var cell5 = $('#text10').text();
        document.getElementById("rec02").innerHTML = cell5;

        var cell6 = $('#text11').text();
        document.getElementById("desc02").innerHTML = cell6;

        var cell7 = Math.round(a3 * (100 / 6)) + '%';
        document.getElementById("perc03").innerHTML = cell7;

        var cell8 = $('#text20').text();
        document.getElementById("rec03").innerHTML = cell8;

        var cell9 = $('#text21').text();
        document.getElementById("desc03").innerHTML = cell9;

        var cell10 = Math.round(a4 * (100 / 6)) + '%';
        document.getElementById("perc04").innerHTML = cell10;

        var cell11 = $('#text30').text();
        document.getElementById("rec04").innerHTML = cell11;

        var cell12 = $('#text31').text();
        document.getElementById("desc04").innerHTML = cell12;

        var cell13 = Math.round(a6 * (100 / 6)) + '%';
        document.getElementById("perc05").innerHTML = cell13;

        var cell14 = $('#text40').text();
        document.getElementById("rec05").innerHTML = cell14;

        var cell15 = $('#text41').text();
        document.getElementById("desc05").innerHTML = cell15;
        //        for (i = 0; i < assResultsInt.length; i++) {
        //            precentageVal[i] = getPrecentageAss(assResultsInt[i], i);
        //        }
        //
        //
        //        document.getElementById("Other01").innerHTML = Math.round(precentageVal[0]) + "%";
        //        document.getElementById("Other02").innerHTML = Math.round(precentageVal[1]) + "%";
        //        document.getElementById("Other03").innerHTML = Math.round(precentageVal[2]) + "%";
        //        document.getElementById("Other04").innerHTML = Math.round(precentageVal[3]) + "%";
        //        document.getElementById("Other05").innerHTML = Math.round(precentageVal[4]) + "%";

    }

    // Print PDF button when this clicked a PDF is Downloded and send data to DB
    $('#printID').click(function () {
        fillTable();

        if (SessionCount == 0) {
            SendAssessmentData();
            //generatePDF();
            //            window.location.href = 'ToolsAssessment.html';
        }
        if (localStorage.getItem('ProcessAssessment') == "Completed" && localStorage.getItem('ToolsAssessment') == "Completed") {
            window.location.href = 'index.html';
        }

    });

    function generatePDF() {
        var imgData = 'data:image/jpeg;base64,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';

        var pdf = new jsPDF('p', 'pt', 'letter');

        pdf.addImage(imgData, 'JPEG', 255, 300, 100, 60); // Cache the image

        pdf.setFont("helvetica");
        pdf.setFontType("bold");
        pdf.setFontSize(24);
        pdf.setTextColor(100);
        pdf.text(200, 300, 'DevOps Assessment');

        pdf.addPage(); // starts a new pdf page

        pdf.addImage(imgData, 'JPEG', 40, 20, 100, 60); // Cache the image

        pdf.setFont("courier");
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text(200, 60, 'Process Assessment Results');
        pdf.setDrawColor(23, 46, 113);
        pdf.setLineWidth(0.5);
        pdf.line(45, 70, 580, 70);


        pdf.setDrawColor(0, 0, 0);
        source = $('#TablePDF')[0];

        // we support special element handlers. Register them with jQuery-style
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors
        // (class, of compound) at this time.
        specialElementHandlers = {

            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        margins = {
            top: 100,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('DevOpsAssesmentResults.pdf');
            }, margins);
    }
    $(".toggle").click(function (event) {
        $(this).toggleClass('read-less');
        $(this).next('.more').toggleClass('show');
        event.preventDefault();

    });

});
