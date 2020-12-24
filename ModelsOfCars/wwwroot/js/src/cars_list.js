import { CarItem } from '/js/car_item.js';

export class CarsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { error, isLoaded, response, page } = this.props;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded || page.current >= page.totalPages) {
            return <img src="/images/loader.gif" className="center" width="110" />;
        }
        else if (page.totalPages == 0) {
            return <h2>У Вас нет ещё поездок! Скорее добавьте!</h2>;
        } else { 

            return (
                response.map(item => (
                    <CarItem value={item} key={item.id} current_state={0} />))
                );
        }
    }
}