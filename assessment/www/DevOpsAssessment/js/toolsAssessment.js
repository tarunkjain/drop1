$(document).ready(function () {
    $("#demosMenu").change(function () {
        window.location.href = $(this).find("option:selected").attr("id") + '.html';
    });

    $('#bar1').addClass("select");
    var assessmentType = localStorage.assessment;
    if (localStorage.assessment == 'second') {
        $('#list2').show();
        $('#FunctionalMenu1').hide();
        $('#FunctionalMenu2').show();
    }

    var SessionCount = 0;

    var question1 = "";
    var question2 = "";
    var question3 = "";
    var question4 = "";
    var question5 = "";
    var question6 = "";
    var question7 = "";
    var question8 = "";
    var question9 = "";
    var question10 = "";
    var question11 = "";
    var question12 = "";
    var question13 = "";
    var question14 = "";
    var question15 = "";
    var question16 = "";
    var question17 = "";
    var question18 = "";
    var question19 = "";
    var question20 = "";
    var question21 = "";
    var optionCount = 0;
    var isFinished = false;
    $('.next').click(function () {

        var ratingVal = this.value;
        var slideNo = $(this).closest(".slide").attr("id");
        var slideNo = slideNo.replace(/[^\d]/g, '');


        if (slideNo == 1) {
            question1 = "";
            $("input:checkbox[name=ques1]:checked").each(function () {
                if (question1 == "") {
                    question1 = $(this).parent().text();
                } else {
                    question1 = question1 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question1 == "") {
                question1 = (jQuery("textarea").eq(0).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(0).val()) != "") {
                    question1 = question1 + ", " + (jQuery("textarea").eq(0).val());
                    optionCount++;
                }
            }
            console.log(question1);
        } else if (slideNo == 2) {
            question2 = "";
            $("input:checkbox[name=ques2]:checked").each(function () {
                if (question2 == "") {
                    question2 = $(this).parent().text();
                } else {
                    question2 = question2 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question2 == "") {
                question2 = (jQuery("textarea").eq(1).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(1).val()) != "") {
                    question2 = question2 + ", " + (jQuery("textarea").eq(1).val());
                    optionCount++;
                }
            }

        } else if (slideNo == 3) {
            question3 = "";
            $("input:checkbox[name=ques3]:checked").each(function () {
                if (question3 == "") {
                    question3 = $(this).parent().text();
                } else {
                    question3 = question3 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question3 == "") {
                question3 = (jQuery("textarea").eq(2).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(2).val() != "")) {
                    question3 = question3 + ", " + (jQuery("textarea").eq(2).val());
                    optionCount++;
                }
            }

        } else if (slideNo == 4) {
            question4 = "";
            $("input:checkbox[name=ques4]:checked").each(function () {
                if (question4 == "") {
                    question4 = $(this).parent().text();
                    optionCount++;
                } else {
                    question4 = question4 + ", " + $(this).parent().text();
                    optionCount++;
                }
                optionCount++;
            });
            if (question4 == "") {
                question4 = (jQuery("textarea").eq(3).val());
            } else {
                if ((jQuery("textarea").eq(3).val()) != "") {
                    question4 = question4 + ", " + (jQuery("textarea").eq(3).val());
                    optionCount++;
                }
            }


        } else if (slideNo == 5) {
            question5 = "";
            $("input:checkbox[name=ques5]:checked").each(function () {
                if (question5 == "") {
                    question5 = $(this).parent().text();
                } else {
                    question5 = question5 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question5 == "") {
                question5 = (jQuery("textarea").eq(4).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(4).val()) != "") {
                    question5 = question5 + ", " + (jQuery("textarea").eq(4).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 6) {
            question6 = "";
            $("input:checkbox[name=ques6]:checked").each(function () {
                if (question6 == "") {
                    question6 = $(this).parent().text();
                } else {
                    question6 = question6 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question6 == "") {
                question6 = (jQuery("textarea").eq(5).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(5).val()) != "") {
                    question6 = question6 + ", " + (jQuery("textarea").eq(5).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 7) {
            question7 = "";
            $("input:checkbox[name=ques7]:checked").each(function () {
                if (question7 == "") {
                    question7 = $(this).parent().text();
                } else {
                    question7 = question7 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question7 == "") {
                question7 = (jQuery("textarea").eq(6).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(6).val()) != "") {
                    question7 = question7 + ", " + (jQuery("textarea").eq(6).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 8) {
            question8 = "";
            $("input:checkbox[name=ques8]:checked").each(function () {
                if (question8 == "") {
                    question8 = $(this).parent().text();
                } else {
                    question8 = question8 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question8 == "") {
                question8 = (jQuery("textarea").eq(7).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(7).val()) != "") {
                    question8 = question8 + ", " + (jQuery("textarea").eq(7).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 9) {
            question9 = "";
            $("input:checkbox[name=ques9]:checked").each(function () {
                if (question9 == "") {
                    question9 = $(this).parent().text();
                } else {
                    question9 = question9 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question9 == "") {
                question9 = (jQuery("textarea").eq(8).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(8).val()) != "") {
                    question9 = question9 + ", " + (jQuery("textarea").eq(8).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 10) {
            question10 = "";
            $("input:checkbox[name=ques10]:checked").each(function () {
                if (question10 == "") {
                    question10 = $(this).parent().text();
                } else {
                    question10 = question10 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question10 == "") {
                question10 = (jQuery("textarea").eq(9).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(9).val()) != "") {
                    question10 = question10 + ", " + (jQuery("textarea").eq(9).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 11) {
            question11 = "";
            $("input:checkbox[name=ques11]:checked").each(function () {
                if (question11 == "") {
                    question11 = $(this).parent().text();
                } else {
                    question11 = question11 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question11 == "") {
                question11 = (jQuery("textarea").eq(10).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(10).val()) != "") {
                    question11 = question11 + ", " + (jQuery("textarea").eq(10).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 12) {
            question12 = "";
            $("input:checkbox[name=ques12]:checked").each(function () {
                if (question12 == "") {
                    question12 = $(this).parent().text();
                } else {
                    question12 = question12 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question12 == "") {
                question12 = (jQuery("textarea").eq(11).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(11).val()) != "") {
                    question12 = question12 + ", " + (jQuery("textarea").eq(11).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 13) {
            question13 = "";
            $("input:checkbox[name=ques13]:checked").each(function () {
                if (question13 == "") {
                    question13 = $(this).parent().text();
                } else {
                    question13 = question13 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question13 == "") {
                question13 = (jQuery("textarea").eq(12).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(12).val()) != "") {
                    question13 = question13 + ", " + (jQuery("textarea").eq(12).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 14) {
            question14 = "";
            $("input:checkbox[name=ques14]:checked").each(function () {
                if (question14 == "") {
                    question14 = $(this).parent().text();
                } else {
                    question14 = question14 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question14 == "") {
                question14 = (jQuery("textarea").eq(13).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(13).val()) != "") {
                    question14 = question14 + ", " + (jQuery("textarea").eq(13).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 15) {
            question15 = "";
            $("input:checkbox[name=ques15]:checked").each(function () {
                if (question15 == "") {
                    question15 = $(this).parent().text();
                } else {
                    question15 = question15 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question15 == "") {
                question15 = (jQuery("textarea").eq(14).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(14).val()) != "") {
                    question15 = question15 + ", " + (jQuery("textarea").eq(14).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 16) {
            question16 = "";
            $("input:checkbox[name=ques16]:checked").each(function () {
                if (question16 == "") {
                    question16 = $(this).parent().text();
                } else {
                    question16 = question16 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question16 == "") {
                question16 = (jQuery("textarea").eq(15).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(15).val()) != "") {
                    question16 = question16 + ", " + (jQuery("textarea").eq(15).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 17) {
            question17 = "";
            $("input:checkbox[name=ques17]:checked").each(function () {
                if (question17 == "") {
                    question17 = $(this).parent().text();
                } else {
                    question17 = question17 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question17 == "") {
                question17 = (jQuery("textarea").eq(16).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(16).val()) != "") {
                    question17 = question17 + ", " + (jQuery("textarea").eq(16).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 18) {
            question18 = "";
            $("input:checkbox[name=ques18]:checked").each(function () {
                if (question18 == "") {
                    question18 = $(this).parent().text();
                } else {
                    question18 = question18 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question18 == "") {
                question18 = (jQuery("textarea").eq(17).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(17).val()) != "") {
                    question18 = question18 + ", " + (jQuery("textarea").eq(17).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 19) {
            question19 = "";
            $("input:checkbox[name=ques19]:checked").each(function () {
                if (question19 == "") {
                    question19 = $(this).parent().text();
                } else {
                    question19 = question19 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question19 == "") {
                question19 = (jQuery("textarea").eq(18).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(18).val()) != "") {
                    question19 = question19 + ", " + (jQuery("textarea").eq(18).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 20) {
            question20 = "";
            $("input:checkbox[name=ques20]:checked").each(function () {
                if (question20 == "") {
                    question20 = $(this).parent().text();
                } else {
                    question20 = question20 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question20 == "") {
                question20 = (jQuery("textarea").eq(19).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(19).val()) != "") {
                    question20 = question20 + ", " + (jQuery("textarea").eq(19).val());
                    optionCount++;
                }
            }
        } else if (slideNo == 21) {
            question21 = "";
            $("input:checkbox[name=ques21]:checked").each(function () {
                if (question21 == "") {
                    question21 = $(this).parent().text();
                } else {
                    question21 = question21 + ", " + $(this).parent().text();
                }
                optionCount++;
            });
            if (question21 == "") {
                question21 = (jQuery("textarea").eq(20).val());
                optionCount++;
            } else {
                if ((jQuery("textarea").eq(20).val()) != "") {
                    question21 = question21 + ", " + (jQuery("textarea").eq(20).val());
                    optionCount++;
                }
            }

//            if (question1 != "" && question2 != "" && question3 != "" && question4 != "" && question5 != "" && question6 != "" && question7 != "" && question8 != "" && question9 != "" && question10 != "" && question11 != "" && question12 != "" && question13 != "" && question14 != "" && question15 != "" && question16 != "" && question17 != "" && question18 != "" && question19 != "" && question20 != "" && question21 != "") {
//                $('#bar22').addClass("active");
//                $('#bar22').addClass("activeselect");
                isFinished = true;
                updateAssesmentResults();
//            }
        }

        moveBars($(this));
        var answeredCount = 0;
        $('.quiz-progress').each(function (index, obj) {
            
            if ($(obj).hasClass('active')) {
                answeredCount++;
            }
            console.log(answeredCount);
        });
        if (answeredCount == 21) {
            $('#bar22').addClass("active");
            $('#bar22').addClass("activeselect");
            $('#bar22').removeClass("select");
        }

    });

    $("#section1").show();

    /* change the colour of progress bar items when selected
     */
    $('div.quiz-progress').click(function (event) {
        $('div.quiz-progress').removeClass("select");
        $('div.quiz-progress').removeClass("activeselect");
        event.stopPropagation();

        var cls = $(this).attr('class');
        var subcls = cls.split(" ").pop();

        if (subcls == 'active') {
            $(this).addClass("activeselect");
        } else if (subcls == 'quiz-progress') {
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
        if (subcls == 'active') {
            $('#' + selectDiv).addClass("activeselect");
        } else if (subcls == 'activeselect') {
            $('#' + selectDiv).addClass("activeselect");
        } else {
            $('#' + selectDiv).addClass("select");
        }

    });

    function moveBars(slide) {
        var slideNo = $(slide).closest(".slide").attr("id");

        var slideNo = slideNo.replace(/[^\d]/g, '');
        if ($('#slide' + slideNo).find('input[name="ques' + slideNo + '"]:checked').length > 0 || $.trim($('#slide' + slideNo).find('textarea').val())) {
            $('#bar' + slideNo).addClass("active");
            $('#bar' + slideNo).removeClass("select");
            $('#bar' + slideNo).removeClass("activeselect");
        } else {
            $('#bar' + slideNo).removeClass("select");
            $('#bar' + slideNo).removeClass("activeselect");
        }
        var nxtbar = ('#bar' + (parseInt(slideNo) + 1));
        if ($(nxtbar).hasClass('active')) {
            $(nxtbar).addClass("activeselect");
        } else {
            $(nxtbar).addClass("select");
        }
    }

    function timeout(slide) {
        // to delay showing answered text. slide no is passed as an argument
        window.setTimeout(function () {
            $("#queans" + slide).show();
        }, 1000);
    }

    //send data to database if all the questions are answered
    function SendAssessmentData() {
        var toolsAssessment = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question17, question18, question19, question20, question21];

        //tools assessment is selected
        //        var IsMinus = "false";
        //        for (i = 0; i < 20; i++) {
        //            if (toolsAssessment[i] == -1) {
        //                IsMinus = "true";
        //                break;
        //            }
        //        }
        //        if (IsMinus == "false") {
        //calling insertToolsAssessmentData in orientdb.js 
        if (isFinished == true) {

            insertToolsAssessmentData(toolsAssessment);
            UpdateResultsToolsAssessment(localStorage.getItem('appName'), localStorage.getItem('serviceType'), localStorage.getItem('yourName'), localStorage.getItem('designation'));
            localStorage.setItem('ToolsAssessment', "Completed");
            // set count as one . same record will not be added again
            SessionCount = 1;
            alert("Successfully saved in the Database");
            window.location.href = 'ProcessAssessment.html';

        } else {
            alert("Please answer all the questions and come back");
        }
    }

    function checkResultsAssesment1() {
        tassesmentres = 0;

        for (i = 0; i < toolsAssessment.length; i++) {
            if (toolsAssessment[i] == -1) {
                tassesmentres = -1;
                break;
            } else {
                tassesmentres += toolsAssessment[i];
            }

        }
    }

    //update assesment results here
    function updateAssesmentResults() {
        //tools assessment        
        result = Math.round((optionCount / 67) * 100);

        $('.circlediv').html('<div class="c100 p' + result + '"><span>' + result + '%</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div>');

        if (result < 0) {
            //alert('max is zero');
            $('#text50').html('Pending Results');
            $('#text51').html('Please answer all the questions and come back');

        } else if (result < 20) {
            $('#text50').html('Regressive');
            $('#text51').html('Deployment automation tools are not utilized well and deployments may consume a lot of time and with a higher error prone rate');

        } else if (result < 40) {
            $('#text50').html('Repeatable');
            $('#text51').html('Deployment automation tools are partially utilized which has more room to improve to do deployments with less time consumed and with less errors');

        } else if (result < 60) {
            $('#text50').html('Consistent');
            $('#text51').html('Deployment automation tools are utilized to a fair level which makes the deployments consume less time with less errors');

        } else if (result < 80) {

            $('#text50').html('Quantitatively Managed');
            $('#text51').html('Deployment automation tools are managed to a fairly good level. ');
        } else {
            $('#text50').html('Optimized');
            $('#text51').html('All the necessary tools are well utilized which makes the deployment less error prone and also the deployments can be done with less time consumption');
        }

    }

    // this method called when result is clicked
    $('#list3,#bar31,#results1,#results').click(function () {
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

    $('#printID').click(function () {
        // Print PDF button when this clicked a PDF is Downloded and send data to DB
        if (SessionCount == 0) {
            SendAssessmentData();
            //            window.location.href = 'ProcessAssessment.html';
        }

        if (localStorage.getItem('ProcessAssessment') == "Completed" && localStorage.getItem('ToolsAssessment') == "Completed") {
            window.location.href = 'index.html';
        }
    });

    $(".toggle").click(function (event) {
        $(this).toggleClass('read-less');
        $(this).next('.more').toggleClass('show');
        event.preventDefault();

    });

});
