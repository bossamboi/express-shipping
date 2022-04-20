"use strict";

const AxiosMockAdapter = require(
  "axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);


const {
  shipProduct,
  SHIPIT_SHIP_URL,
  SHIPIT_API_KEY
} = require("./shipItApi");


test("shipProduct", async function () {

  axiosMock.onPost(`/${SHIPIT_SHIP_URL}`)
      .reply(200, {
        "receipt": {
          "name": "lyne",
          "addr": "2615 regent st",
          "zip": "12345-6789",
          "shipId": 92833
        }
      });

  const shipId = await shipProduct({
    productId: 1000,
    name: "lyne",
    addr: "2615 regent st",
    zip: "12345-6789"
  });

  expect(shipId).toEqual(92833);
});

