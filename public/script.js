// script.js - dynamique et demo chart
document.addEventListener('DOMContentLoaded', () => {
  const apiMessage = document.getElementById('apiMessage');
  const greetSub = document.getElementById('greet-sub');
  const rpsEl = document.getElementById('rps');
  const podsEl = document.getElementById('pods');
  const refreshBtn = document.getElementById('refreshBtn');
  const callApiBtn = document.getElementById('callApi');

  // Demo values (we can replace by real K8s metrics later)
  let rps = 0;
  let pods = 2;

  // update UI
  function updateStats() {
    rpsEl.innerText = `${rps}`;
    podsEl.innerText = `${pods}`;
    greetSub.innerText = `Traffic: ${rps} req/s • Pods: ${pods}`;
  }

  // call backend message
  function callApi() {
    fetch('/api/hello')
      .then(r => r.json())
      .then(j => {
        apiMessage.innerText = j.message;
      })
      .catch(_ => apiMessage.innerText = 'Erreur lors de l’appel API');
  }

  // small simulated metric generator (for demo)
  function simulateTraffic() {
    // random walk
    rps = Math.max(0, Math.round(rps + (Math.random()*40 - 10)));
    // simulate pod scale logic (demo only)
    pods = Math.max(1, Math.round(2 + rps / 200));
    updateStats();
    updateChart(rps);
  }

  // chart
  const ctx = document.getElementById('cpuChart').getContext('2d');
  const chartData = {
    labels: Array.from({length:20}, (_,i)=> i-19),
    datasets: [{
      label: 'CPU % (simulé)',
      data: Array.from({length:20}, ()=> Math.round(Math.random()*30)),
      fill: true,
      backgroundColor: 'linear-gradient(180deg, rgba(123,47,247,0.28), rgba(0,219,222,0.06))',
      borderColor: 'rgba(123,47,247,0.9)',
      tension: 0.35,
      pointRadius: 0
    }]
  };
  const cpuChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      animation: {duration:500},
      plugins:{legend:{display:false}},
      scales:{
        y:{beginAtZero:true, max:100, ticks:{color:'#dfeaff'}},
        x:{ticks:{color:'#cfe6ff'}}
      }
    }
  });

  function updateChart(val) {
    const dset = cpuChart.data.datasets[0].data;
    dset.push(Math.min(100, Math.round(val/3 + Math.random()*10)));
    if (dset.length>20) dset.shift();
    cpuChart.update();
  }

  // events
  refreshBtn.addEventListener('click', callApi);
  callApiBtn.addEventListener('click', callApi);

  // start
  callApi();
  updateStats();

  // simulate continuous metrics every 1s
  setInterval(simulateTraffic, 1000);
});
