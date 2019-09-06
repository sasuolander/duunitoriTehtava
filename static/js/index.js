$(function() {
  function statsGet() {
    return axios.get("/api/stats");
  }

  statsGet().then(function(response) {
    const data = response.data.stats;
    const maxValueY = Math.max.apply(
      Math,
      data["graph"].map(function(item) {
        return item.timeOfOpen;
      })
    );
    const minValueY = Math.min.apply(
      Math,
      data["graph"].map(function(item) {
        return item.timeOfOpen;
      })
    );

    const maxValueX = Math.max.apply(
      Math,
      data["graph"].map(function(item) {
        return item.pageView;
      })
    );
    const minValueX = Math.min.apply(
      Math,
      data["graph"].map(function(item) {
        return item.pageView;
      })
    );
    $("#result").append(
      `<p>mediaani: ${data["median"]}</p><p>keskiarvo: ${data["average"]}</p>`
    );

    const pageViewToOpenTime = document
      .getElementById("readTimeToOpen")
      .getContext("2d");
    const clikToOpenTime = document
      .getElementById("clikToOpenTime")
      .getContext("2d");
    var pageViewToOpenTimeChart = new Chart(pageViewToOpenTime, {
      type: "line",
      data: {
        labels: data["graph"]
          .map(function(item) {
            return item.pageView;
          })
          .sort((a, b) => a - b),
        datasets: [
          {
            label: "Lukukerrat / Päivää auki",
            data: data["graph"].map(function(item) {
              return item.timeOfOpen;
            }),
            backgroundColor: "rgba(0, 196, 177, 0.2)",
            borderColor: "rgb(0, 196, 177)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: minValueY,
                max: maxValueY,
                beginAtZero: true
              }
            }
          ],
           xAxes: [
            {
              ticks: {
                maxTicksLimit:20
                //min: minValueX,
                //max: maxValueX,
                //beginAtZero: false
              }
            }
          ] 
        }
      }
    });
    var clikToOpenTimeChart = new Chart(clikToOpenTime, {
      type: "line",
      data: {
        labels: data["graph"]
          .map(function(item) {
            return item.click;
          })
          .sort((a, b) => a - b),
        datasets: [
          {
            label: "Hakuklikkejä / Päivää auki",
            data: data["graph"].map(function(item) {
              return item.timeOfOpen;
            }),

            backgroundColor: "rgba(0, 196, 177, 0.2)",
            borderColor: "rgb(0, 196, 177)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: minValueY,
                max: maxValueY,
                beginAtZero: true
              }
            }
          ],
            xAxes: [
            {
              ticks: {
                maxTicksLimit:5
               // min: minValueX,
              //  max: maxValueX,
                //beginAtZero: false
              }
            }
          ] 
        }
      }
    });
  });
});
