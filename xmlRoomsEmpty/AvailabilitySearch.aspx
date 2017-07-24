<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AvailabilitySearch.aspx.cs" Inherits="xmlRoomsEmpty.AvailabilitySearch" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>Availability Search</title>
    <link href="~/css/site.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <h2>Availability Search</h2>
    <a href='<%= ResolveUrl("~/Default.aspx") %>'>Back</a>
        <h3>Accommodation Search</h3>
    <div id="searchpage">
                <div>
            <span>Country:</span><span class="required">*</span>
            <select id="country">
                <option value="0" selected="selected">Select Country</option>
            </select>
        </div>
        <div>
            <span>Destination:</span><span class="required">*</span>
            <select id="city">
                <option value="0" selected="selected">Select City</option>
            </select>
        </div>
        <div>
            <span>Check In:</span><span class="required">*</span>
            <input type="date" id="arrivalDate" required />
        </div>
        <div>
             <span> Nights:</span><span class="required">*</span>
             <input type="number" value="1" name="nights" id="nights" required/>
        </div>
        <div>
            <span>Check Out:</span>
            <span id="checkOut"></span>
        </div>
        <div>
            <span>Guest Nationality:</span>
            <select id="nationality">
                 <option value="0" selected="selected">Select Nationality</option>
            </select>
        </div>
        <div>
            <span>Star:</span>
            <select id="minStars" >
                <option value="0" selected="selected">Show All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
        </div>
        <div>
            <span>Room(s): </span><span class="required">*</span>
            <input type="number" value="1" name="rooms" id="rooms"  required />
        </div>
        <div>
             <span>Adults:</span><span class="required">*</span>
            <input type="number" value="1" name="adults" id="adults" required  />
        </div>
        <div>
            <span>Children:</span>
            <input type="number" id="children" />
        </div>
        <div>
            <span>Child age:</span>
            <input type="number" id="childAge" />
        </div>
        <div>
            <span>Hotel Name:</span>
            <input type="text" id="hotelName" />
        </div>
        <div>
            <span>Minimal price:</span>
            <input type="number" id="minPrice" />
        </div>
        <div>
            <span>Maximal price:</span>
            <input type="number" id="maxPrice" />
        </div>
        <div>
            <span>Availability status:</span>
            <input type="text" id="availabilityStatus" />
        </div>

        <div>  
            <input type="button" value="Search" class="btn btn-primary" id="Search" />
        </div>
    </div>
    <div hidden id="loading"><img src="img/Loading_icon.gif" alt="Loading, please wait..." /></div>
    <div id="results">
        <table id="tableResults">
            <tbody></tbody>
        </table>
    </div>

    <script src='<%= ResolveUrl("~/Scripts/General/jquery-1.10.2.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/Data/CountryList.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/Data/DestinationList.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/Data/NationalityList.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/SearchRooms.js") %>'></script>
</body>
</html>
