import '../../index.css'

export interface EmailPreview {
    // SenderProfilePicture : string,
    From_name? : string,
    From_email? : string,
    To_name? : string,
    EmailRecievedTime? : string,
    EmailContent? : string;
}
  
function EmailPreviewContainer(props : EmailPreview){

    return <div className='parentContainer'>
        <div className='parentHeadercontainer'>
            <div className='LeftContent'>
                <div className='la--user-circle'></div>
                <div className='EmailParentContainer'>
                    <div className='SenderDetails'>
                        <p className='SenderName nomargin'>{props.From_name}</p>
                        <p className='SenderEmail nomargin'>{props.From_email}</p>
                    </div>
                    <div className='To'>
                        <p className='nomargin lowOpacity'>To: </p>
                        <p className='RecieverName nomargin'>Me</p>
                    </div>
                </div>
            </div>
                <div className='RightContent'>
                    <div className='bi--reply'></div>
                    <p className='EmailRecievedTime nomargin'>{props.EmailRecievedTime}</p>
                </div>
        </div>
        {/* <img src = {props.SenderProfilePicture} className='SenderProfileImage'/> */}

        <div className='EmailBody'>
            <p>{props.EmailContent}</p>
        </div>
        </div>
}

export default EmailPreviewContainer;