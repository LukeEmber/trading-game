const MIN_VAL = 0.1;
let num = 0;
let wallet = 100;
let amount;

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

const buy = () => {
    let newWallet = wallet - amount;
    if (newWallet > 0) {
        num++;
        wallet = newWallet;
    }
    updateGUI();
}

const buyAll = () => {
    let nn = Math.floor(wallet/amount);
    if (nn > 0) {
        num+=nn;
        wallet -= (nn*amount)
    }
    updateGUI();
}

const sell = () => {  
    if (num > 0) {
        wallet += amount;
        num--;
    }
    updateGUI();
}

const sellAll = () => {
    if (num > 0) {
       wallet += (amount*num) 
       num = 0;
    }
    updateGUI();
}

const updateGUI = () => {
    document.getElementById('num').value = num;
    document.getElementById('wallet').value = wallet.toFixed(2);
}

function addPoint() {
    let point = datasets.last();
    let increment = mapRange(Math.random(), 0, 1, -1, 1);
    amount = point.y + increment;

    if (amount <= 0) {
        amount = MIN_VAL;
    }

    document.getElementById('amount').value = amount.toFixed(3);
    let newPoint = new Point(point.x + 1, amount);
    datasets.add(newPoint);
    //TODO valuta come label
    chart.data.labels = datasets.labels();
    chart.data.datasets[0].data = datasets.data();
    chart.update();
}

setInterval(addPoint, 2000);