function PopupWithForm(props) {
    this.props = props;
    return ( <
        div className = "PopupWithForm" >
        <
        >
        <
        div className = {
            `overlay overlay-${this.props.name}`
        } >
        <
        form className = "overlay__form"
        name = {
            `form-${this.props.name}`
        }
        noValidate = "" >
        <
        fieldset className = "popup " >
        <
        h2 className = "popup__maintitle" > `${this.props.title}` < /h2> <
        input id = "name"
        type = "text"
        name = "user"
        className = "popup__input popup__input_value_name"
        placeholder = "Имя"
        minLength = {
            2
        }
        maxLength = {
            40
        }
        required = "" /
        >
        <
        span id = "name-error"
        className = "popup__error" / >
        <
        input id = "profession"
        type = "text"
        name = "profession"
        className = "popup__input popup__input_value_profession"
        placeholder = "Профессия"
        minLength = {
            2
        }
        maxLength = {
            200
        }
        required = "" /
        >
        <
        span id = "profession-error"
        className = "popup__error" / >
        <
        button type = "submit"
        className = "popup__submit"
        arialabel = "Кнопка сохранить" >
        Сохранить <
        /button> <
        button type = "button"
        className = "button close-btn" / >
        <
        /fieldset> < /
        form > <
        /div>  < / >
        <
        /
        div >
    );
}

export default PopupWithForm;