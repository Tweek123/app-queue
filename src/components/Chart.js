import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import { DateRangePicker, Toggle } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { getClientData, changeRange, changeInterval } from '../actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import Clients from '../components/Clients';

const chart = {
  labels: [],
  pointDot: true,
  showLines: false,
  datasets: [
    {
      label: 'People',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      cubicInterpolationMode: 'monotone',
      data: []
    },
    {
      label: 'Hide',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'blue',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'blue',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      cubicInterpolationMode: 'monotone',
      showLine: false
    },
    {
      label: 'Hide',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'red',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'red',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      cubicInterpolationMode: 'monotone',
      showLine: false
    }
  ],
};


  const options = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            'millisecond':  'YYYY MMM DD HH:MM:SS',
            'second':  'YYYY MMM DD HH:MM:SS',
            'minute':  'YYYY MMM DD HH:MM:SS',
            'hour':  'YYYY MMM DD HH:MM:SS',
            'day':  'YYYY MMM DD HH:MM:SS',
            'week':  'YYYY MMM DD HH:MM:SS',
            'month': 'YYYY MMM DD HH:MM:SS',
            'quarter':  'YYYY MMM DD HH:MM:SS',
            'year': 'YYYY MMM DD HH:MM:SS',
         },
         ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        },
        }
      }]
    },
    title: {
      display: true,
      text: 'Queue of people'
    },
    legend: {
      labels: {
          filter: function(item) {
              return !item.text.includes('Hide');
          }
      }
    }
}



const Chart = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({})

  const client = useSelector(state => state.clientsReducer.client);

  useEffect(() => {
      if(client && client.name) {
        console.log(client.range);
        dispatch(getClientData(
          {
            changeInterval: client.changeInterval,
            id: client.id, 
            range: client.range}
        ))
      }
    },[client.id, client.changeInterval, client.range]);


    useEffect(() => {
        setData(prepareChart(client.clientData, client.changeInterval));
      
    },[client.clientData]);
  
  const getDate = (date) => {
    return date.getFullYear() + "-" + 
    (date.getMonth() + 1) + "-" + 
    date.getDate() + " " + 
    date.getHours() + ":" + 
    date.getMinutes() + ":" + 
    date.getSeconds()
} 


  const prepareChart = (data, changeInterval) => {
    chart.datasets[0].data = [];
    chart.datasets[1].data = [];
    chart.datasets[2].data = [];
    chart.labels = [];
    


    if(!changeInterval) {     
      chart.datasets[0] = {...chart.datasets[0], 
        label: "People",
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)'
      }

      chart.datasets[1] = {...chart.datasets[1], 
        label: "Hide",
        showLine: false
      }

      chart.datasets[2] = {...chart.datasets[2], 
        label: "Hide",
        showLine: false
      }

      for(const element of data) {
        const date = new Date(element.time);
        chart.datasets[0].data.push(element.value) 
        chart.labels.push(getDate(date))
      }
      return {...chart}
    }

    if(changeInterval) {
      chart.datasets[0] = {...chart.datasets[0], 
        label: "Minimum",
        borderColor: 'green',
        pointBackgroundColor: 'green'
      }

      chart.datasets[1] = {...chart.datasets[1], 
        label: "Medium",
        showLine: true
      }

      chart.datasets[2] = {...chart.datasets[2], 
        label: "Maximum",
        showLine: true
      }

      for(const element of data) {
        const date = new Date(element.time);
        chart.datasets[0].data.push(element.min)
        chart.datasets[1].data.push((element.max+element.min)/2) 
        chart.datasets[2].data.push(element.max) 
        chart.labels.push(getDate(date)) 

      }
      return {...chart}
    }
  }

  return (
    <div className={"chart"}>
      <div className={"chart__tools"}>
        <div className={"chart__clients-wrapper"}>
            <h5 className={"chart__clients-headline"}>Choose client:</h5>
            <Clients/>
        </div>
        
        <div className={"chart__toggle-wrapper"}>
            <h5 className={"chart__toggle-headline"}>Show min, max:</h5>
            <Toggle className={"chart__toggle"} 
              defaultChecked={client.changeInterval} 
              onChange={(change)=> {
                dispatch(changeInterval(change));
              }}/>
        </div>
        <div className={"chart__range-wrapper"}>
            <h5 className={"chart__range-headline"}>Choose date:</h5>
            <DateRangePicker 
              cleanable={false}
              className={"chart__range"}
              value={client.range}
              onChange={(date)=> {
                const begin = new Date(Date.parse(date[0]));
                const end = new Date(Date.parse(date[1]));
                dispatch(changeRange([begin,end]))
            }
            }/>
        </div>
      </div>
      <div className={"chart__graph"}>
        <Line  data={data} options={options} />
      </div>
    </div>)
  }







export default Chart;


