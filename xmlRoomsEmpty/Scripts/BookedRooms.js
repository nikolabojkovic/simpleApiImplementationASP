$(document).ready(function () {

    // data for binding 
    var bindingData = "";

    var newBookingDetails = function () {
        return {
            id: 0,
            status: "",
            guestName: "",
            currency: ""
        }
    };
    /* Declare variables */
    var BookingDetails;
    var BookingArray = new Array();
    /* Search Click working */
    $(document).on('click', '#Search', function () {
        $("#confirmBooking").hide();
        $("#loading").show();
        var guestName = $("#guestName").val();
        var id = $("#bookingId").val();
        // ajax
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "BookedRooms.aspx/SearchBooking",
            data: JSON.stringify({ guestName: guestName, id: id }),
            datatype: "json",
            success: function (result) {
                // data for binding stored in variable - used latet when show details button has been called
                bindingData = result.d;
                //alert(bindingData);
                $("#loading").hide();
                //console.log(result.d);
                /* IF ERROR - a code was returned, then stop everything */
                if ($(result.d).find('Code').text() != "") {
                    alert(result.d);
                    return;
                }
                /* EVERYTHING OK - but no data found */
                if ($(result.d).find('Booking').length == 0) {
                    $("#bookedResult > tbody").html("<tr><th>No data found</th></tr>");
                    return;
                }
                /* Bind the table information
                    1. Hotel Information
                    2. Arival Info
                */
                $("#bookingResults > tbody").html(
                                              + "<tr>"
                                                  + "<th>Hotel Details</th>"
                                                  + "<th>Creational Date</th>"
                                                  + "<th>Arrival Date</th>"
                                                  + "<th>Nights</th>"
                                                  + "<th>Total Selling Price</th>"
                                                  + "<th>Status</th>"
                                                  + "<th></th>"
                                                  + "<th></th>"
                                                  + "<th>Booking Id</th>"
                                              + "</tr>");

                /*Declare Variables */
                var hotelInfo = "";
                var countBooking = 0;
                /* Bind Info here */
                $(result.d).find('Booking').find('HotelBooking').each(function () {
                    BookingDetails = newBookingDetails();
                     //BookingDetails.id = $(this).find("id").text(); 
                    BookingDetails.id = $(this).parent().find("id:first").text();
                    BookingDetails.status = $(this).find("Status").text();
                    BookingDetails.currency = $(result.d).find('Currency').text();
                    BookingArray.push(BookingDetails);

                    var hotelId = $(this).find("HotelId").text();

                    /* MISSING: need to add if no data, means count is zero. */
                    hotelInfo += "<tr data-target=" + BookingDetails.id + ">"
                                              + "<td class='" + hotelId + "' data-target='hotelDetails'></td>"
                                              + "<td>" + $(this).find("CreationDate").text() + "</td>"
                                              + "<td>" + $(this).find("ArrivalDate").text() + "</td>"
                                              + "<td>" + $(this).find("Nights").text() + "</td>"
                                              + "<td>" + $(this).find("TotalSellingPrice").attr('amt') + "</td>"
                                              + "<td>" + $(this).find("Status:first").text() + "</td>"
                                              + '<td><button data-value="' + BookingDetails.id + '" class="viewBookingDetails">View Details</button></td>'
                                              + '<td><button data-value="' + BookingDetails.id + '" class="cancelBooking">Cancel Booking</button></td>'
                                              + '<td>' + BookingDetails.id + '</td>'
                                            + "</tr>";

                    // get hotel details from xml and display in one column

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "BookedRooms.aspx/GetHotelDetails",
                        data: JSON.stringify({ id: hotelId }),
                        datatype: "json",
                        success: function (result) {
                            if ($(result.d).find('Error').length != 0) {
                                $('.' + hotelId).html(result.d);
                                return;
                            }

                            var hotelDetails = "-----------------------------<br />";
                            hotelDetails += "Name: " + $(result.d).find('Name').text();
                            hotelDetails += "<br />Region: " + $(result.d).find('Region').find('Name').text();

                            //for (item in RegionListArray) {
                            //    if (RegionListArray[item][0] == $(result.d).find('Region').find('CityId').text())
                            //        hotelDetails += "\nCity: " + RegionListArray[item][2];
                            //}

                            hotelDetails += "<br />Type: " + $(result.d).find('Type').text();
                            hotelDetails += "<br />---Address--- ";
                            hotelDetails += "<br />Address1: " + $(result.d).find('Address').find('Address1').text();
                            hotelDetails += "<br />Address2: " + $(result.d).find('Address').find('Address2').text();
                            hotelDetails += "<br />Address3: " + $(result.d).find('Address').find('Address3').text();
                            hotelDetails += "<br />City: " + $(result.d).find('Address').find('City').text();
                            hotelDetails += "<br />State: " + $(result.d).find('Address').find('State').text();
                            hotelDetails += "<br />Zip: " + $(result.d).find('Address').find('Zip').text();
                            hotelDetails += "<br />Country: " + $(result.d).find('Address').find('Country').text();
                            hotelDetails += "<br />Tel: " + $(result.d).find('Address').find('Tel').text();
                            hotelDetails += "<br />Fax: " + $(result.d).find('Address').find('Fax').text();
                            hotelDetails += "<br />Email: " + $(result.d).find('Address').find('Email').text();
                            hotelDetails += "<br />Url: " + $(result.d).find('Address').find('Url').text();

                            hotelDetails += "<br />Stars: " + $(result.d).find('Stars').text();
                            hotelDetails += "<br />---GeneralInfo--- ";
                            hotelDetails += "<br />Latitude: " + $(result.d).find('GeneralInfo').find('Latitude').text();
                            hotelDetails += "<br />Longitude: " + $(result.d).find('GeneralInfo').find('Longitude').text();
                            hotelDetails += "<br />---End GeneralInfo--- ";
                            $(result.d).find('Photo').each(function () {
                                hotelDetails += "<br /><img src='http://roomsxml.com" + $(this).find('Url').text() + "' ";
                                hotelDetails += " width=" + $(this).find('Width').text() + " height=" + $(this).find('Height').text()
                                                + "/>";
                            });
                            $(result.d).find('Description').each(function () {
                                hotelDetails += "<br />---Description--- ";
                                hotelDetails += "<br />Type: " + $(this).find('Type').text();
                                hotelDetails += "<br />Text: " + $(this).find('Text').text();
                                hotelDetails += "<br />---End Description--- ";
                            });

                            $(result.d).find('Amenity').each(function () {
                                hotelDetails += "<br />Amenity: " + $(this).find('Text').text();
                            });

                            hotelDetails += "<br />---Rating--- ";
                            hotelDetails += "<br />System: " + $(result.d).find('Rating').find('System').text();
                            hotelDetails += "<br />Score: " + $(result.d).find('Rating').find('Score').text();
                            hotelDetails += "<br />Description: " + $(result.d).find('Rating').find('Description').text();
                            hotelDetails += "<br />---End Rating--- ";
                            hotelDetails += "<br /> Rank: " + $(result.d).find('Rank').text();

                            $('.' + hotelId).html(hotelDetails);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $("#loading").hide();
                            alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
                        }
                    });

                    // end get hotel details 
                });

                $("#bookingResults > tbody").append(hotelInfo);
              
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#loading").hide();
                alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
            }
        });
    });
    // cancel booking, this isn't to be used right now, need to discuss with client first
    // for admin purpose only
    $(document).on('click', '.cancelBooking', function () {
        var bookingId = $(this).attr("data-value");
        alert(bookingId);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "BookedRooms.aspx/cancelBooking",
            data: JSON.stringify({ id: bookingId, status: 'prepare', currency: BookingDetails.currency }),
            datatype: "json",
            success: function (result) {
                $("#loading").hide();
                alert(result.d);
                var confirmation = confirm("Are you sure that you want to cancel?");
               
                if (confirmation)
                {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "BookedRooms.aspx/cancelBooking",
                        data: JSON.stringify({ id: bookingId, status: 'confirm', currency: BookingDetails.currency }),
                        datatype: "json",
                        success: function (result) {
                            alert(result.d);
                            $("tbody").children("[data-target='" + bookingId + "']").remove();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $("#loading").hide();
                            alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#loading").hide();
                alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
            }
        });
    });

    $(document).on('click', '.viewBookingDetails', function () {

        $("#roomsResult > tbody").html("<tr><th>Total Selling Price</th>"
                               + "<th>Guests</th>"
                               + "<th>Canx Fees</th>"
                               + "<th>Messages</th>"
                               + "<th>Status</th>"
                               + "</tr>");

        var hotelBookingId = $(this).attr("data-value");
        /* Guest Information on thhe basis of Booking Vaoucher Info -  NOT COMPLETED YET */
        $(bindingData).find('Booking').find('HotelBooking').each(function () {

            // skip if data is not related to selected booking info
            if ($(this).find('id').text() !== hotelBookingId)
                return;

            var rooms = $(this).find("Room");
            $(rooms).each(function (index) {

                var adults = "";
                var counter = 0;
                var children = "";
                $(this).find('Guests').find('Adult').each(function (index) {

                    if (counter != 0)
                        adults += ", " + $(this).attr('title') + " ";
                    else
                        adults += $(this).attr('title') + " ";

                    adults += $(this).attr('first') + " "
                            + $(this).attr('last') + " ";
                    counter++;
                });

                counter = 0;
                $(this).find('Guests').find('Child').each(function (index) {

                    if (counter != 0)
                        children += ", " + $(this).attr('title') + " ";
                    else
                        children += $(this).attr('title') + " ";

                    children += $(this).attr('first') + " "
                            + $(this).attr('last') + " "
                            + $(this).attr('age') + " years"
                    counter++;
                });

                var finalString = "<tr><td>" + $(this).find('TotalSellingPrice').attr('amt') + "</td>"
                              + "<td>";
                if (adults !== "")
                    finalString += "Adults: " + adults;

                if (children !== "")
                    finalString += " Childrend: " + children;

                finalString += "</td>"
                              + "<td>"
                              + $(this).find('CanxFees').find('Fee').find('Amount').attr('amt')
                              + "</td>"
                              + "<td>" + $(this).find('Messages').find('Text').text() + "</td>"
                              + "<td>" + $(this).find('Status').text() + "</td>"
                              + "</tr>";
                $("#roomsResult > tbody").append(finalString);

            });
        });

        $("html, body").animate({ scrollTop: $("#roomsResult").offset().top }, 500);
    });
});