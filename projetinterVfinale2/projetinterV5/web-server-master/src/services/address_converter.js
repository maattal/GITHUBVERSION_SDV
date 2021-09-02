const axios = require("axios")

const TOKEN = "TN7sj2YJBhXWqPIa45ST~STJrrn56KcmoCaZcI2Qv0g~AjI-ZCd4XVm0TkDD6L8p-D22bA47fArrmlGUn06Gf305TOAezZ2UpQ7oEqJ4UVto"
let url = "http://dev.virtualearth.net/REST/v1/Locations"

async function getFromLatLon(lat, lon) {
  const query = url + `/${lat},${lon}?key=${TOKEN}`

  return await getResult(query)
}

async function getFromAddress(address) {
  const query = url + `?key=${TOKEN}&query=${address}`

  return await getResult(query)
}

async function getResult(url) {
  let result = {
    coordinates: [0, 0],
    address: "ERROR",
    city: "ERROR",
  }

  await axios
    .get(url)
    .then((res) => {
      let obj = res["data"]

      try {
        result = {
          coordinates:
            obj.resourceSets[0].resources[0].geocodePoints[0].coordinates,
          address: obj.resourceSets[0].resources[0].address.formattedAddress,
          city: obj.resourceSets[0].resources[0].address.locality,
        }
      } catch (error) {}
    })
    .catch((err) => console.error(err.response.data))

  return result
}

module.exports = { getFromLatLon, getFromAddress }
