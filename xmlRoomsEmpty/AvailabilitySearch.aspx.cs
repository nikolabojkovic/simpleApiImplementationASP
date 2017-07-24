using System;
using System.Web.Services;

namespace xmlRoomsEmpty
{
    public partial class AvailabilitySearch : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        // webmethod used for search hotels
        [WebMethod]
        public static string Search(int nights,
                                    int rooms, 
                                    int adults, 
                                    int? children,
                                    int? childAge,
                                    DateTime arrivalDate, 
                                    string nationality, 
                                    int regionId,
                                    string hotelName, 
                                    int? minStars, 
                                    double? minPrice, 
                                    double? maxPrice, 
                                    string availabilityStatus)
        {
            //craete xml packet
            string xmlPacket = "<AvailabilitySearch xmlns=\'http://www.reservwire.com/namespace/WebServices/Xml\'>";
            xmlPacket += "<Authority xmlns=\'http://www.reservwire.com/namespace/WebServices/Xml\'>";
            xmlPacket += "<Org>SampleRequest</Org>";
            xmlPacket += "<User>SampleRequest</User>";
            xmlPacket += "<Password>demo123</Password>";
            xmlPacket += "<Currency>USD</Currency>";
            xmlPacket += "<Language>en</Language>";
            xmlPacket += "<TestDebug>false</TestDebug>";
            xmlPacket += "<Version>1.25</Version>";
            xmlPacket += "</Authority>";
            xmlPacket += "<RegionId>" + regionId.ToString() + "</RegionId>"; //52612
            xmlPacket += "<HotelStayDetails>";
            xmlPacket += "<ArrivalDate>" + arrivalDate.ToString("yyyy-MM-dd") + "</ArrivalDate>"; //2017-06-11
            xmlPacket += "<Nights>" + nights.ToString() + "</Nights>";
            xmlPacket += "<Nationality>" + nationality.Substring(0, 2) + "</Nationality>";
            //create xml block for every query for room, guest, adult, child
            // each room has the adults mentioned in the form
            for (int i = 0; i < rooms; i++)
            {
                xmlPacket += "<Room>";
                xmlPacket += "<Guests>";
                
                for (int j = 0; j < adults; j++)
                {
                    xmlPacket += "<Adult />";
                }

                if (children != null)
                    for (int j = 0; j < children; j++)
                    {
                        xmlPacket += "<Child age='" + childAge + "'/>";
                    }

                xmlPacket += "</Guests>";
                xmlPacket += "</Room>";
            }

            xmlPacket += "</HotelStayDetails>";
            xmlPacket += "<HotelSearchCriteria>";

            if (!string.IsNullOrEmpty(hotelName))
             xmlPacket += "<HotelName>" + hotelName + "</HotelName>";
            
            if (minStars != null && minStars > 0)
                xmlPacket += "<MinStars>" + minStars + "</MinStars>";

            if (minPrice != null)
                xmlPacket += "<MinPrice>" + minPrice + "</MinPrice>";

            if (maxPrice != null)
                xmlPacket += "<MaxPrice>" + maxPrice + "</MaxPrice>";
            xmlPacket += "<AvailabilityStatus>allocation</AvailabilityStatus>";
            xmlPacket += "<DetailLevel>basic</DetailLevel>";
            xmlPacket += "</HotelSearchCriteria>";
            xmlPacket += "</AvailabilitySearch>";
            
            return XmlRequest.SendXMLRequest(xmlPacket);
        }
    }
}