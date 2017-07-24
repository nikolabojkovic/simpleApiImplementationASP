using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace xmlRoomsEmpty
{
    public partial class BookedRooms : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string SearchBooking(string guestName, string id) {

            string xmlPacket = "";

            xmlPacket += "<BookingQuery>";
            xmlPacket += "<Authority xmlns=\'http://www.reservwire.com/namespace/WebServices/Xml\'>";
            xmlPacket += "<Org>SampleRequest</Org>";
            xmlPacket += "<User>SampleRequest</User>";
            xmlPacket += "<Password>demo123</Password>";
            xmlPacket += "<Currency>USD</Currency>";
            xmlPacket += "<Language>en</Language>";
            xmlPacket += "<TestDebug>false</TestDebug>";
            xmlPacket += "<Version>1.25</Version>";
            xmlPacket += "</Authority>";
            xmlPacket += "<DetailLevel>summary</DetailLevel>";
            //   xmlPacket += "<DataSource><DataSource>";
            xmlPacket += "<QueryParams>";

            if (!string.IsNullOrEmpty(id))
               xmlPacket += "<BookingId>" + id + "</BookingId>";

            //xmlPacket += "< BookingId>(optional)
            //< BookingItemId>(optional)
            //<HotelStayDate>(optional)
            //<HotelStayDateEndRange>(optional)
            //<BookingCreatedDate>(optional)
            //<BookingCreatedDateEndRange>(optional)
            //<BookingModifiedDate>(optional)
            //<BookingModifiedDateEndRange>(optional)
            //<CustomerName>(optional)
            if (!string.IsNullOrEmpty(guestName))
                xmlPacket += "<GuestName>" + guestName + "</GuestName>"; // (optional)
            //< HotelName>or<HotelId>(both optional)
            //<RegionName>or<RegionId>(both optional)
            //<Supplier>(optional)
            //if (!string.IsNullOrEmpty(supplierBookingRef))
            //    xmlPacket += "<SupplierBookingRef>" + supplierBookingRef + "</SupplierBookingRef>";
            xmlPacket += "</QueryParams>";
            xmlPacket += "</BookingQuery>";
            return XmlRequest.SendXMLRequest(xmlPacket);
        }

        [WebMethod]
        public static string cancelBooking(int id, string status, string currency)
        {
            string xmlPacket = "";
            xmlPacket += "<BookingCancel xmlns=\"http://www.reservwire.com/namespace/WebServices/Xml\">"
                       + "<Authority xmlns=\"http://www.reservwire.com/namespace/WebServices/Xml\">"
                             + "<Org>SampleRequest</Org>"
                             + "<User>SampleRequest</User>"
                             + "<Password>demo123</Password>"
                             + "<Currency>" + currency + "</Currency>"
                             + "<Version>1.25</Version>"
                        + "</Authority>";
            xmlPacket += "<BookingId>" + id + "</BookingId>";
            xmlPacket += "<CommitLevel>" + status + "</CommitLevel>";
            xmlPacket += "</BookingCancel>";

            //     xmlPacket =      "<BookingCancel xmlns=\"http://www.reservwire.com/namespace/WebServices/Xml\">"
            //           + "<Authority xmlns=\"http://www.reservwire.com/namespace/WebServices/Xml\">"
            //           + "<Org>SampleRequest</Org>"
            //           + "<User>SampleRequest</User>"
            //    +"<Password>demo123</Password>"
            //    +"<Currency>USD</Currency>"
            //    +"<Language>en</Language>"
            //    +"<TestDebug>false</TestDebug>"
            //    +"<Version>1.25</Version>"
            //  +"</Authority>"
            //  +"<BookingId>720099818</BookingId>"
            //  +"<CommitLevel>confirm</CommitLevel>"
            //+"</BookingCancel>";
            return XmlRequest.SendXMLRequest(xmlPacket);
        }

        // get data from xml for specific hotel

        [WebMethod]
        public static string GetHotelDetails(string id)
        {
            try
            {
                return XmlRequest.ReadFromFile(HostingEnvironment.MapPath("~/Scripts/Data/HotelDetails/" + id + ".xml"));
            }
            catch(FileNotFoundException ex)
            {
                return "<root><Error>" + ex.Message + " </Error></root>";
            }
        }
    }
}