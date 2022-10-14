const firstChart = document.getElementById("myChart").getContext("2d");
const gradient = firstChart.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "#5cffca");
gradient.addColorStop(1, "#66ff");
const secondChart = document.getElementById("secondMyChart");
const thirdChart = document.getElementById("thirdMyChart");
const fourthChart = document.getElementById("fourthMyChart");
const url = "https://app-dashboard-fepe.herokuapp.com/dados";

const get = () => {
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      const yearchart = response.data.testepezinho.map((yearchart, index) => {
        return yearchart.year;
      });

      const valuechart = response.data.testepezinho.map((valuechart, index) => {
        return valuechart.quantity;
      });

      const yeargendermale = response.data.generotestepezinho[0].masculino.map(
        (yeargendermale, index) => {
          return yeargendermale.year;
        }
      );

      const valuemale = response.data.generotestepezinho[0].masculino.map(
        (valuemale, index) => {
          return valuemale.quantity;
        }
      );

      const yeargenderfemale = response.data.generotestepezinho[0].feminino.map(
        (yeargenderfemale, index) => {
          return yeargenderfemale.year;
        }
      );

      const valuefemale = response.data.generotestepezinho[0].feminino.map(
        (valuefemale, index) => {
          return valuefemale.quantity;
        }
      );

      const agestudent = response.data.alunosporidade.map(
        (agestudent, index) => {
          return agestudent.age;
        }
      );

      const valuestudent = response.data.alunosporidade.map(
        (valuestudent, index) => {
          return valuestudent.quantity;
        }
      );

      const dayweek = response.data.atendsemana.map((dayweek, index) => {
        return dayweek.day;
      });

      const service = response.data.atendsemana.map((service, index) => {
        return service.quantity;
      });

      chartOne.config.data.labels = yeargendermale;
      chartOne.config.data.datasets[0].data = valuemale;
      chartOne.config.data.labels = yeargenderfemale;
      chartOne.config.data.datasets[1].data = valuefemale;
      chartOne.update();
      chartFourth.config.data.labels = yearchart;
      chartFourth.config.data.datasets[0].data = valuechart;
      chartFourth.update();
      chartThird.config.data.labels = agestudent;
      chartThird.config.data.datasets[0].data = valuestudent;
      chartThird.update();
      chartTwo.config.data.labels = dayweek;
      chartTwo.config.data.datasets[0].data = service;
      chartTwo.update();
    })
    .catch((error) => console.log(error));
};

const dataZero = {
  //labels: ["2018", "2019", "2020", "2021", "2022"],

  datasets: [
    {
      //data: [30, 19, 28, 19, 24],
      label: "Masculino",
      fill: true,
      borderColor: "rgba(127, 255, 212)",
      backgroundColor: "transparent",
    },
    {
      //data: [22, 21, 27, 20, 23],
      label: "Feminino",
      fill: true,
      borderColor: "rgba(221, 160, 221)",
      backgroundColor: "transparent",
    },
  ],
};

const config = {
  type: "line",
  data: dataZero,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            let finalValue = value.toFixed();
            return finalValue + "mil";
          },
        },
      },
    },
  },
};

const dataOne = {
  //labels: ["2018", "2019", "2020", "2021", "2022"],

  datasets: [
    {
      //data: [52, 40, 45, 39, 47],
      label: "Testes do Pezinho Realizados (por ano)",
      fill: true,
      backgroundColor: gradient,
    },
  ],
};

const configOne = {
  type: "line",
  data: dataOne,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    radius: 4,
    hoverRadius: 10,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            let finalValue = value.toFixed();
            return finalValue + "mil";
          },
        },
      },
    },
  },
};

const dataTwo = {
  //labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  datasets: [
    {
      label: "Nº Atendimentos na Semana",
      //data: [90, 333, 190, 176, 150, 120, 102],
      backgroundColor: ["rgba(127,255,0)"],
      borderColor: ["rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const configTwo = {
  type: "bar",
  data: dataTwo,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const dataThird = {
  //labels: [
  //"Alunos 6 a 10 anos",
  // "Alunos 11 a 15 anos",
  // "Alunos 16 a 20 anos",
  //"Alunos 20 a 25 anos",
  // "Alunos +25 anos",
  //],
  datasets: [
    {
      label: "Nº Alunos por Idade",
      //data: [20, 25, 15, 10, 4],
      backgroundColor: [
        "rgba(176,196,222)",
        "rgba(127,255,212)",
        "rgba(240,230,140)",
        "rgba(255,160,122)",
        "rgba(123,104,238)",
      ],
      borderColor: ["rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const configThird = {
  type: "doughnut",
  data: dataThird,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};
const chartOne = new Chart(firstChart, config);
const chartTwo = new Chart(secondChart, configTwo);
const chartThird = new Chart(thirdChart, configThird);
const chartFourth = new Chart(fourthChart, configOne);
