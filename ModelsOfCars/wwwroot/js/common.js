export function handleChangeModel(event, car) {
    const value = car.state.value;
    value.model = event.target.value;
    car.setState({ value: value });
}

export function handleChangeSeats(event, car) {
    const value = car.state.value;
    value.seatsCount = event.target.value;
    car.setState({ value: value });
}

export function handleChangeUrl(event, car) {
    const value = car.state.value;
    value.url = event.target.value;
    car.setState({ value: value });
}

export function handleChangeBrandSelect(event, car) {
    const value = car.state.value;
    value.brandId = event.target.value;
    value.brandName = event.target[event.target.selectedIndex].text;
    car.setState({ value: value });
}

export function handleChangeBodyTypeSelect(event, car) {
    const value = car.state.value;
    value.bodyTypeId = event.target.value;
    value.bodyTypeName = event.target[event.target.selectedIndex].text;
    car.setState({ value: value });
}

export function removePhoto(event, car) {
    const value = car.state.value;
    value.photoBase64 = null;
    car.setState({ value: value });
}

export function fileAdded(event, car) {

    if (event.target.files.length > 0) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
            const value = car.state.value;
            value.photoBase64 = reader.result;
            car.setState({ value: value });
        };
        event.target.value = "";
    }
}

export function getBrands(car) {
    $.ajax({
        url: "api/Brands/GetAll",
        success: function (data) {

            car.setState(() => {
                return { brands: data }
            });
        }
    });
}

export function getBodyTypes(car) {
    $.ajax({
        url: "api/BodyType/GetAll",
        success: function (data) {

            car.setState(() => {
                return { bodyTypes: data }
            });
        }
    });
}