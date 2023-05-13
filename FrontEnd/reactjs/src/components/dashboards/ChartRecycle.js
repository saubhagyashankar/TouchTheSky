import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';


am4core.useTheme(am4themes_animated);

//
const myStyle = {
  
  display : 'flex',
  textAlign: 'center'
};
const ChartRecycle = ({data}) => {
  
  let count = 0;
  for (let i = 0; i < data.length; i++) {
   if(!data[i].successFailure)
   count++;
  }
  let Recycle_S = data.length - count;
  let Recycle_F = count;
  
  const recycledSuccessPie = () => {
     // Create pie chart instance
     const pieChart = am4core.create('pie-chart', am4charts.PieChart);
     pieChart.data = [
       { category: 'Recycle Successful', value: Recycle_S },
       { category: 'Recycle Failed', value: Recycle_F }
     ];
     const pieSeries = pieChart.series.push(new am4charts.PieSeries());
     pieSeries.dataFields.value = 'value';
     pieSeries.dataFields.category = 'category';
     pieSeries.labels.template.text = '{category}';
     pieSeries.labels.template.radius = am4core.percent(-40);
     pieSeries.labels.template.fill = am4core.color('#ffffff');
     pieSeries.labels.template.disabled = true;
     pieSeries.innerRadius = am4core.percent(50);
     pieChart.legend = new am4charts.Legend();
     pieChart.exporting.menu = new am4core.ExportMenu();
     pieChart.exporting.filePrefix = 'pie-chart-export';
     pieChart.exporting.useWebFonts = false;
 
     // Clean up on unmount
     return () => {
       pieChart.dispose();
     };
  }

  useEffect(() => {
    //add all the chart elements here
    recycledSuccessPie();
  }, [data])


  return (
    <div style={ myStyle }>
      <div id="pie-chart" style={{ width: '50%', height: '500px' }}></div>
    </div>
  );
};

export default ChartRecycle;