export class Heading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: props.parent,
        };
    }

    add() {
        this.state.parent.setState(() => {
            return { isLoaded: false, page: 0, create: true }
        });
    }

    render() {
        return (
            <div className ="carsheadadding">
                <h1 className ="carsname">Добавленные машины:</h1>
                <img title="Добавить машину" className="add" src="/images/add.png" onClick={() => this.add()}/>
            </div>
        );
    }
}