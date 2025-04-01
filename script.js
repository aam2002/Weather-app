let input = document.querySelector("#locationInput");
let search = document.getElementById("search");
let data;

//Getting Data From Api
new Promise((resolve, reject) => {
  document.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        resolve({
          lat: lat,
          long: long,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          const url = `https://api.tomorrow.io/v4/weather/forecast?location=Delhi&apikey=sSalNZv39nxNdd6JKKzP5wRcFDzdGK1Q`;
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              "accept-encoding": "deflate, gzip, br",
            },
          };
          fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
              // Chart.getChart("myChart").destroy();
              update(json);
            })
            .catch((err) => console.log(err));
        }
      }
    );
  });
}).then((location) => {
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location.lat},${location.long}&apikey=sSalNZv39nxNdd6JKKzP5wRcFDzdGK1Q`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "accept-encoding": "deflate, gzip, br",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      data = json;
      update(data);
    })
    .catch((err) => console.error(err));

  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${location.lat}%2C+${location.long}&key=f67cf41591bd429aa755d7f75c79e91e`
  )
    .then((res) => res.json())
    .then((json) => {
      input.value = json.results[0].formatted;
    })
    .catch((err) => console.error(err));
});

//Search Button
search.addEventListener("click", () => {
  if (!input.value) {
    alert("Give loaction");
  } else {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${input.value}&apikey=sSalNZv39nxNdd6JKKzP5wRcFDzdGK1Q`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "accept-encoding": "deflate, gzip, br",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        Chart.getChart("myChart").destroy();
        update(json);
      })
      .catch((err) => console.log(err));
  }
});

//Time and date Converter functions
function convertToIST12(utcTime) {
  const date = new Date(utcTime);
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(/^0+/, "");
}
function convertToIST24(utcTime) {
  const date = new Date(utcTime);
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(/^0+/, "");
}
function convertToISTMinuet(utcTime) {
  const date = new Date(utcTime);
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    minute: "2-digit",
    hour: "2-digit",
  })
    .format(date)
    .replace(/^0+/, "");
}
function convertToISTDayTime(utcTime) {
  const date = new Date(utcTime);
  const day = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  }).format(date);
  const dateX = Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
  })
    .format(date)
    .replace(/^0+/, "");
  return `${day} ${dateX}`;
}

//Gradient of mainBox
function getGradientByTime() {
  const hour = new Date().getHours();
  let gradient = "";

  if (hour >= 6 && hour < 9) {
    gradient = "linear-gradient(to bottom, #FFCF71, #237A57)"; // Morning
  } else if (hour >= 9 && hour < 16) {
    gradient = "linear-gradient(to bottom, #4FACFE, #00F2FE)"; // Day (More natural sky blue)
  } else if (hour >= 16 && hour < 19) {
    gradient = "linear-gradient(to bottom, #FF9A9E, #FAD0C4)"; // Evening
  } else {
    gradient = "linear-gradient(to bottom, #141E30, #243B55)"; // Night
  }
  document.getElementsByClassName(
    "TodayQuickInfoBox"
  )[0].style.backgroundImage = gradient;
}
getGradientByTime();

function update(data) {
  let hourlyForecastObj = data.timelines.hourly;

  let FiveDayForcastObj = [];
  data.timelines.daily.forEach((item, index) => {
    FiveDayForcastObj.push({
      date: convertToISTDayTime(item.time),
      AverageTemp: item.values.temperatureAvg + "1",
      code: item.values.weatherCodeMax,
    });
  });

  let hourlyForecastBox = document.getElementById("hourlyForecastBox");
  let HourlyWindBox = document.getElementById("HourlyWindBox");
  let HourlyHumidityBox = document.getElementById("HourlyHumidityBox");
  let precipitationProbabilityBox = document.getElementById(
    "precipitationProbabilityBox"
  );

  document.getElementById("tempMain").innerText =
    data.timelines.minutely[0].values.temperature;

  document.getElementById("todayHigh").innerText =
    data.timelines.daily[0].values.temperatureMax;

  document.getElementById("todayLow").innerText =
    data.timelines.daily[0].values.temperatureMin;

  let dayNight = "0";

  HourlyHumidityBox.innerHTML = "";
  HourlyWindBox.innerHTML = "";
  hourlyForecastBox.innerHTML = "";
  precipitationProbabilityBox.innerHTML = "";

  hourlyForecastObj.some((item, index) => {
    if (
      Number(convertToIST24(data.timelines.daily[0].values.sunriseTime)) <
        Number(convertToIST24(item.time)) &&
      Number(convertToIST24(item.time)) <
        Number(convertToIST24(data.timelines.daily[0].values.sunsetTime))
    ) {
      dayNight = "0";
    } else {
      dayNight = "1";
    }
    document.getElementById(
      "mainImage"
    ).src = `icons/tomorrow_icons/${data.timelines.hourly[0].values.weatherCode}${dayNight}.png`;

    let tempratureHour = document.createElement("div");
    tempratureHour.className = "tempraturHourForCast";
    tempratureHour.innerHTML = `<p>${item.values.temperature}&deg;</p>
      <img src="icons/tomorrow_icons/${
        item.values.weatherCode + dayNight
      }.png" alt"imgae" height="20px">
      <p>${index === 0 ? "Now" : convertToIST12(item.time)}</p>`;

    hourlyForecastBox.append(tempratureHour);

    let windHour = document.createElement("div");
    windHour.className = "hourForecast";
    windHour.innerHTML = `<p style="text-align:center;padding:0;">N</p>
    <img src="icons/direction.svg" alt="image" style="transform: rotate(${
      item.values.windDirection + 180 + "deg"
    })">
    <p>${item.values.windSpeed}</p>
    <p>${index === 0 ? "Now" : convertToIST12(item.time)}</p>`;

    HourlyWindBox.append(windHour);

    let humidityHour = document.createElement("div");
    humidityHour.className = "hourForecast";
    humidityHour.innerHTML = `<p>${item.values.humidity}&percnt;</p>
    <div class="hourHumidityBar ${
      item.values.humidity == 0 ? "empty" : ""
    }" style = "height:${
      item.values.humidity == 0 ? "10" : item.values.humidity
    }px"></div>
    <p>${index === 0 ? "Now" : convertToIST12(item.time)}</p>`;

    HourlyHumidityBox.append(humidityHour);

    let precipitationProbabilityHour = document.createElement("div");
    precipitationProbabilityHour.className = "hourForecast";
    precipitationProbabilityHour.innerHTML = `<p>${
      item.values.precipitationProbability
    }&percnt;</p>
    <div class ="hourPrecipitationProbabilityBar ${
      item.values.precipitationProbability == 0 ? "empty" : ""
    }" style="height:${
      item.values.precipitationProbability == 0
        ? "10"
        : item.values.precipitationProbability
    }px"></div>
    <p>${index === 0 ? "Now" : convertToIST12(item.time)}</p>`;

    precipitationProbabilityBox.append(precipitationProbabilityHour);

    if (index === 24) {
      return true;
    }
  });

  Scrollhandler(hourlyForecastBox);
  Scrollhandler(HourlyWindBox);
  Scrollhandler(HourlyHumidityBox);
  Scrollhandler(precipitationProbabilityBox);

  let FiveDayBox = document.getElementById("FiveDayBox");
  FiveDayBox.innerHTML = "";
  FiveDayForcastObj.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "fiveDayContent";
    div.innerHTML = `<span> ${index == 0 ? "Today" : item.date}</span>
      <img src =  "icons/tomorrow_icons/${
        item.code + "0"
      }.png" alt="image" height = "30px">
      <span> ${item.AverageTemp}&deg </span>`;
    FiveDayBox.append(div);
  });

  //I Did This With Chat Gpt
  function adjustPressureBox() {
    const container = document.querySelector(".CurrentConditonBox");
    const items = Array.from(container.children);
    const pressureBox = document.getElementById("pressureBox");

    const columns =
      getComputedStyle(container).gridTemplateColumns.split(" ").length;
    // Find index of pressureBox
    const index = items.indexOf(pressureBox);

    // If it's alone in the last row, apply full-width class
    if ((index + 1) % columns === 1) {
      pressureBox.classList.add("full-width");
    } else {
      pressureBox.classList.remove("full-width");
    }
  }

  // Run on page load & resize
  window.addEventListener("load", adjustPressureBox);
  window.addEventListener("resize", adjustPressureBox);

  //Changing the scroll default from Up-down to Right-Left
  function Scrollhandler(domElement) {
    domElement.addEventListener("wheel", function (event) {
      if (event.deltaY !== 0) {
        document.querySelector(`.${domElement.className}`).scrollLeft +=
          event.deltaY;
        event.preventDefault();
      }
    });
  }

  let xAxis = [];
  let yAxis = [];
  data.timelines.minutely.forEach((item, index) => {
    if (index % 5 == 0) {
      xAxis.push(convertToISTMinuet(item.time));
      yAxis.push(item.values.temperature);
    }
  });
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: "Temprature",
          data: yAxis,
          backgroundColor: "red",
          borderColor: "yellow",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: {
            display: false, // Hides vertical grid lines
          },
          ticks: {
            color: "white", // Change color of x-axis labels
          },
          border: {
            color: "white", // Change color of x-axis line
          },
        },
        y: {
          grid: {
            display: false, // Hides horizontal grid lines
          },
          ticks: {
            color: "white", // Change color of x-axis labels
          },
          border: {
            color: "white", // Change color of x-axis line
          },
        },
      },
    },
  });

  //Current Weatiher Condition
  document.getElementById("speed").innerText =
    data.timelines.minutely[0].values.windSpeed;

  document.getElementById("currDirection").style.transform = `rotate(${
    data.timelines.minutely[0].values.windDirection + 180 + "deg"
  })`;

  document.getElementById("humidityBarValue").style.height =
    data.timelines.minutely[0].values.humidity + "px";

  document.getElementById("humidityPercentage").innerText =
    data.timelines.minutely[0].values.humidity;

  document.getElementById("UvValue").innerText =
    data.timelines.minutely[0].values.uvIndex;

  document.getElementById("uvBarValue").style.height =
    (data.timelines.minutely[0].values.uvIndex / 11) * 100 + "px";
  document.getElementById("uvBarValue").style.width =
    (data.timelines.minutely[0].values.uvIndex / 11) * 100 + "px";

  document.getElementById("pressureValue").innerText =
    data.timelines.minutely[0].values.pressureSeaLevel;

  document.getElementById("pressureBarValue").style.width =
    (data.timelines.minutely[0].values.pressureSeaLevel / 2100) * 100 + "%";

  document.getElementById("averageWindValue").innerText =
    data.timelines.daily[0].values.windSpeedAvg;

  document.getElementById("heightHumidityValue").innerText =
    data.timelines.daily[0].values.humidityMax;

  document.getElementById("precipitationProbabilityValue").innerText =
    data.timelines.daily[0].values.precipitationProbabilityAvg;
}
