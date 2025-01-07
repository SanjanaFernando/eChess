import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QeFTYJXGNMeaANxrrMxSRe8TtY9TUvWnly4iXpvI2IIrWWusoPW8yAzgBNs0tpPK2kzz8Ht4spqCRvP0m3vAaJg00q0zbYtiE"
);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React" }],
  [2, { priceInCents: 20000, name: "Learn Css" }],
]);

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
