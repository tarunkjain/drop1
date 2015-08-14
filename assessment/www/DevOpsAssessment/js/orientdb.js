var dburi = 'http://localhost:2480/DevOpsAssessment';
var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() ;

function insertProcessAssessmentData(assesment, assResultsStr) {
    var database = new ODatabase(dburi);
    databaseInfo = database.open('root', 'admin');

    var values = "";
    var columnNames = "";
    for (i = 1; i <= 30; i++) {
        columnNames += "q" + i + ",";
        values += assesment[i - 1] + ",";
    }

    for (i = 1; i <= 5; i++) {
        columnNames += "a" + i + ",";
    }
    values += assResultsStr;

    values = values.substring(0, values.length - 1);
    columnNames = columnNames.substring(0, columnNames.length - 1);

    commandResult = database.executeCommand("insert into ProcessAssessment(" + columnNames + ") values (" + values + ")");

}

function insertToolsAssessmentData(assesment) {
    var database = new ODatabase(dburi);
    databaseInfo = database.open('root', 'admin');

    var values = "";
    var columnNames = "";
    for (i = 1; i <= 21; i++) {
        columnNames += "q" + i + ",";
        values += assesment[i - 1] + ",";
    }

    values = values.substring(0, values.length - 1);
    columnNames = columnNames.substring(0, columnNames.length - 1);

//    commandResult = database.executeCommand("insert into ToolsAssessment(" + columnNames + ") values ('" + values + "')");
     commandResult = database.executeCommand("insert into ToolsAssessment(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,q21) values ('" +assesment[0]+"','" +assesment[1]+"','" +assesment[2]+"','" +assesment[3]+"','" +assesment[4]+"','" +assesment[5]+"','" +assesment[6]+"','" +assesment[7]+"','" +assesment[8]+"','" +assesment[9]+"','" +assesment[10]+"','" +assesment[11]+"','" +assesment[12]+"','" +assesment[13]+"','" +assesment[14]+"','" +assesment[15]+"','" +assesment[16]+"','" +assesment[17]+"','" +assesment[18]+"','" +assesment[19]+"','" +assesment[20]+"')");
//        console.log(commandResult);

}

//function insertToolsAssessmentData(assesment) {
//    var database = new ODatabase(dburi);
//    databaseInfo = database.open('root', 'admin');
//
//    var values = "";
//    var columnNames = "";
//    for (i = 1; i <= 20; i++) {
//        columnNames += "q" + i + ",";
//        values += assesment[i - 1] + ",";
//    }
//        
//console.log(assesment);
//    values = values.substring(0, values.length - 1);
//    columnNames = columnNames.substring(0, columnNames.length - 1);
//    commandResult = database.executeCommand("insert into ToolsAssessment(" + columnNames + ") values (" + values + ")");
//
//
//}


//categoryNum = 0,1,2,3,4
function getPrecentageAss(assValue, categoryNum) {
    var database = new ODatabase(dburi);
    databaseInfo = database.open('root', 'admin');

    var columnName = "";

    if (categoryNum == 0) {
        columnName = "a1"
    } else if (categoryNum == 1) {
        columnName = "a2"
    } else if (categoryNum == 2) {
        columnName = "a3"
    } else if (categoryNum == 3) {
        columnName = "a4"
    } else if (categoryNum == 4) {
        columnName = "a5"
    }

    queryResult1 = database.query("select count(*) from AssessmentResults");
    queryResult2 = database.query("select count(" + columnName + ") from AssessmentResults where " + columnName + " = " + assValue + "");
    var allDataCount = queryResult1.result[0].count;
    var columnDataCount = queryResult2.result[0].count;


    return (100 / allDataCount) * columnDataCount;
}

function UpdateResultsProcessAssessment(appName, serviceType, userName, userRole) {

    var assessmentType = localStorage.assessment;

    var database = new ODatabase(dburi);
    databaseInfo = database.open('root', 'admin');

    queryMaxRow = database.query("select max(@rid) from ProcessAssessment");
    var RowID = queryMaxRow.result[0].max;

    queryResultUpdate = database.executeCommand("update ProcessAssessment set Date_Time ='"+datetime+"', Applications='" + appName + "', ITService='" + serviceType + "', Username='" + userName + "', UserRole='" + userRole + "' UPSERT WHERE @rid= " + RowID + "");


}

function UpdateResultsToolsAssessment(appName, serviceType, userName, userRole) {

    var assessmentType = localStorage.assessment;

    var database = new ODatabase(dburi);
    databaseInfo = database.open('root', 'admin');

    queryMaxRow = database.query("select max(@rid) from ToolsAssessment");
    var RowID = queryMaxRow.result[0].max;

    queryResultUpdate = database.executeCommand("update ToolsAssessment set Date_Time ='"+datetime+"', Applications='" + appName + "', ITService='" + serviceType + "', Username='" + userName + "', UserRole='" + userRole + "' UPSERT WHERE @rid= " + RowID + "");

}


