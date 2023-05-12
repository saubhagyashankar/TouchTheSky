import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

function ChartPieMaterial() {
  useEffect(() => {
    // Apply chart themes
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    const chart = am4core.create('unique-chart-id', am4charts.PieChart);
    
    // Set chart properties
    chart.colors.list = [am4core.color('#4CAF50'), am4core.color('#2196F3'), am4core.color('#FFC107'), am4core.color('#9C27B0'), am4core.color('#F44336'), am4core.color('#607D8B'), am4core.color('#795548')];
    chart.innerRadius = am4core.percent(40);

    // Create pie series
    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'category';
    series.slices.template.stroke = am4core.color('#fff');
    series.slices.template.strokeWidth = 2;
    series.slices.template.strokeOpacity = 1;

    // Set data
    series.data = [
      { category: 'One', value: 10 },
      { category: 'Two', value: 9 },
      { category: 'Three', value: 6 },
      { category: 'Four', value: 5 },
      { category: 'Five', value: 4 },
      { category: 'Six', value: 3 },
      { category: 'Seven', value: 1 },
    ];

    // Add and configure Series label
    const label = series.createChild(am4core.Label);
    label.text = '{value.percent.formatNumber(\'#.0\')}%';
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'middle';
    label.fontSize = 20;
    label.fontWeight = 'bold';
    label.fill = am4core.color('#fff');

    // Play initial series animation

  }, []);

  return <div id="unique-chart-id" style={{ width: '100%', height: '500px' }} />;
}

export default ChartPieMaterial;