
import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';

am4core.useTheme(am4themes_animated);

//
const ChartMaterial = ({data}) => {
  let frequencyMap = {};
console.log(data);
const myMap = new Map();
let Material = []


for (let i = 0; i < data.length; i++) {
  let str = data[i].materialComposition;
  if (frequencyMap[str]) {
    frequencyMap[str]++;
    myMap.set(str, { category: str, value: (frequencyMap[str]/data.length)*100});
  } else {
    frequencyMap[str] = 1;
    myMap.set(str, { category: str, value: (frequencyMap[str]/data.length)*100});
  }
}
for (const [key, value] of myMap) {
  Material.push(value);
}
console.log(Material);
  
  const recycledSuccessPie = () => {
     // Create pie chart instance
     
     const pieChart = am4core.create('chartdiv', am4charts.PieChart);
     pieChart.data = Material;
     const pieSeries = pieChart.series.push(new am4charts.PieSeries());
     pieSeries.dataFields.value = 'value';
     pieSeries.dataFields.category = 'category';
     pieSeries.labels.template.text = '{category}';
     pieSeries.labels.template.radius = am4core.percent(-40);
     pieSeries.labels.template.fill = am4core.color('#000000');
     pieSeries.labels.template.disabled = true;
     pieSeries.innerRadius = am4core.percent(50);
     pieChart.legend = new am4charts.Legend();
     pieChart.exporting.menu = new am4core.ExportMenu();
     pieChart.exporting.filePrefix = 'chartdiv-export';
     pieChart.exporting.useWebFonts = false;
 
     // Create bar chart instance
     
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
    <div style={{ display: 'flex' }}>
      <div id="chartdiv" style={{ width: '50%', height: '500px' }}></div>
    </div>
  );
};

export default ChartMaterial;