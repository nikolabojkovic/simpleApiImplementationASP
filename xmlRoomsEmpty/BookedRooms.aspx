<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BookedRooms.aspx.cs" Inherits="xmlRoomsEmpty.BookedRooms" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Booked Rooms</title>
</head>
<body>
    <h2>Search Booked Rooms</h2>
        <a href='<%= ResolveUrl("~/Default.aspx") %>'>Back</a>

    <div>
        <span>Guest Name:</span>
        <input type="text" id="guestName" />
    </div><br /><br />
     <div>
        <span>Voucher Reference:</span>
        <input type="text" id="bookingId" />
    </div>
    <div>
        <input type="button" value="Search" class="btn btn-primary" id="Search" />
    </div>
    <div hidden id="loading"><img src="img/Loading_icon.gif" alt="Loading, please wait..." /></div>
    <div id="results">
        <table id="bookingResults">
            <tbody></tbody>
        </table>
        <br /> <br />
        <div>Rooms</div>
        <table id ="roomsResult">
             <tbody></tbody>
        </table>
    </div>

    <script src='<%= ResolveUrl("~/Scripts/Data/DestinationList.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/Shared.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/General/jquery-1.10.2.js") %>'></script>
    <script src='<%= ResolveUrl("~/Scripts/BookedRooms.js") %>'></script>
</body>
</html>
