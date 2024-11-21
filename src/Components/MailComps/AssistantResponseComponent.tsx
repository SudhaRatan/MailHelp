import '../../index.css'

export interface AssitantProps {
    // SenderProfilePicture : string,
    category : string,
    ResponseBody : string
}
  
function AssistantResponse(props : AssitantProps){

    return <div className='parentContainer'>
        <div className='parentAssistantcontainer'>
            <div className='LeftContent'>
                <div className='hugeicons--bot'></div>
                <p className='lowOpacity'> Assistant Response</p>
            </div>
                <div className='RightContent'>
                    <div className='tdesign--edit'></div>
                        <p className='ResultLabel'>{props.category}</p>
                    <div className='mdi--head-reload-outline'></div>
                    <div className='stash--chevron-down'></div>
                </div>
        </div>
        {/* <img src = {props.SenderProfilePicture} className='SenderProfileImage'/> */}

        <div className='EmailBody'>
            <p>{props.ResponseBody}</p>
        </div>
        </div>
}

export default AssistantResponse;