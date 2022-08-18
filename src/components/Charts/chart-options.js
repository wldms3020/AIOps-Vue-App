// 차트 컬러
const colorSet = ['#79D1B0', '#FDC44F', '#33BFDB', '#F58E7E', '#5EBABA', '#8DCF3F', '#44DEDE'];

// 막대 차트
export const barOptions = {
    chart: {
        type: 'column'
    },
    title: {
        text: '',
    },
    xAxis: {
        categories: [],
        crosshair: true,
    },
    yAxis: {
        min: 0,
        title: {
            text: 'count',
        }
    },
    colors: colorSet,
    tooltip: {
        headerFormat: '<span style="font-size:10px">[{point.key}]</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:3px"><b>{point.y}</b> 개</td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
      }
    },
    series: [],
}

// 파이 차트
export const pieOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        headerFormat: '<table>',
        pointFormat: '<tr><b>{point.hostname}</b></tr>' +
            '<tr><td style="color:{point.color};padding:0">{point.name}: </td>' +
            '<td style="padding:3px"><b>{point.y} {point.unit}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    // accessibility: {
    //     point: {
    //       valueSuffix: '-'
    //     }
    // },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: colorSet,
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y: ,.2f} {point.unit}'
            },
            showInLegend: true
        },
    },
    series: [],
};