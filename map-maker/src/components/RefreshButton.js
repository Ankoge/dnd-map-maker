const RefreshButton = () => {

    const refreshMap = () => {
        window.location.reload();
    }

    return (
        <div className={"refresh-button"}
             onClick={refreshMap}>
            <div className={"refresh-button-background"}></div>
        </div>
    )
}

export default RefreshButton;

