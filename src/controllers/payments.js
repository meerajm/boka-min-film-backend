const express = require("express");

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

router.post("/", async (req, res) => {

  let error;
  let status;
  try {
    const { name, price, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    await stripe.charges.create(
      {
        amount: price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Booked movie ticket from ${name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    status = "success";
  } catch (err) {
    status = "failure";
  }
  res.json({ error, status });
});

module.exports = router;
