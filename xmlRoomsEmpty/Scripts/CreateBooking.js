/* DOCUMENT READY */
$(document).ready(function () {
    $.urlParam = function (name) {
        // return adults
        // used this becuase if the ordering breaks for some reason, then the code wont break
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        else {
            return results[1] || 0;
        }
    }

    var rooms = $.urlParam('rooms');
    /* Show Hotel Information on page load */
    function printHotelInfo() {
        $('#hotelInfo').append(
             "<td> " + decodeURI($.urlParam('hotelName')) + " </td>"
            + "<td> " + decodeURI($.urlParam('roomType')) + " </td>"
            + "<td> " +decodeURI( $.urlParam('mealType')) + " </td>"
            + "<td> " + decodeURI($.urlParam('price')) + " </td>"
            + "<td> " + decodeURI($.urlParam('currency')) + " </td>"
            );

    }    
    /* Depending upon the adults add the information title, fname and lname
   NOTE: we would add more fields depending upon what client wants
   */
    function addAdults() {
        var adults = $.urlParam('adults');
        for (var i = 1; i <= adults * rooms; i++) {
            $('#adults').append(
              '<div data-target="adult">'
                 + '<div>Insert info about Adult ' + i.toString() + '</div>'
                 + '<div>'
                   + '<span>Title:</span>'
                   + '<input type="text" data-target="title" />'
                 + '</div>'
                 + '<div>'
                   + '<span>Fist Name:</span>'
                   + '<input type="text" data-target="firstName"  />'
                 + '</div>'
                 + '<div>'
                   + '<span>Last Name:</span>'
                   + '<input type="text" data-target="lastName"  />'
                 + '</div>'
              + '</dvi>'
              + '<hr />'
                  );
        }
        
    }
    /* Add children info as per need */
    function addChildren() {
        var children = $.urlParam('children');
        
        if (Number(children) > 0)
            $('#children').append('<h3>Enter children details</h3>');

        for (var i = 1; i <= children * rooms; i++) {
            $('#children').append(
              '<div data-target="child">'
                 + '<div>Insert info about Child ' + i.toString() + '</div>'
                 + '<div>'
                   + '<span>Title:</span>'
                   + '<input type="text" data-target="title"  />'
                 + '</div>'
                 + '<div>'
                   + '<span>Fist Name:</span>'
                   + '<input type="text" data-target="firstName"  />'
                 + '</div>'
                 + '<div>'
                   + '<span>Last Name:</span>'
                   + '<input type="text" data-target="lastName"  />'
                 + '</div>'
                 + '<div>'
                   + '<span>Agee:</span>'
                   + '<input type="number" data-target="age"  />'
                 + '</div>'
              + '</dvi>'
              + '<hr />'
                  );
        }

    }
    /* Bind hotel info, show form elements for number of adults and children  */
    printHotelInfo();
    addAdults();
    addChildren()

    var newAdult = function () {
        return {
            title: "",
            firstName: "",
            lastName: ""
        }
    }

    var newChild = function () {
        return {
            title: "",
            firstName: "",
            lastName: "",
            age: ""
        }
    }

    var arrayAdults;
    var arraychildren;

    /* CONFIRM - FINAL BUTTON CLICK */
    
    function confirBooking() {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "bookingCreate.aspx/BookARoomRequest",
            data: "{\"adults\":" + JSON.stringify(arrayAdults) + ",\"children\":" + JSON.stringify(arrayChildren) + ", \"roomsCount\": " + rooms + " , status: \"confirm\"}",
            datatype: "json",
            success: function (result) {
                $("#loading").hide();
                /* Note: Here we will re-direct the users to the confirmation page
                    1. save the data in the database
                    2. generate a confirmation BookingID for reference
                    3. send emails to client and admin with all the details
                */
                var bookingQueryResults = " Currency: " + $(result.d).find('Currency').text()
                      + " \nBooking Id: " + $(result.d).find('Booking').find('Id:first').text()
                      + " \nCreation Date: " + $(result.d).find('Booking').find('CreationDate:first').text();


                var hotelBooking = "";

                $(result.d).find('Booking').find('HotelBooking').each(function () {
                    hotelBooking += " \n--HotelBooking--"
                    hotelBooking += " \n Id: " + $(this).find('Id').text();
                    hotelBooking += " \n Hotel Id: " + $(this).find('HotelId').text();
                    hotelBooking += " \n Hotel Name: " + $(this).find('HotelName').text();
                    hotelBooking += " \n Creation Date: " + $(this).find('CreationDate').text();
                    hotelBooking += " \n Arrival Date: " + $(this).find('ArrivalDate').text();
                    hotelBooking += " \n Nights: " + $(this).find('Nights').text();
                    hotelBooking += " \n Total Selling Price: " + $(this).find('TotalSellingPrice').attr('amt');
                    hotelBooking += " \n Status: " + $(this).find('Status:first').text();

                    $(this).find('Room').each(function () {
                        hotelBooking += " \n--Room--"
                        hotelBooking += " \n TotalSellingPrice: " + $(this).find('TotalSellingPrice').attr('amt');
                        $(this).find('NightCost').each(function(){
                            hotelBooking += " \n--NightCost-- " 
                            hotelBooking += " \nNight: " + $(this).find('Night').text();
                            hotelBooking += " \nSellingPrice: " + $(this).find('SellingPrice').attr('amt');
                        });
                        hotelBooking += " \n Room Type: " + $(this).find('RoomType').attr('text');
                        hotelBooking += " \n Meal Type: " + $(this).find('MealType').attr('text');
                        hotelBooking += "\n --Guests---";
                        $(this).find('Guests').find('Adult').each(function () {
                            hotelBooking += "\n --Adult---";
                            hotelBooking += " \n Title: " + $(this).attr('title');
                            hotelBooking += " \n First Name: " + $(this).attr('first');
                            hotelBooking += " \n Last Name: " + $(this).attr('last');
                            hotelBooking += "\n ----end adult------";
                        });

                        $(this).find('Guests').find('Child').each(function () {
                            hotelBooking += "\n --Child---";
                            hotelBooking += " \n Title: " + $(this).attr('title');
                            hotelBooking += " \n First Name: " + $(this).attr('first');
                            hotelBooking += " \n Last Name: " + $(this).attr('last');
                            hotelBooking += " \n Age: " + $(this).attr('age');
                            hotelBooking += "\n --end child--------";
                        });

                        hotelBooking += "\n --End Guests---";
                        hotelBooking += "\n --Messages---";

                        $(this).find('Messages').find('Message').each(function () {
                            hotelBooking += "\n --Message---";
                            hotelBooking += " \n Type: " + $(this).find('Type').text();
                            hotelBooking += " \n Text: " + $(this).find('Text').text();
                            hotelBooking += "\n ----end mesage------";
                        });

                        hotelBooking += "\n --End Messages---";
                        hotelBooking += " \n Status: " + $(this).find('Status').text();
                        hotelBooking += "\n --CanxFees---";
                        $(this).find('CanxFees').find('Fee').each(function () {
                            hotelBooking += " \n Fee: " + $(this).find('Amount').attr('amt');
                        });

                        hotelBooking += "\n --End CanxFees---";
                    });

                    hotelBooking += "\n --Voucher Info---";
                    hotelBooking += "\n Payable By: " + $(this).find('VoucherInfo').find('PayableBy').text();
                    hotelBooking += "\n Voucher Ref: " + $(this).find('VoucherInfo').find('VoucherRef').text();
                    hotelBooking += "\n --End Voucher Info---";
                });
                
                bookingQueryResults = bookingQueryResults + hotelBooking


                prompt(bookingQueryResults + "\nBooking Voucher Reference:", $(result.d).find('VoucherRef:first').text());
                window.location = '/';
               // $("tbody").remove();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#loading").hide();
                alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
            }
        });
    }

    /* BOOK ROOM CLICK - before final click */
    $(document).on('click', '#BookARoom', function () {
        $("#confirmBooking").hide();
        $("#loading").show();

        arrayAdults = new Array();
        arrayChildren = new Array();

        $("#adults").children("[data-target='adult']").each(function () {
            var adult = newAdult();
            adult.title = $(this).find("[data-target='title']").val();
            adult.firstName = $(this).find("[data-target='firstName']").val();
            adult.lastName = $(this).find("[data-target='lastName']").val();
            // push elements in array
            arrayAdults.push(adult);
        });

        $("#children").children("[data-target='child']").each(function () {
            var child = newChild();
            child.title = $(this).find("[data-target='title']").val();
            child.firstName = $(this).find("[data-target='firstName']").val();
            child.lastName = $(this).find("[data-target='lastName']").val();
            child.age = $(this).find("[data-target='age']").val();
            // push elements in array
            arrayChildren.push(child);
        });
        // ajax
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "bookingCreate.aspx/BookARoomRequest",
            data: "{\"adults\":" + JSON.stringify(arrayAdults) + ",\"children\":" + JSON.stringify(arrayChildren) + ", \"roomsCount\": " + rooms + " , status: \"prepare\"}",
            datatype: "json",
            success: function (result) {
                /* IF ERROR - a code was returned, then stop everything */
                if ($(result.d).find('Code').text() != "") {
                    alert(result.d);
                    return;
                }
                /* EVERYTHING OK - but no data found */
                if ($(result.d).find('Booking').length == 0) {
                    $("#tableResults > tbody").html("<tr><th>No data found</th></tr>");
                    return;
                }
                /* Now call the confirm boooking function for the final status change */
                confirBooking();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#loading").hide();
                alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
            }
        });
    });

    /* This is not being used for the time being, as I have merged both th functions together now */
    /* CONFIRM - FINAL BUTTON CLICK */
    $(document).on('click', '#confirmBooking', function () {
        $("#confirmBooking").hide();
        $("#loading").show();

        confirBooking();

    });
});