import { MutableRefObject, useEffect, useRef, useState } from "react";
import { aiResp } from "../Stores/aiResponsesStore";
import { MdSend } from "react-icons/md";
import colors from "tailwindcss/colors";
import { useMailStore } from "../Stores/mailStore";
import { useAuthStore } from "../Stores/authStore";
import axios from "axios";
import { API_URL } from "../Constants/config";

export interface AIRespComp {
  aiResponse: aiResp;
  setRep: (b:boolean) => void
}

export const AIResponse = ({ aiResponse, setRep }: AIRespComp) => {
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const selectedMail = useMailStore((m) => m.selectedMail);
  const token = useAuthStore((t) => t.token);

  const [reply, setReply] = useState(aiResponse.aiResponse?.suggestedReply);
  const [loading, setLoading] = useState(false);
  const [replied, setReplied] = useState(false);
  useEffect(() => {
    if (selectedMail?.repliedText) {
      setReplied(true);
      setReply(selectedMail.repliedText);
      setRep(true)
    } else if (aiResponse.aiResponse && replyRef.current) {
      setReply(aiResponse.aiResponse?.suggestedReply);
      setReplied(false);
      setRep(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiResponse, selectedMail]);

  const sendReply = async () => {
    const threadId = selectedMail?.threadId;
    if (threadId) {
      try {
        setLoading(true);
        const res = await axios.post(API_URL + "/sendReply", {
          threadId,
          mailBody: reply,
          access_token: token,
          mailId: selectedMail.id,
        });
        setLoading(false);
        setReplied(true);
        console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const [resolved,setResolved] = useState(selectedMail?.resolved === 1)

  const toggleResolve = () => {
    if (selectedMail) axios.get(API_URL + `/toggleResolve/${selectedMail.id}/${selectedMail.resolved}`);
    setResolved(!resolved)
  };

  useEffect(() => {
    setResolved(selectedMail?.resolved === 1)
  },[selectedMail])

  return (
    <div className="flex flex-col h-full gap-4">
      <div>
        <b>Category: </b>
        {aiResponse.aiResponse?.category}
      </div>
      <div>
        <b>Summary: </b>
        {aiResponse.aiResponse?.summary}
      </div>
      <div className="flex-1 relative">
        <div className="absolute bg-white left-2 px-2">Reply</div>
        {!replied && (
          <div className="tooltip tooltip-top absolute bottom-0 right-3" data-tip="send">
          <button
            className="btn btn-square hover:bg-gray-200"
            onClick={sendReply}
            disabled={loading}
            >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <MdSend className="" size={24} color={colors.purple[800]} />
            )}
          </button>
            </div>
        )}
        <textarea
          disabled={replied}
          onChange={(e) => setReply(e.target.value)}
          value={reply}
          ref={replyRef as MutableRefObject<HTMLTextAreaElement>}
          className="w-full h-full border-2 inp resize-none mt-3 p-4"
        ></textarea>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <b>Suggested action: </b>
          <div className="btn btn-link">{aiResponse.aiResponse?.action}</div>
        </div>
        <button className="btn btn-success btn-sm text-gray-50" onClick={toggleResolve}>
          {resolved ? "Mark as unresolved" : "Mark as resolved"}
        </button>
      </div>
    </div>
  );
};
