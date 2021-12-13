import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import Divider from '@material-ui/core/Divider';
import CoinGecko from "coingecko-api";
import Spinner from "components/spinner"
import { FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import ToggleSwitch from "components/toggleSwitch"
import { useDispatch } from 'react-redux';
import {
  useRouteMatch
} from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import IMG_bitcoin from "assets/images/bitcoin.png"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const text = {
  "1": "every day",
  "7": "every week",
  "14": "every two weeks",
  "30": "every momth",
}
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        display: false       
      },
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        // callback: function(val, index) {
        //   // Hide every 2nd tick label
        //   return  Number(val).toFixed(0).replace(',','') ;
        // },
        maxRotation: 0,
        minRotation: 0
    },
  },
    x: {
      ticks: {
        callback: function(val, index) {
          let d = new Date(this.getLabelForValue(val))
          return   monthNames[d.getMonth()] + " " + d.getFullYear(); 
        },
        maxRotation: 0,
        minRotation: 0,
        paddingRight: 20 
    }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: true,
      text: 'Portfolio Value Over Time - By DCA.trading',
    }
  },
};
const CoinGeckoClient = new CoinGecko();

const fetchData = async () => {
  try {
    const result = await CoinGeckoClient.coins.fetchMarketChart('bitcoin', {
      vs_currency: 'eur',
      days: 'max'
    });
    return result;
  } catch(e) {
    return [];
  }
}
const Home = (props) => {
  const dispatch = useDispatch()
  const { path } = useRouteMatch();
  const [ publish, setPublish ] = useState("")
  const [ coin, setCoin ] = useState([])
  const [ checked, setChecked ] = useState(1)
  const [ isLoading, setIsLoading ] = useState(1)
  const [ total, setTotal ] = useState({
    inverst: 0.00,
    value: 0.00,
    percent: 0.00,
    up: 0.00,
    coin: 0
  })
  const [ data, setData ] = useState({
    lables: [],
    datasets: [
      {
        label: 'Price',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
   })
  const [ setting, setSetting ] = useState({
    amount: 10,
    repeat: 1,
    accumulate: 1,
    starting: 1
  })
  const changeValue = (name, item) => {
      if(name == "amount") {
        setSetting({...setting, [name]: item.split(".")[0]});
      }  else {
        setSetting({...setting, [name]: item});
      }
  };
  const handlechange = (e) => {
    changeValue(e.target.name, e.target.value);
  };
  useEffect(async () => {
    dispatch({type: "CHANGE_DROP", payload: false})
    if(path == "/") {
      window.scrollTo(0, 0);
    } else {
      document.getElementById("explaination").scrollIntoView(true)
    }
    let k = [];
    do {
      k = await fetchData()
      if(k.length !== 0) {
        setCoin([...k.data.prices])
        setIsLoading(0)
      }
    }while(k.length == 0)
  }, [])
  useEffect(()=> {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let start, end;
    start = today.setFullYear(today.getFullYear() - parseInt(setting.starting))

    end = today.setFullYear(today.getFullYear() + parseInt(setting.accumulate))
    if(coin.length >0 ) {
      let index1, index2;
      index1 = coin.findIndex( item => item[0] > start )
      index2 = coin.findIndex( item => item[0] > end )
      let result = coin.slice(index1, index2)
      let result1= [], result2= [], sum = 0, total_amount=0;
      result.forEach( (item, index) => {
        if((index % parseInt(setting.repeat)) === 0 ) {
          total_amount += parseFloat(setting.amount)
          sum += Math.round(setting.amount / item[1] * 100000000) / 100000000
          result1.push( 
            parseFloat((sum * item[1]).toFixed(2))
          )
          result2.push(new Date(item[0]).toISOString().split('T')[0])
        }
      })
      setData({
        labels: result2,
        datasets: [
          {
            label: 'Price',
            data: result1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            lineTension: 0.5
          }
        ]
       })
      let k = {
         inverst: total_amount.toFixed(2),
         coin: parseFloat(sum.toFixed(5)),
         value: result1[result1.length-1].toFixed(2),
         up: (result1[result1.length-1] - total_amount).toFixed(2),
         percent: ((result1[result1.length-1] - total_amount) / total_amount * 100).toFixed(2)
       }
       setTotal({...k})
       setPublish(`Wow! Buying ${setting.amount} EUR of Bitcoin ${text[setting.repeat]} for ${setting.accumulate} years starting ${setting.starting} years ago would have turned ${k.inverst} EUR into ${k.value} EUR (${k.percent}%)`)
    }
  }, [setting, isLoading])
  return (
    <>
      { isLoading? <Spinner type={1} /> : ""}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center p-3">
          <EuroOutlinedIcon style={{fontSize: '40px', color: 'green', marginRight: '20px'}}/>
          <div className="w-44">
            &euro;{total.inverst}<br/>
            Total inversted 
          </div>
        </Card>
        <Card className="flex items-center p-3">
          <TimelineOutlinedIcon style={{fontSize: '40px', color: 'green', marginRight: '20px'}}/>
          <div  className="flex items-center justify-between">
            <div className="w-20">
              &euro;{total.value}<br/>
              {checked ? <span>{Math.round(total.coin * 100000000)} </span> : <span>{total.coin} </span> }<br />
              Total Value
            </div>
            <ToggleSwitch               
              checked={checked}
              onChange={setChecked}
              name="checkedA"/>
          </div>
        </Card>
        <Card className="flex items-center p-3">
          <ImportExportOutlinedIcon style={{fontSize: '40px', color: 'green', marginRight: '20px'}}/>
          <div className="w-44">
            {total.percent}%<br />
            Percent Change
          </div>
        </Card>
        <Card className="flex items-center p-3">
          <ImportExportOutlinedIcon style={{fontSize: '40px', color: 'green', marginRight: '20px'}}/>
          <div className="w-44">
            &euro;{total.up}<br />
            Result
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-8 mt-8">
        <Card className="p-4 md:col-span-2 lg:col-span-1">
          <span className="text-2xl">DCA Settings</span>
          <Divider />
          <fieldset>
            <FormGroup>
            <Label
              className="me-sm-2"
              for="exampleEmail"
            >
              Purchase Amount
            </Label>
            <InputGroup>
              <InputGroupText>
                &euro;
              </InputGroupText>
              <Input type="number" value={setting.amount} name="amount" onChange={handlechange} />
              <InputGroupText>
                .00
              </InputGroupText>
            </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">
              Repeat Purchase
              </Label>
              <Input
                id="exampleSelect"
                type="select" value={setting.repeat} name="repeat" onChange={handlechange}
              >
                <option value="1">Daily</option>
                <option value="7">Weekly</option>
                <option value="14">Every two weeks</option>
                <option value="30">Monthly</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">
              Accumulate For
              </Label>
              <Input
                id="exampleSelect"
                type="select" value={setting.accumulate} name="accumulate" onChange={handlechange}
              >
                {/* <option value="0">6 Months</option> */}
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6 Years</option>
                <option value="7">7 Years</option>
                <option value="8">8 Years</option>
                <option value="9">9 Years</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">
              Starting
              </Label>
              <Input
                id="exampleSelect"
                type="select" name="starting" onChange={handlechange} value={setting.starting}
              >
               {/* <option value="0">6 Months Ago</option> */}
               <option value="1">1 Year Ago</option>
               <option value="2">2 Years Ago</option>
               <option value="3">3 Years Ago</option>
               <option value="4">4 Years Ago</option>
               <option value="5">5 Years Ago</option>
               <option value="6">6 Years Ago</option>
               <option value="7">7 Years Ago</option>
               <option value="8">8 Years Ago</option>
               <option value="9">9 Years Ago</option>
               {/* <option value="custom">On Specific Date</option> */}
              </Input>
            </FormGroup>
          </fieldset>
        </Card>
        <Card className="md:col-span-3 p-4">
          <Line options={options} height="400"
          data={data} 
          />
        </Card>
      </div>
      <Card className="mt-8 p-4">
        <span className="text-2xl"> What is Dollar Cost Averaging Bitcoin?</span>
        <Divider />
        <Input value={publish} onChange={(e) => setPublish(e.target.value)} />
      </Card>
      <p className="my-8 text-3xl text-center" id="explaination">How to use the BTC DCA tool</p>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
        <Card className="p-4">
          <span className="text-2xl">How do I use this Bitcoin Investment Calculator?</span>
          <Divider />
          This Bitcoin investment calculator helps you explore different DCA parameters to see how your portfolio would have performed. This can help you identify the best strategies for your future investments in Bitcoin.
        </Card>
        <Card className="p-4">
          <span className="text-2xl">How do you calculate portfolio value?</span>
          <Divider />
          Starting from the specified start date we simulate making purchases on a recurring basis over the duration of the accumulation period. For each simulated purchase we reference the historical price of Bitcoin to know how many satoshis you would have acquired at that time.
        </Card>
        <Card className="p-4">
          <span className="text-2xl">What is a satoshi?</span>
          <Divider />
          Similar to how the US Dollar is divisible into 100 units that are called cents, a bitcoin is divisible into 100,000,000 units and each one is called a satoshi. The act of purchasing small amounts of Bitcoin is often referred to as stacking sats
        </Card>
      </div>
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
      
    </>
  ) 
}

export default Home