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
    $("#result").append(
      `<p>mediaani: ${data["median"]}</p><p>keskiarvo: ${data["average"]}</p>`
    );

    const ReadTimeToOpen = document
      .getElementById("ReadTimeToOpen")
      .getContext("2d");
    const ClikTimeToOpen = document
      .getElementById("ClikTimeToOpen")
      .getContext("2d");
    const ReadTimeToOpenChart = new Chart(ReadTimeToOpen, {
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
          ]
        }
      }
    });
    const ClikTimeToOpenChart = new Chart(ClikTimeToOpen, {
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
                max: maxValueY
              }
            }
          ]
        }
      }
    });
  });
});
