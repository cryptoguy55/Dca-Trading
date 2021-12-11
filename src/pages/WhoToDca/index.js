import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

export default function Footer() {
  useEffect(()=> {
    window.scrollTo(0, 0);
  }, [])
  return (
    <Card className="mt-8 p-4">
      <span className="text-2xl"> What is Dollar Cost Averaging Bitcoin?</span>
      <Divider />
      Bitcoin dollar cost averaging consists in investing a fixed amount of USD, into BTC, on regular time intervals. You’ll often see it referenced by its abbreviation of "DCA".

      Purchasing $10 every week, for example, would be dollar cost averaging.

      This strategy is mostly used by investors that are looking to purchase Bitcoin for the long-term, since it protects them from potentially allocating all their capital at a price peak.

      Investing in Bitcoin with no DCA (Example)
      It’s January 1st, 2018, and John decides to purchase $5,000 worth of Bitcoin today.

      The Bitcoin price at the time was $13,800 per coin, which means that John now owns 0.362 BTC.

      Investing in Bitcoin using DCA (Example)
      It’s January 1st, 2018, and Alice decides she wants to purchase $5,000 worth of Bitcoin.

      However, instead of investing the entire amount today, she decides to purchase $500 every month, for 10 months.

      10 months later, Alice owns 0.61 BTC. That’s allmost twice as much as John, even though both invested the same amount.

      Advanced Bitcoin DCA Strategy
      If you have some experience trading, you’ll quickly realize that you can improve the performance of your dollar cost averaging strategy by making use of some simple tools.

      When going this route, you would purchase Bitcoin whenever a set of simple technical analysis tools give you a signal, instead of a fixed time interval.

      Some examples of signals that traders can use for better timing entries include buying when Bitcoin approaches a high time frame moving average (like the 200 DMA), looking for unusually oversold conditions (RSI or MACD), or using a valuation tool like the stock to flow model.
    </Card>
  );
}
