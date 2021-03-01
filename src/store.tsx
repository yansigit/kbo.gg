import {observable} from 'mobx';

class DataStore {
    @observable counter = 0;
    @observable data = {
        labels: ['선수1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '승리 확률',
                data: [50, 65, 25, 30, 43, 80, 90, 95, 100],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    increase() {this.counter++;}
    decrease() {this.counter++;}
}

export default new DataStore();