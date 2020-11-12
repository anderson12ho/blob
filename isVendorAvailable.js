const TEN_MINUTES = 600;
const THIRTY_MINUTES = 1800;

// list of meals to be delivered
const meals = {
  results:
  [
    {
      "vendor_id": 1,                    // Vendor 1 will be serving
      "client_id": 10,                   // Client 10 on
      "datetime": "2017-01-01 13:30:00"  // January 1st, 2017 at 1:30 pm
    },
    {
        "vendor_id": 1,
        "client_id": 40,
        "datetime": "2017-01-01 14:30:00"
    },
    {
        "vendor_id": 2,
        "client_id": 20,
        "datetime": "2017-01-01 13:30:00"
    },
    {
      "vendor_id": 3,
      "client_id": 20,
      "datetime": "2017-01-02 13:30:00"
    },
    {
      "vendor_id": 3,
      "client_id": 20,
      "datetime": "2017-01-02 13:30:00"
    },
    {
      "vendor_id": 3,
      "client_id": 20,
      "datetime": "2017-01-02 13:30:00"
    },
    {
      "vendor_id": 3,
      "client_id": 20,
      "datetime": "2017-01-02 13:30:00"
    }
  ]
}

//driver info for vendor
const vendors = {
  results: [
    {
      "vendor_id": 1,
      "drivers": 1
    },
    {
      "vendor_id": 2,
      "drivers": 3
    },
    {
      "vendor_id": 3,
      "drivers": 4
    }
  ]
}

function getVendorDrivers(vendor_id) {
  return vendors.results.find(elm => elm.vendor_id == vendor_id).drivers;
}

function timeToSeconds(dateTime) {
  return Math.floor(dateTime / 1000);
}

function withinBlackout(toCheck, againstThisTime) {
  const toCheckSecs = timeToSeconds(toCheck);
  const before = timeToSeconds(againstThisTime) - THIRTY_MINUTES;
  const after = timeToSeconds(againstThisTime) + TEN_MINUTES;

  if (toCheckSecs >= before && toCheckSecs <= after) {
    return true;
  }

  return false;
}

// blackout = 30 min before and 10 min after
// input time must have 1+ driver left,
function is_vendor_available(vendor_id, date_time) {
  const driversCount = getVendorDrivers(vendor_id);
  const deliveriesWithinBlackout = meals.results.filter(element => {
    if(element.vendor_id == vendor_id && withinBlackout(new Date(element.datetime), date_time)) {
      return element;
    }
  });

  if (driversCount > deliveriesWithinBlackout.length ) {
    return true;
  }
  return false;
}

module.exports = is_vendor_available
