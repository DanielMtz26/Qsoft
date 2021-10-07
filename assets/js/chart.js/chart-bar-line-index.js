// Set new default font family and font color to mimic Bootstrap's default styling
// (Chart.defaults.global.defaultFontFamily = "Arial"),
// '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = "#000000";string: "bold",
//Chart.defaults.global.string = "bold";
// Chart.defaults.font.size = 14;
function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + "").replace(",", "").replace(" ", "");
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return "" + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
}

// Area Chart Example
function graficasprincipales(id_div,noLine,in1,in2,in3,in4,in5,in6,in7,in8,in9,in10,in11,in12){ 
  var ctx = document.getElementById(id_div);
  var densityCanvas = document.getElementById(id_div);
  
  //Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 13;
  
  var densityData={
    label: 'AVANCE DESEADO',
    data: [noLine,noLine,noLine,noLine,noLine,noLine,noLine,noLine,noLine,noLine,noLine,noLine],
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor:'rgba(0, 0, 0, 0.7)',
    borderWidth: 3,
    yAxisID: "y-axis-density",
    stack: 'combined',
    fill: false
  };
  
  var gravityData={
    label: 'AVANCE REAL',
    data: [in1,in2,in3,in4,in5,in6,in7,in8,in9,in10,in11,in12],
    backgroundColor: 'rgba(76, 156, 219, 0.85)',
    borderWidth: 0,
    yAxisID: "y-axis-density",
    stack: 'combined',
    type: 'bar'
  };
  
  var planetData={
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [ densityData, gravityData]
  };
  
  var chartOptions={
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 14
              }
          }
      }
    },
    
    fill: false,
    // responsive: true,
    interaction: {
      intersect: false
    },
    
    scales: {
      xAxes: [{
        display: true,
        title: {
          display: true,
          text: 'Meses'
        },
        barPercentage: 1,
        categoryPercentage: 0.85
      }],
      yAxes: [{
        display: true,
        title: {
          display: true,
          text: 'Porcentaje (%)'
        },
        id: "y-axis-density"
      }],
        
    }
  };
  
  var barChart = new Chart(densityCanvas, {
    type: 'line',
    data: planetData,
    options: chartOptions
  });
}
