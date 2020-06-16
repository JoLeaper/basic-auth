require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');
const Auction = require('./lib/models/Auction');

const PORT = process.env.PORT || 7890;

// EVERY HOUR, AUTOMATICALLY RUN A FUNCTION THAT SELECTS THE BEST DEALS IN THE AUCTION.
// REPEAT UNTIL THERE IS NO MORE LEFT
setInterval(async() => {
  const auctions = await Auction.find({ $lte: { endDate: Date.now() } });
  await Auction.acceptBids(auctions);
}, 1000 * 60 * 60);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
