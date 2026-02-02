function Button({label,button_class,whatitdoes}){
    return(
        <button className = {button_class} onClick={whatitdoes}>
            {label}
        </button>
    );
}

export default Button