using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace xmlRoomsEmpty
{
    public class Room
    {
        public IList<Person> Adults { get; set; }
        public IList<Child> Children { get; set; }
    }
}