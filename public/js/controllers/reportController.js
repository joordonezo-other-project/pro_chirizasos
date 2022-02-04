const generateReport = () => {

    let typeOfChart = document.getElementById('typeOfChart').value;
    let typeOfReport = document.getElementById('typeOfReport').value;
    let startDate = document.getElementById('startDate').value
    let endDate = document.getElementById('endDate').value

    fetch('./generateReport', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
        body: JSON.stringify({
            typeOfReport: typeOfReport,
            startDate: startDate,
            endDate: endDate
        }),
    })
        .then(response => response.json())
        .then(dat => {
            if (!dat.error) {
                console.log(dat);
                let chart = document.getElementById('chart');
                let parent = chart.parentNode;
                parent.removeChild(chart);
                let canvas = document.createElement('canvas');
                canvas.id = 'chart';
                parent.appendChild(canvas);

                let witOrdes = {
                    labels: [],
                    data: [],
                };
                if (typeOfReport == 'orders') {
                    if (typeOfChart == 'pie') {
                        dat.forEach(item => {
                            witOrdes.labels.push(item.orderDate);
                            witOrdes.data.push(item.value);
                        });
                    } else {
                        dat.forEach(item => {
                            witOrdes.labels.push(item.orderDate);
                            witOrdes.data.push({x:item.quantity, y: item.value});
                        });
                    }
                } else if (typeOfReport == 'stock') {
                    dat.forEach(item => {
                        witOrdes.labels.push(item.lastUpdate);
                        witOrdes.data.push(item.units);
                    });
                } else if (typeOfReport == 'production') {
                    dat.forEach(item => {
                        witOrdes.labels.push(item.dateOfProduction);
                        witOrdes.data.push(item.realProduction);
                    });
                }

                let config = {
                    type: typeOfChart,
                    data: {
                        labels: witOrdes.labels,
                        datasets: [{
                            label: document.querySelector(`#typeOfReport option[value="${typeOfReport}"]`).textContent + ': ' + startDate + ' - ' + endDate,
                            backgroundColor: 'rgb(11, 94, 215)',
                            borderColor: 'rgba(255, 206, 86, 0.2)',
                            data: witOrdes.data,
                            hoverOffset: 10
                        }]
                    },
                    options: {}
                }
                let newChart = generateChart(config);
            }
        });
}

const generateChart = (config) => {
    return new Chart(
        document.getElementById('chart'),
        config
    );
}