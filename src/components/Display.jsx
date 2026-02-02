function Display({calculatorinput}){
    return(
        <input id = "display" value={calculatorinput} readOnly></input>
    );
}

export default Display