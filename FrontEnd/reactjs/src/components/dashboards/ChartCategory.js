import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



const ChartCategory = ({ data }) => {
 
  let carbon=0,water=0,landfill=0,len=data.length;
  for(let i = 0; i < data.length ; i++)
  {
     carbon+= ((data[i].newPartsCarbonFootprint - data[i].recycledPartsCarbonFootprint)/data[i].newPartsCarbonFootprint)*100;
     water+=  ((data[i].waterUsageNewParts   - data[i].waterUsageRecycledParts)/data[i].waterUsageNewParts)*100;
     landfill+=((data[i].landfillWasteNewParts - data[i].landfillWasteRecycledParts)/data[i].landfillWasteNewParts)*100;
  }
  console.log(carbon,water,landfill,len);
  let chartData = 
  [
     {
       category: "Category A",
       co2Reduction: carbon/len,
       waterReduction: water/len,
       landfillReduction: landfill/len,
     }
   ];
  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create("zzz", am4charts.XYChart);

    // Add data
    chart.data = chartData;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    const co2Series = chart.series.push(new am4charts.ColumnSeries());
    co2Series.dataFields.valueY = "co2Reduction";
    co2Series.dataFields.categoryX = "category";
    co2Series.name = "CO2 Reduction";
    co2Series.tooltipText = "{name}: [bold]{valueY}[/]";
    co2Series.stacked = true;

    const waterSeries = chart.series.push(new am4charts.ColumnSeries());
    waterSeries.dataFields.valueY = "waterReduction";
    waterSeries.dataFields.categoryX = "category";
    waterSeries.name = "Water Reduction";
    waterSeries.tooltipText = "{name}: [bold]{valueY}[/]";
    waterSeries.stacked = true;

    const landfillSeries = chart.series.push(new am4charts.ColumnSeries());
    landfillSeries.dataFields.valueY = "landfillReduction";
    landfillSeries.dataFields.categoryX = "category";
    landfillSeries.name = "Landfill Reduction";
    landfillSeries.tooltipText = "{name}: [bold]{valueY}[/]";
    landfillSeries.stacked = true;

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Clean up on unmount
    return () => {
      chart.dispose();
    };
  }, [chartData]);


  

  return (
    <>
      {/* <button onClick={updateData}>Update Data</button> */}
      <div id="zzz" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
};

export default ChartCategory;
