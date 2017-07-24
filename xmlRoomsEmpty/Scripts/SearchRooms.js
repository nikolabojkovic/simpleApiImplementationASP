$(document).ready(function () {
   
    // set default arrval date
    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    $('#arrivalDate').val(new Date().toDateInputValue());

    var calculateCheckOut = function () {
        var date = new Date($('#arrivalDate').val());
        var year = Number(date.getFullYear());
        var month = Number(date.getMonth());
        var numberOfDaysToAdd = Number($("#nights").val());

        date.setDate(date.getDate() + numberOfDaysToAdd);
        $('#checkOut').text(date.toString().substring(0, 15));
    };

    calculateCheckOut();

    // set controls

    // create country drop down list
    var showCountries = function () {
        CountryListArray.sort(function (a, b) {
            return a[0].localeCompare(b[0]);
        });

        for (item in CountryListArray)
            $("#country").append('<option value="' + CountryListArray[item][1] + '">' + CountryListArray[item][0] + '</option>');
    };

    // create city drop down list 
    var showCities = function (countryId) {
        RegionListArray.sort(function (a, b) {
            return a[2].localeCompare(b[2]);
        });

        $("#city").html('<option value="0" selected="selected">Select City</option>');

        for (item in RegionListArray) {
            if (RegionListArray[item][0] == countryId)
                $("#city").append('<option value="' + RegionListArray[item][1] + '">' + RegionListArray[item][2] + '</option>');
        }
    };

    // fill nationality drop donw list 
    var showNationalities = function () {
        NationalityListArray.sort(function (a, b) {
            return a[0].localeCompare(b[0]);
        });

        for (item in NationalityListArray)
            $("#nationality").append('<option value="' + NationalityListArray[item][1] + '">' + NationalityListArray[item][0] + '</option>');
    };

    (function () {
        showCountries();
        showCities($("#country option:selected").attr('value'));
        showNationalities();
    })();

    // show cities for selected country
    $(document).on('change', '#country', function () {
        showCities($("#country option:selected").attr('value'));
    });

    //change meal type and price for selected room type in a specific hotel
    $(document).on('change', '.rooms', function () {
        changeMailType($(this).attr('data-hotel-id'), $(this).find(":selected").attr('data-result'));

    });

    var changeMailType = function (hotelId, dataResult) {
        var rooms = hotels.find(x => x.hotelId === hotelId).rooms;
        var mealType = rooms.find(x => x.roomResult === dataResult).mealType;
        var price = rooms.find(x => x.roomResult === dataResult).price;
        $("#" + hotelId).children("[data-target='mealType']").text(mealType);
        $("#" + hotelId).children("[data-target='price']").text(price);
    };

    //date changed then calculate check out
    $(document).on('change', '#arrivalDate', function () {
        calculateCheckOut()
    });

    //nights changed then calculate check out
    $(document).on('change', '#nights', function () {
        calculateCheckOut();
    });

    // end set controls


    // objects and arrays
    // get hotel stars !!NEW CODE!!
    var hotels = new Array();
    function newHotelAvailability(){
        return {
            hotelId: 0,
            stars: 0,
            hotelName : "",
            rooms : new Array()
        }
    }

    function newRoom() {
        return {
            roomResult: 0,
            roomCode: 0,
            roomType: "",
            mealCode: 0,
            mealType: "",
            price: 0
        }
    }

    // get parameters for search
    var getParameters = function () {
        return {
            nights: nights = $("#nights").val(),
            rooms: $('#rooms').val(),
            adults: $('#adults').val(),
            children: $('#children').val(),
            childAge: $('#childAge').val(),
            arrivalDate: $('#arrivalDate').val(),
            nationality: $('#nationality').val(),
            regionId: $('#city').val(),
            hotelName: $('#hotelName').val(),
            minStars: $('#minStars').val(),
            minPrice: $('#minPrice').val(),
            maxPrice: $('#maxPrice').val(),
            availabilityStatus: $('#availabilityStatus').val()
        };
    }

    //validation requred fileds
    var validateRequiredFileds = function () {
        var parameters = {
            regionId: Number($('#country option:selected').attr('value')),
            destionationId: Number($('#city option:selected').attr('value')),
            nationalityId: Number($('#nationality option:selected').attr('value')),
            children: Number($('#children').val()),
            childAge: Number($('#childAge').val())
        };

        if (parameters.regionId === 0) {
            alert("Value for Country is required. Please select a country");
            return false;
        }
        
        if (parameters.destionationId === 0) {
            alert("Value for City is required. Please select a city");
            return false;
        }

        if (parameters.nationalityId === 0) {
            alert("Value for Nationality is required. Please select a nationality");
            return false
        }

        if (parameters.children !== 0 && parameters.childAge == 0) {
            alert("Value for Child Age is required. Please enter child age");
            return false
        }

        return true;
    }

    // search event
    $("#Search").click(function () {

        if (!validateRequiredFileds())
            return;

        // show loading gif
        $("#loading").show();

        // reset table content
        $("#tableResults > tbody").html("");

        // get fields values - binding should be used here 
        var parameters = getParameters();

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "AvailabilitySearch.aspx/Search",
            data: JSON.stringify(parameters),
            datatype: "json",
            success: function (result) {
                // hide loading gif
                $("#loading").hide();

                // if server error rised show error and skip everyting else
                if ($(result.d).find('Code').text() != "") {
                    alert(result.d);
                    return;
                }
            
                // if no data found, show text not found 
                if ($(result.d).find('HotelAvailability').length == 0) {
                    $("#tableResults > tbody").html("<tr><th>No data found</th></tr>");
                    return;
                }

                // insert table header
                $("#tableResults > tbody").html("<tr><th>Hotel Name</th><th>Stars</th><th>Room Type</th><th>Meal Type:</th><th>Price:</th><th></th></tr>");

                var currency = $(result.d).find('Currency').text();

                // loop trough hotels 
                $(result.d).find('HotelAvailability').each(function (index) {
                    var HotelAvailability = newHotelAvailability();
                    HotelAvailability.hotelId = $(this).find('Hotel').attr("id");

                    //// get hotel stars !!NEW CODE!!
                    //jQuery.ajax({
                    //    type: "POST",
                    //    contentType: "application/json; charset=utf-8",
                    //    url: "BookedRooms.aspx/GetHotelDetails",
                    //    data: JSON.stringify({ id: HotelAvailability.hotelId }),
                    //    datatype: "json",
                    //    success: function (result) {
                    //        alert(result.d);
                    //        HotelAvailability.stars = $(result.d).find('Stars').text();
                    //    },
                    //    async: false
                    //});

                    HotelAvailability.hotelName = $(this).find('Hotel').attr("name");

                    // rooms drop down
                    var roomsElement = "";
                    roomsElement += "<select data-hotel-id='" + HotelAvailability.hotelId + "' class='rooms'>";

                    // loop trough rooms 
                    $(this).find('Result').each(function (index) {
                        var Room = newRoom();
                        Room.roomResult = $(this).attr('id');
                        Room.roomCode = $(this).find('Room').find('RoomType').attr('code');
                        Room.roomType = $(this).find('Room').find('RoomType').attr('text');
                        Room.mealCode = $(this).find('Room').find('MealType').attr('code');
                        Room.mealType = $(this).find('Room').find('MealType').attr('text');
                        Room.price = $(this).find('Room').find('Price').attr('amt');

                        HotelAvailability.rooms.push(Room);

                        //create rooms drop down options
                        roomsElement += "<option value='" + Room.roomCode
                                         + "' data-result ='" + Room.roomResult + "'>"
                                         + Room.roomType
                                      + "</option>";
                    });

                    hotels.push(HotelAvailability);

                    roomsElement += "</select>";

                    // insert content into the table 
                    $("#tableResults > tbody").append(
                                        "<tr id = '" + HotelAvailability.hotelId + "'>"
                                           + "<td data-target='hotelName'>" + HotelAvailability.hotelName + "</td>"
                                           // get hotel stars !!NEW CODE!!
                                           + "<td data-target='hotelStars'>" + HotelAvailability.stars + "</td>"
                                           + "<td data-target='roomType'>" + roomsElement + "</td>"
                                           + "<td data-target='mealType'>" + HotelAvailability.rooms[0].mealType + "</td>"
                                           + "<td data-target='price'>" + HotelAvailability.rooms[0].price + "</td>"
                                           + "<td data-target='currency'>" + currency + "</td>"
                                           + "<td><button data-hotel-id='" + HotelAvailability.hotelId
                                           + "' class='btn btn-danger bookARoomButton'>Book a room</button></td>"
                                       + "</tr>");
                });

                console.log(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // hide loading gif
                $("#loading").hide();
                alert("Status: " + textStatus); alert("Error: " + XMLHttpRequest.responseText);
            }
        });
    });

    // go to booking
    $(document).on('click', '.bookARoomButton', function () {
        var hotelId = $(this).attr("data-hotel-id");
        var hotelName = $("#" + hotelId).children("[data-target='hotelName']").text();
        var price = $("#" + hotelId).children("[data-target='price']").text();
        var mealType = $("#" + hotelId).children("[data-target='mealType']").text();
        var roomType = $("#" + hotelId).children("[data-target='roomType']").find(":selected").text();
        var dataResult = $("#" + hotelId).children("[data-target='roomType']").find(":selected").attr('data-result');
        var currency = $("#" + hotelId).children("[data-target='currency']").text();

        var adults = getParameters().adults;
        var children = getParameters().children
        var rooms = getParameters().rooms;
        window.location.href = "BookingCreate.aspx?hotelId=" + hotelId + "&hotelName="+ hotelName + "&roomType="+ roomType + "&mealType=" + mealType + "&price=" + price + "&dataResult=" + dataResult + "&currency=" + currency + "&adults=" + adults + "&children=" + children +"&rooms="+rooms;
    });
    
});