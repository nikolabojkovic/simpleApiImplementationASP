using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace xmlRoomsEmpty
{
    public static class XmlRequest
    {
        public static string SendXMLRequest(string xiRequestContent)
        {
            string xiTargetURL = "http://www.roomsxmldemo.com/RXLStagingServices/ASMX/XmlService.asmx";
            WebRequest lRequest = WebRequest.Create(xiTargetURL);
            lRequest.Timeout = System.Threading.Timeout.Infinite;
            lRequest.Method = "POST";
            lRequest.ContentLength = xiRequestContent.Length;
            lRequest.ContentType = "text/xml";
            ((HttpWebRequest)lRequest).KeepAlive = false;
            Stream lStream = lRequest.GetRequestStream();
            byte[]
            lBytes = Encoding.ASCII.GetBytes(xiRequestContent);
            lStream.Write(lBytes, 0, lBytes.Length);
            lStream.Close();
            WebResponse lResponse = lRequest.GetResponse();
            StreamReader
            lReader = new StreamReader(lResponse.GetResponseStream());
            return lReader.ReadToEnd();
        }
        public static string ReadFromFile(string fileName)
        {
            return File.ReadAllText(fileName);
        }
    }
}