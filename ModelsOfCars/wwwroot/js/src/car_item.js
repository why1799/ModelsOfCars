import { CarInfo } from '/js/car_info.js';
import { CarLoad } from '/js/car_load.js';
import { CarEdit } from '/js/car_edit.js';

export class CarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            root: props.root,
            value: props.value,
            current_state: props.current_state // 0 - info, 1 - edit, 2 - load
        };
    }

    render() {
        const current_state = this.state.current_state;

        if (current_state === 0) {
            return (
                <CarInfo root={this.state.root} parent={this} />
            );
        }
        if (current_state === 1) {
            return (
                <CarEdit root={this.state.root} parent={this} />
            );
        }
        else if(current_state === 2) {
            return (
                <CarLoad parent={this}/>
            );
        }
    }
}