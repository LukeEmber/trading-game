class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}



class Data {
    constructor() {
        this.dataset = [];
    }
    last = () => this.dataset[this.dataset.length - 1];
    labels = () => this.dataset.map(key => key.x);
    data = () => this.dataset.map(key => key.y);
    add = (item) => this.dataset.push(item);
    //TODO random add
}




//-- spostare in un file separato

const datasets = new Data();
datasets.add(new Point(0, 1));

const data = {
    labels: datasets.labels(),
    datasets: [{
        label: '',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        data: datasets.data(),
    }]
};

const config = {
    type: 'line',
    data,
    options: {}
};

var chart = new Chart(
    document.getElementById('andamento'),
    config
);


function addPoint() {
    let point = datasets.last();
    let increment = mapRange(Math.random(), 0, 1, -1, 1);
    let newPoint = new Point(point.x + 1, point.y + increment);
    datasets.add(newPoint);
    //TODO valuta come label
    chart.data.labels = datasets.labels();
    chart.data.datasets[0].data = datasets.data();
    chart.update();
}

setInterval(addPoint, 2000);