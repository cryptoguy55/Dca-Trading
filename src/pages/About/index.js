import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

export default function Footer() {
  useEffect(()=> {
    window.scrollTo(0, 0);
  }, [])
  return (
    <Card className="mt-8 p-4">
      <span className="text-2xl text-center"> About </span>
      <Divider />
      <br/>
      <p className="text-xl">Mission</p><br/>
      Our goal is to make you have more Bitcoin.

      Instead of buying BTC based on gut feeling, or simple dollar cost averaging, dcaBTC provides you with backtested statistics and automated strategies that enable you to time your Bitcoin purchases correctly.

      In our tool, you won’t find vanity metrics like "Number of Bitcoin mentions on Twitter".

      All metrics have been elaborately backtested to make sure they give you a strong edge over other Bitcoin holders.
      <br/><br/>
      <p className="text-xl">Team</p><br/>
      Pascal Thellman
      Pascal Thellmann
      Founder, Marketing Lead - Twitter

      Pascal is a growth hacker obsessed with onboarding newcomers to Bitcoin. Aside from dcaBTC.com, he also runs CoinDiligent.com. In his free time, he writes cryptocurrency trading algorithms.

      Simon Kruse
      Simon Kruse
      Engineering Lead - Twitter

      Simon is a professional software developer and blockchain fanatic. He has many years of experience developing complex software projects and has become a familiar face in crypto for helping top projects with dev work.
      <br/><br/>
      <p className="text-xl">Get in Touch</p><br/>
      For questions, feedback, or business inquiries, feel free to drop us an email at support@dcabtc.com.

      You can also reach out on Twitter or Facebook.
    </Card>
  );
}
