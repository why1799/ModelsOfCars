const size = 10;

class CarsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            page: 0,
            items: []
        };
    }

    componentDidMount() {

        var current = this;

        $.ajax({
            url: "api/Cars/GetAll?Size=" + size + "&Current=" + this.state.page,
            success: function (data) {
                current.state.items = data.response;
            }
        }).done(function () {
            current.setState((isLoaded) => {
                return { isLoaded: true }
            });
        });
    }

    render() {
        const { error, isLoaded, page, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} {item.price}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

let domContainer = document.querySelector('#cars_list');
ReactDOM.render(<CarsList />, domContainer);