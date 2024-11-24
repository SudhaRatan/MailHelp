import axios from "axios";
import { mail, useMailStore } from "../Stores/mailStore";
import { API_URL } from "../Constants/config";
import { useEffect, useState } from "react";
import { formatDate } from "../Utils/DateUtil";
import { useAiResponsesStore } from "../Stores/aiResponsesStore";
import { LuDot } from "react-icons/lu";
import colors from "tailwindcss/colors";

interface EmailPreviewProps {
  mail: mail;
}

export const EmailPreview = ({ mail }: EmailPreviewProps) => {
  const mails = useMailStore((s) => s.mails);
  const updateMail = useMailStore((s) => s.updateMail);
  const setSelectedMail = useMailStore((s) => s.setSelectedMail);
  const selectedMail = useMailStore((s) => s.selectedMail);
  const updateReply = useMailStore((s) => s.updateReply);
  const addResponse = useAiResponsesStore((s) => s.addResponse);
  const [read, setRead] = useState<boolean>(true);

  const getMailData = async () => {
    const mailData = mails?.find((i) => i.id == mail.id);
    if (!mailData?.receivedDateTime) {
      const res = await axios.get(API_URL + `/mailData/${mail.id}`);
      console.log(res);
      updateMail({
        id: mail.id,
        receivedDateTime: res.data.date,
        threadId: mail.threadId,
        fromName: res.data.from.value[0].name,
        fromAddress: res.data.from.value[0].address,
        mailBodyHtml: res.data.html,
        mailBodyText: res.data.snippet,
        mailText: res.data.text,
        subject: res.data.subject,
        historyId: res.data.historyId,
        resolved: res.data.resolved,
      });
      setRead(res.data.read === 1);
      const aiRes = await axios.post(`${API_URL}/getAiResponse`, {
        mailId: mail.id,
        mailText: `Subject: ${res.data.subject}, Body: ${res.data.text}`,
      });
      const { categoryId, mailId, aiResponse } = aiRes.data;
      addResponse({ categoryId, mailId, aiResponse: JSON.parse(aiResponse) });
    }
  };

  const readMail = async () => {
    try {
      await axios.get(API_URL + "/readMail/" + mail.id);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMailReplyIfExists = async () => {
    const res = await axios.get(API_URL + "/loadReply/" + mail.id);
    updateReply(res.data[0]);
    console.log(res.data[0]);
  };

  useEffect(() => {
    getMailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!mail?.receivedDateTime) {
    return null;
  }
  return (
    <div
      className={`${mail?.receivedDateTime && "border-b-2"} cursor-pointer ${
        mail.id === selectedMail?.id ? "bg-gray-200" : "hover:bg-gray-100"
      } px-6 py-2`}
      onClick={() => {
        if (mail) {
          setSelectedMail(mail);
          setRead(true);
          if (!read) readMail();
          if (selectedMail) loadMailReplyIfExists();
        }
      }}
    >
      {!read && (
        <LuDot
          className="absolute -translate-x-6 -translate-y-[2px] "
          size={28}
          color={colors.blue[700]}
        />
      )}
      {/* <div>{mail1?.id}</div> */}
      <div
        className={`flex justify-between overflow-hidden whitespace-nowrap items-end ${
          !read ? "font-semibold" : ""
        }`}
      >
        <div className="">{mail?.fromName}</div>
        <div className="text-xs">{formatDate(mail?.receivedDateTime)}</div>
      </div>
      <div
        className={`${
          !read ? "font-semibold" : ""
        } text-ellipsis overflow-hidden whitespace-nowrap`}
      >
        {mail?.subject}
      </div>
      <div className="text-ellipsis overflow-hidden whitespace-nowrap font-light">
        {mail?.mailBodyText?.slice(0, 70)}
      </div>
    </div>
  );
};
