import axios from 'axios';
import * as fs from 'fs';
class Point {
  constructor(lat, long) {
    if (lat < -90 || lat > 90 || Number(lat) != lat) {
      throw new Error("Parameter latitude must be a Number in range -90 and 90")
    }
    if (long < -180 || long > 180 || Number(long) != long) {
      throw new Error("Parameter latitude must be a Number in range -90 and 90")
    }
    this.lat = lat;
    this.long = long;
  }
  getLat() {
    return this.lat
  }
  getLong() {
    return this.long
  }
  getCoord() {
    return [this.lat, this.long]
  }
  setLat(newlat) {
    if (newlat < -90 || newlat > 90 || Number(newlat) != newlat) {
      throw new Error("Parameter latitude must be a Number in range -90 and 90")
    }
    this.lat = newlat;
  }
  setLong(newlong) {
    if (newlong < -180 || newlong > 180 || Number(newlong) != newlong) {
      throw new Error("Parameter latitude must be a Number in range -90 and 90")
    }
    this.long = newlong;
  }
}
class Hurdat {
  constructor(filename) {
    try {
      var self = this
      var data = fs.readFileSync(filename, 'utf8')
      var raw = data.split("\n");
      self.storms = []
      var stormdata = []
      var stormheader = ""
      for (var item of raw) {
        if (item.split(",").length < 4) {
          if (stormheader != "") {
            self.storms.push(new Storm(stormheader, stormdata))
            stormdata = []
          }
          stormheader = item
        } else {
          stormdata.push(item)
        }
      }
    } catch (e) {
      console.error(e)
      throw new Error("Unable to parse data file. File may be invalid")
    }
  }
  funcFilter(func) {
    try {
      if (func instanceof Function) {
        return this.storms.filter((storm) => func(storm))
      }
      throw new Error("Parameter must be a function")
    } catch (e) {
      console.error(e)
      throw new Error("Error filtering items")
    }
  }
  filter(query) {
    try {
      if (query.constructor == Object) {
        return this.storms.filter(function(storm) {
          var matches = true;
          if (Object.keys(query).includes("season")) {
            if (Number(query["season"]) == query["season"]) {
              matches = matches && storm.year == query["season"]
            } else {
              throw new Error("Query value for season must be number")
            }
          }
          if (Object.keys(query).includes("namematch")) {
            if (typeof query["namematch"] == "string") {
              //is number
              matches = matches && storm.name.match(query["namematch"])
            } else {
              throw new Error("Query value for namematch must be string")
            }
          }
          if (Object.keys(query).includes("number")) {
            if (Number(query["number"]) == query["number"]) {
              //is number
              matches = matches && storm.number == query["number"]
            } else if (query["number"].constructor === Array) {
              matches = matches && query["number"].includes(storm.number)
            } else {
              throw new Error("Query value for number must be string or array of numbers")
            }
          }
          if (Object.keys(query).includes("peakwind")) {
            if (Number(query["peakwind"]) == query["peakwind"]) {
              //is number
              matches = matches && storm.peakwind.wind == query["peakwind"]
            } else if (query["peakwind"].constructor === Array) {
              if (query["peakwind"].length == 2 && query["peakwind"][1] >= query["peakwind"][0]) {
                matches = matches && (storm.peakwind.wind >= query["peakwind"][0] && storm.peakwind.wind <= query["peakwind"][1])
              } else {
                throw new Error("Invalid array range provided. Parameter should be an array with 2 elements of type Number, a minimum and a maximum")
              }
            } else {
              throw new Error("Query value for peakwind must be string or an array with 2 elements, a minimum and a maximum")
            }
          }
          if (Object.keys(query).includes("peakpressure")) {
            if (Number(query["peakpressure"]) == query["peakpressure"]) {
              //is number
              matches = matches && storm.peakpressure.pressure == query["peakpressure"]
            } else if (query["peakpressure"].constructor === Array) {
              if (query["peakpressure"].length == 2 && query["peakpressure"][1] >= query["peakpressure"][0]) {
                matches = matches && (storm.peakpressure.pressure >= query["peakpressure"][0] && storm.peakpressure.pressure <= query["peakpressure"][1])
              } else {
                throw new Error("Invalid array range provided. Parameter should be an array with 2 elements of type Number, a minimum and a maximum")
              }
            } else {
              throw new Error("Query value for peakpressure must be string or an array with 2 elements, a minimum and a maximum")
            }
          }
          if (Object.keys(query).includes("date")) {
            if (query["date"].length == 2 && query["date"][0] instanceof Date && query["date"][1] instanceof Date) {
              //will be fixed

              matches = matches && (query["date"][0].getTime() <= storm.formed.getTime() && query["date"][1].getTime() >= storm.dissipated.getTime())
            } else {
              throw new Error("Query values for date must be date opjects")
            }
          }
          if (Object.keys(query).includes("landfallnum")) {
            if (Number(query["landfallnum"]) == query["landfallnum"]) {
              //is number
              matches = matches && storm.landfalls.length == query["landfallnum"]
            } else if (query["landfallnum"].constructor === Array) {
              if (query["landfallnum"].length == 2 && query["landfallnum"][1] >= query["landfallnum"][0]) {
                matches = matches && (storm.landfalls.length >= query["landfallnum"][0] && storm.landfalls.length <= query["landfallnum"][1])
              } else {
                throw new Error("Invalid array range provided. Parameter should be an array with 2 elements of type Number, a minimum and a maximum")
              }
            } else {
              throw new Error("Query value for landfallnum must be Number or an array with 2 elements, a minimum and a maximum")
            }
          }
          if (Object.keys(query).includes("distancekm")) {
            if (Number(query["distancekm"]) == query["distancekm"]) {
              //is number
              matches = matches && storm.distance.km == query["distancekm"]
            } else if (query["distancekm"].constructor === Array) {
              if (query["distancekm"].length == 2 && query["distancekm"][1] >= query["distancekm"][0]) {
                matches = matches && (storm.distance.km >= query["distancekm"][0] && storm.distance.km <= query["distancekm"][1])
              } else {
                throw new Error("Invalid array range provided. Parameter should be an array with 2 elements of type Number, a minimum and a maximum")
              }
            } else {
              throw new Error("Query value for distancekm must be Number or an array with 2 elements, a minimum and a maximum")
            }
          }
          //merge with distancekm possible in future
          if (Object.keys(query).includes("distancemi")) {
            if (Number(query["distancemi"]) == query["distancemi"]) {
              //is number
              matches = matches && storm.distance.mi == query["distancemi"]
            } else if (query["distancemi"].constructor === Array) {
              if (query["distancemi"].length == 2 && query["distancemi"][1] >= query["distancemi"][0]) {
                matches = matches && (storm.distance.mi >= query["distancemi"][0] && storm.distance.mi <= query["distancemi"][1])
              } else {
                throw new Error("Invalid array range provided. Parameter should be an array with 2 elements of type Number, a minimum and a maximum")
              }
            } else {
              throw new Error("Query value for distancemi must be Number or an array with 2 elements, a minimum and a maximum")
            }
          }
          if (Object.keys(query).includes("point")) {
            if (query["point"].constructor === Array) {
              if (query["point"].length == 4 && query["point"][1] >= query["point"][0] && query["point"][3] >= query["point"][2]) {
                var isin = false
                for (var item of storm.entries) {
                  var point = item.point
                  if (point.getLat() >= query["point"][0] && point.getLat() <= query["point"][1] && point.getLong() >= query["point"][2] && point.getLong() <= query["point"][3]) {
                    isin = true;
                    break
                  }
                }
                matches = matches && isin
              } else {
                throw new Error("Query value for point must be an array with 4 elements of type Number, a max latitude, min latitude, a max longitude, and a min longitude")
              }
            } else {
              throw new Error("Query value for point must be an array with 4 elements of type Number, a max latitude, min latitude, a max longitude, and a min longitude")
            }
          }
          if (Object.keys(query).includes("landfall")) {
            if (query["landfall"].constructor === Array) {
              if ((query["landfall"].length == 4) && query["landfall"][1] >= query["landfall"][0] && query["landfall"][3] >= query["landfall"][2]) {
                var isin = false
                for (var item of storm.entries) {
                  var point = item.point
                  if (point.getLat() >= query["landfall"][0] && point.getLat() <= query["landfall"][1] && point.getLong() >= query["landfall"][2] && point.getLong() <= query["landfall"][3] && item.identifier == "L") {
                    isin = true;
                    break
                  }
                }
                matches = matches && isin
              } else {
                throw new Error("Query value for landfall must be an array with 4 elements of type Number, a max latitude, min latitude, a max longitude, and a min longitude")
              }
            } else {
              throw new Error("Query value for landfall must be an array with 4 elements of type Number, a max latitude, min latitude, a max longitude, and a min longitude.")
            }
          }
          return matches
        })

      } else {
        throw new Error("Parameter must be of type dictionary")
      }
    } catch (e) {
      console.error(e);
      throw new Error("Invalid parameter or query")
    }
  }
}
class Storm {
  constructor(rawstorm, rawentries) {
    try {
      this.entries = []
      this.landfalls = []
      var data = rawstorm.split(",")
      var id = data[0].trim()
      this.id = id
      this.peakwind = null
      this.peakpressure = null
      this.number = parseInt(id.substring(2, 4))
      this.year = parseInt(id.substring(4, 9))
      this.name = data[1].trim()
      for (var item of rawentries) {
        this.entries.push(new Entry(item))
        var lastentry = this.entries[this.entries.length - 1]
        if (lastentry.identifier == "L") {
          this.landfalls.push(lastentry)
        }
        if (this.peakwind == null || lastentry.wind > this.peakwind.wind) {
          this.peakwind = lastentry
        }
        if (this.peakpressure == null || lastentry.pressure < this.peakpressure.pressure) {
          this.peakpressure = lastentry
        }
      }

      this.formed = this.entries[0].date
      this.dissipated = this.entries[this.entries.length - 1].date
      var distkm = 0;
      var distmi = 0;

      for (var i = 0; i < this.entries.length - 1; i++) {
        var radlat1 = Math.PI * this.entries[i].point.getLat() / 180;
        var radlat2 = Math.PI * this.entries[i + 1].point.getLat() / 180;
        var theta = this.entries[i].point.getLong() - this.entries[i + 1].point.getLong()
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515
        distkm += dist * 1.609344
        distmi += dist * 0.8684
      }
      this.distance = {
        mi: distmi,
        km: distkm
      }
    } catch (e) {
      console.error(e)
      throw new Error("An error record while parsing storm data")
    }
  }
}
class Entry {
  constructor(raw) {
    try {
      var data = raw.split(",")
      const date = data[0].trim()
      const time = data[1].trim()
      this.date = new Date(date.substring(0, 4), parseInt(date.substring(4, 6)) - 1, date.substring(6, 8), time.substring(0, 2), time.substring(2, 4))
      this.identifier = (data[2].trim() != "" ? data[2].trim() : null)
      this.status = data[3].trim()
      data[4] = data[4].trim()
      data[5] = data[5].trim()
      this.point = new Point((data[4][data[4].length - 1] == "N" ? parseFloat(data[4].substring(0, data[4].length - 1)) : parseFloat(data[4].substring(0, data[4].length - 1)) * -1), (data[5][data[5].length - 1] == "E" ? parseFloat(data[5].substring(0, data[5].length - 1)) : parseFloat(data[5].substring(0, data[5].length - 1)) * -1))
      this.wind = (data[6].trim() != "" ? parseInt(data[6].trim()) : null)
      this.pressure = parseInt(data[7].trim())
      for (var i = 0; i < data.length; i++) {
        if (data[i] == -999 || data[i] == -99) {
          data[i]=null;
        } else {
          if (i >= 8 && i <= 20) {
            data[i]=parseInt(data[i])
          }
        }
      }
      this.radius = {
        "34": {
          "NE": data[8],
          "SE": data[9],
          "SW": data[10],
          "NW": data[11]
        },
        "50": {
          "NE": data[12],
          "SE": data[13],
          "SW": data[14],
          "NW": data[15]
        },
        "64": {
          "NE": data[16],
          "SE": data[17],
          "SW": data[18],
          "NW": data[19]
        },
        "max": data[20]
      }
    } catch (e) {
      console.error(e)
      throw new Error("An error record while parsing entry data")
    }
  }

}
class Util {
  constructor() { }
  download(filename, source) {
    if (source === "natl") {
      axios.get('https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2021-100522.txt').then(function(response) {
        const text = response.data;

        fs.writeFile(filename, text, function(err) {
          if (err) {
            throw new Error("Error saving file")
          }
        });
      });
    } else if (source === "pac") {
      axios.get('https://www.nhc.noaa.gov/data/hurdat/hurdat2-nepac-1949-2021-091522.txt').then(function(response) {
        const text = response.data;

        fs.writeFile(filename, text, function(err) {
          if (err) {
            throw new Error("Error saving file")
          }
        });
      });
    } else {
      throw new Error("Invalid data type. Source must be \"natl\" (North Atlantic) or \"pac\" (Eastern and Central Pacific)")
    }
  }
  ktToMph(kt) {
    if (Number(kt) === kt) {
      return kt * 1.1507794480136
    }
    throw new Error("Invalid Parameter (Parameter needs to be float or int)")
  }
  mphToKt(mph) {
    if (Number(mph) === mph) {
      return mph * 0.86897624
    }
    throw new Error("Invalid Parameter (Parameter needs to be float or int)")
  }
  kphToMph(kph) {
    if (Number(kph) === kph) {
      return kph * 0.621371192
    }
    throw new Error("Invalid Parameter (Parameter needs to be float or int)")
  }
  mhpToKph(mph) {
    if (Number(mph) === mph) {
      return mph * 1.6093440006147
    }
    throw new Error("Invalid Parameter (Parameter needs to be float or int)")
  }
  ktToKph(kt) {
    if (Number(kt) === kt) {
      return kt * 1.852
    }
    throw new Error("Invalid Parameter (Parameter needs to be float or int)")
  }
  kphToKt(kph) {
    if (Number(kph) === kph) {
      return kph * 0.5399568
    }
    throw new Error("Invalid Parameter (Parameter needs to be float or int)")
  }
  dist(point1, point2) {
    if (point1 instanceof Point && point2 instanceof Point) {
      return Math.hypot(point1.getLat() - point2.getLat(), point2.getLong() - point2.getLong());
    }
    throw new Error("Invalid Parameter (Parameter needs to be a Point)")
  }
  inside(minlat, maxlat, minlong, maxlong, point) {
    if (Number(minlat) == minlat && Number(maxlat) == maxlat && Number(minlong) == minlong && Number(maxlong) == maxlong && point instanceof Point) {
      return (point.getLat() >= minlat && point.getLat() <= maxlat && point.getLong() >= minlong && point.getLong() <= maxlong)
    }
    throw new Error("Invalid parameters. minlat, maxlat, minlong, and maxlong need to be of type Number, point needs to be of type Point")
  }
  coordDist(point1, point2, unit = "km") {
    //uses haversine formula
    //https://www.htmlgoodies.com/javascript/calculate-the-distance-between-two-points-in-your-web-apps/
    //https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    var radlat1 = Math.PI * point1.getLat() / 180;
    var radlat2 = Math.PI * point2.getLat() / 180;
    var theta = point1.getLong() - point2.getLong()
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist) * 180 / Math.PI * 60 * 1.1515
    if (unit == "km") { dist = dist * 1.609344 }
    if (unit == "mi") { dist = dist * 0.8684 }
    return dist
  }
}
export {
  Hurdat,
  Util,
  Point,
  Entry,
  Storm
}
