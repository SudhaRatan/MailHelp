import "../../index.css";

export interface UserDetails {
  // SenderProfilePicture : string,
  name: string;
  email: string;
}

function LoggedInUserComponent(props: UserDetails) {
  return (
    <div className="parentContainer">
      <div className="parentHeadercontainer userDetailsContainer">
        <div className="LeftContent">
          <div className="la--user-circle"></div>
          <div className="EmailParentContainer">
            <div className="UserDetails">
              <p className="SenderName nomargin">{props.name}</p>
              <p className="SenderEmail nomargin">{props.email}</p>
            </div>
          </div>
        </div>
        <div className="RightContent">
          <div className="carbon--logout"></div>
        </div>
      </div>
      {/* <img src = {props.SenderProfilePicture} className='SenderProfileImage'/> */}
    </div>
  );
}

export default LoggedInUserComponent;
