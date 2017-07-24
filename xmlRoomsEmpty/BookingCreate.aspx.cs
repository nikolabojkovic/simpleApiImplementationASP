using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace xmlRoomsEmpty
{
    public partial class BookingCreate : System.Web.UI.Page
    {
        private static string _currency;
        private static string _quoteId;
        protected void Page_Load(object sender, EventArgs e)
        {
            _currency = Request.QueryString["currency"];
            _quoteId = Request.QueryString["dataResult"];
        }

        [WebMethod]
        public static string BookARoomRequest(object adults, object children, int roomsCount, string status)
        {

            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonAdults = javaScriptSerializer.Serialize(adults);
            string jsonChildren = javaScriptSerializer.Serialize(children);

            int adultCounter = 0;
            int childCounter = 0;

            IList<Person> adultsList = javaScriptSerializer.Deserialize<IList<Person>>(jsonAdults);
            IList<Child> childrenList = javaScriptSerializer.Deserialize<IList<Child>>(jsonChildren);

            string xmlPacket = "<BookingCreate>"
                                + "<Authority>"
                                + "<Org>SampleRequest</Org>"
                                + "<User>SampleRequest</User>"
                                + "<Password>demo123</Password>"
                                + "<Currency>" + _currency + "</Currency>"
                                + "<Version>1.25</Version>"
                                + "</Authority>"
                                + "<QuoteId>" + _quoteId + "</QuoteId>"
                                + "<HotelStayDetails>";
            for (int roomIndex = 0; roomIndex< roomsCount; roomIndex++)
            {
                xmlPacket += "<Room>"
                         + "<Guests>";

                for (int adultIndex = 0; adultIndex < adultsList.Count/roomsCount; adultIndex++)
                {
                    xmlPacket += "<Adult";
                    if (!string.IsNullOrEmpty(adultsList[adultCounter].Title))
                        xmlPacket += " title='" + adultsList[adultCounter].Title + "'";

                    if (!string.IsNullOrEmpty(adultsList[adultCounter].FirstName))
                        xmlPacket += " first='" + adultsList[adultCounter].FirstName + "'";

                    if (!string.IsNullOrEmpty(adultsList[adultCounter].LastName))
                        xmlPacket += " last='" + adultsList[adultCounter].LastName + "'";

                    xmlPacket += " />";
                    adultCounter++;
                }
                for (int childIndex = 0; childIndex < childrenList.Count/roomsCount; childIndex++)
                {
                    xmlPacket += "<Child";
                    if (!string.IsNullOrEmpty(childrenList[childCounter].Title))
                        xmlPacket += " title='" + childrenList[childCounter].Title + "'";

                    if (!string.IsNullOrEmpty(childrenList[childCounter].FirstName))
                        xmlPacket += " first='" + childrenList[childCounter].FirstName + "'";

                    if (!string.IsNullOrEmpty(childrenList[childCounter].LastName))
                        xmlPacket += " last='" + childrenList[childCounter].LastName + "'";
                    
                    xmlPacket += " age='" + childrenList[childCounter].Age + "'";
                    xmlPacket += " />";

                    childCounter++;
                }
                xmlPacket += "</Guests>"
                       + "</Room>";
            }
                      xmlPacket += "</HotelStayDetails>"
                                + "<CommitLevel>" + status + "</CommitLevel>"
                                + "</BookingCreate>";
            
            return XmlRequest.SendXMLRequest(xmlPacket);
        }
        
    }
}