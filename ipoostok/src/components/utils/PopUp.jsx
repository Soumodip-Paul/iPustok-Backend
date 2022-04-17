export const PopUp = ({ text }) => {
    return (
        <>
            <div className="modal fade" id="PopUp" tabIndex="-1" aria-labelledby="PopUpLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="PopUpLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {text}
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" >Close</button> */}
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
