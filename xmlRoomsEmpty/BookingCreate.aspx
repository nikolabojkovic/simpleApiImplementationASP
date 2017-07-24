<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BookingCreate.aspx.cs" Inherits="xmlRoomsEmpty.BookingCreate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Booking Create</title>
    <link href="~/css/site.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <h2>Booking Create</h2>
    <a href='<%= ResolveUrl("~/Default.aspx") %>'>Back</a>
    
    <div>
        <table>
            <tbody>
                <tr>
                    <th>Hotel Name</th>
                    <th>Room Type</th>
                    <th>Meal Type</th>
                    <th>Price</th>
                    <th>Currency</th>
                </tr>
                <tr id="hotelInfo"></tr>
            </tbody>
        </table>
    </div>
    <div id="rooms">
        <h3>Enter adults details</h3>
        <div id="adults"></div>
                
        <div id="children"></div>
    </div>
    <div>
        <input type="button" value="Sumbit" class="btn btn-primary" id="BookARoom" />
    </div>
    <div hidden id="loading"><img src="img/Loading_icon.gif" alt="Loading, please wait..." /></div>
    <div id="results">
    <%--    <table id="bookingResults">
            <tbody></tbody>
        </table>
        <br /> <br />
        <div>Rooms</div>
        <table id ="roomsResult">
             <tbody></tbody>
        </table>--%>
    </div>
    <button hidden id="confirmBooking">Confirm Booking</button>

    <script src='<%= ResolveUrl("~/Scripts/Shared.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/General/jquery-1.10.2.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/CreateBooking.js") %>'></script>
</body>
</html>
