const size = 10;

import { CarItem } from '/js/car_item.js';

class CarsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            page: 0,
            response: [],
            pageInfo: null
        };
    }

    componentDidMount() {

        var current = this;

        $.ajax({
            url: "api/Cars/GetAll?Size=" + size + "&Current=" + this.state.page,
            success: function (data) {
                current.setState(() => {
                    return { isLoaded: true, response: data.response, pageInfo: data.pageInfo }
                });
            }
        });
    }

    render() {
        const { error, isLoaded, page, response, pageInfo } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            //Добавить крутящийся кружок
            return <div>Загрузка...</div>;
        } else { 
            return (
                response.map(item => (
                    <CarItem value={item} key={item.id} current_state={0}/>
                )) );
        }
    }
}

let domContainer = document.querySelector('#cars_list');
ReactDOM.render(<CarsList />, domContainer);