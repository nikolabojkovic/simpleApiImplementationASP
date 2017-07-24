function renderTable(result) {

    // insert table header
    $("#bookingResults > tbody").html("<tr><th>Hotel Name</th>"
                                  + "<th>Creational Date</th>"
                                  + "<th>Arrival Date</th>"
                                  + "<th>Nights</th>"
                                  + "<th>Total Selling Price</th>"
                                  + "<th>Status</th>"
                                  + "<th>Voucher Info</th>"
                                  + "</tr>");

    $("#roomsResult > tbody").html("<tr><th>Total Selling Price</th>"
                                  + "<th>Night Cost</th>"
                                  + "<th>Room Type</th>"
                                  + "<th>Meal Type</th>"
                                  + "<th>Guests</th>"
                                  + "<th>Messages</th>"
                                  + "<th>Status</th>"
                                  + "</tr>");

    // insert booking data

    var hotelInfo = "";

    var countBooking = 0;
    // show hotel booking for each room
    $(result.d).find('Booking').find('HotelBooking').each(function () {
        // if (countBooking===0)
        hotelInfo += "<tr><td>" + $(this).find("HotelName").text() + "</td>"
                                  + "<td>" + $(this).find("CreationDate").text() + "</td>"
                                  + "<td>" + $(this).find("ArrivalDate").text() + "</td>"
                                  + "<td>" + $(this).find("Nights").text() + "</td>"
                                  + "<td>" + $(this).find("TotalSellingPrice").attr('amt') + "</td>"
                                  + "<td>" + $(this).find("Status:first").text() + "</td>"
                                  + "<td> Payable By:" + $(this).find('VoucherInfo').find('PayableBy').text()
                                      + " Voucher Ref: " + $(this).find('VoucherInfo').find('VoucherRef').text()
                                  + "</tr>";

        //countBooking++;
    });

    $("#bookingResults > tbody").append(hotelInfo);

    // insert rooms
    var rooms = $(result.d).find('Booking').find('HotelBooking').find("Room")
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
                      + "<td>" + $(this).find('NightCost').find('SellingPrice').attr('amt') + "</td>"
                      + "<td>" + $(this).find('RoomType').attr('text') + "</td>"
                      + "<td>" + $(this).find('MealType').attr('text') + "</td>"
                      + "<td>";
        if (adults !== "")
            finalString += "Adults: " + adults;

        if (children !== "")
            finalString += " Childrend: " + children;

        finalString += "</td>"
                      + "<td>" + $(this).find('Messages').text() + "</td>"
                      + "<td>" + $(this).find('Status').text() + "</td>"
                      + "</tr>";
        $("#roomsResult > tbody").append(finalString);

    });
}