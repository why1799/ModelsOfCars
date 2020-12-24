import { CarItem } from '/js/car_item.js';

export class CarsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: props.root,
        };
    }

    render() {
        const { root, error, isLoaded, response, page } = this.props;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded || page.current >= page.totalPages) {
            if (page != null && page.totalPages == 0) {
                return <h2>У Вас нет ещё машин! Скорее добавьте!</h2>;
            }
            return <img src="/images/loader.gif" className="center" width="110" />;
        }
        else { 

            return (
                response.map(item => (
                    <CarItem root={root} value={item} key={item.id} current_state={0} />))
                );
        }
    }
}