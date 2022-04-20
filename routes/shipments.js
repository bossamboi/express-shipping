"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const shippingSchema = require("./shippingSchema.json");
const { shipProduct } = require("../shipItApi");
const {BadRequestError} = require("../expressError");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;

  const result = jsonschema.validate(req.body, shippingSchema);
  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;