import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';

am4core.useTheme(am4themes_animated);

//
const ChartRecycle = ({data}) => {
  

  const recycledSuccessPie = () => {
     // Create pie chart instance
     const pieChart = am4core.create('pie-chart', am4charts.PieChart);
     pieChart.data = [
       { category: 'Recycle Successful', value: 10 },
       { category: 'Recycle Failed', value: 20 }
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
 
     // Create bar chart instance
     const barChart = am4core.create('bar-chart', am4charts.XYChart);
     barChart.data = [
       { category: 'Category 1', value: 10 },
       { category: 'Category 2', value: 20 },
       { category: 'Category 3', value: 15 },
     ];
     const categoryAxis = barChart.xAxes.push(new am4charts.CategoryAxis());
     categoryAxis.dataFields.category = 'category';
     categoryAxis.title.text = 'Category';
     const valueAxis = barChart.yAxes.push(new am4charts.ValueAxis());
     valueAxis.title.text = 'Value';
     const series = barChart.series.push(new am4charts.ColumnSeries());
     series.dataFields.valueY = 'value';
     series.dataFields.categoryX = 'category';
     series.name = 'Value';
     series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
     barChart.scrollbarX = new am4charts.XYChartScrollbar();
     barChart.exporting.menu = new am4core.ExportMenu();
     barChart.exporting.filePrefix = 'bar-chart-export';
     barChart.exporting.useWebFonts = false;
 
     // Clean up on unmount
     return () => {
       pieChart.dispose();
       barChart.dispose();
     };
  }

  useEffect(() => {
    //add all the chart elements here
    recycledSuccessPie();
  }, [data])


  

  return (
    <div style={{ display: 'flex' }}>
      <div id="pie-chart" style={{ width: '50%', height: '500px' }}></div>
      <div id="bar-chart" style={{ width: '50%', height: '500px' }}></div>
    </div>
  );
};

export default ChartRecycle;