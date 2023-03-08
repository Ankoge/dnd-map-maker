
const ButtonSwitch = ({isActive, setIsActive}) =>{

    const handleClick = () => {
        setIsActive(!isActive);
    }

    return (
        <div className={"button-switch".concat(!isActive ? " hidden": " shown")}
             onClick={handleClick}>
        </div>
    )
}

export default ButtonSwitch;
