import '../../index.css';

export interface EmailHeader {
    SenderName : string,
    EmailHeader : string,
    EmailSentTime : string,
    EmailBody : string
}
  
function EmailComponent(props : EmailHeader){

    return <div className="Email">
      <div className="EmailHeaderTimeContainer">
        <div className="EmailHeaderContainer">
          <p className="SenderName nomargin">{props.SenderName}</p>
          <p className="EmailHeader nomargin">{props.EmailHeader}</p>
        </div>
        <p className="EmailSentTime nomargin">{props.EmailSentTime}</p>
      </div>
      <p className="PreviewEmailBody nomargin">{props.EmailBody}</p>
      </div>
}
export default EmailComponent;