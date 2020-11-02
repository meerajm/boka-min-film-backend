const cors = require("cors");
const express = require("express");
const router = express.Router();
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

router.use(express.json());
router.use(cors());

router.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);
    const error;
    let status;
    try{
        const{name,token}=req.body;
    
    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 11.20,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Booked movie ticket from ${name}`,
          shipping: {
            name: token.card.name,            
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });