const size = 10;

import { CarsList } from '/js/cars_list.js';
import { CarCreate } from '/js/car_create.js';
import { Heading } from '/js/heading.js';
import { Paging } from '/js/paging.js';

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            page: 0,
            response: [],
            pageInfo: null,
            create: false
        };
    }

    load() {
        var current = this;

        $.ajax({
            url: "api/Cars/GetAll?Size=" + size + "&Current=" + this.state.page,
            success: function (data) {

                if (data.pageInfo.current >= data.pageInfo.totalPages && data.pageInfo.totalPages != 0) {
                    current.setState(() => {
                        return { page: data.pageInfo.totalPages - 1 }
                    });
                }
                else {
                    current.setState(() => {
                        return { isLoaded: true, response: data.response, pageInfo: data.pageInfo }
                    });
                }
            }
        });
    }

    render() {
        let creation;

        if (this.state.create) {
            creation = <CarCreate parent={this} />
        }

        if (!this.state.isLoaded) {
            this.load();
        }

        return (
            <div className="root">
                <Heading parent={this} />
                {creation}
                <CarsList root={this} isLoaded={this.state.isLoaded} response={this.state.response} page={this.state.pageInfo} />
                <Paging parent={this} page={this.state.pageInfo} />
             </div>
            );
    }
}

let domContainer = document.querySelector('#root');
ReactDOM.render(<Root />, domContainer);