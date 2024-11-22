import axios from "axios";
import { mail, useMailStore } from "../Stores/mailStore";
import { API_URL } from "../Constants/config";
import { useEffect } from "react";
import { formatDate } from "../Utils/DateUtil";

interface EmailPreviewProps {
  mail: mail;
}

export const EmailPreview = ({ mail }: EmailPreviewProps) => {
  const mails = useMailStore((s) => s.mails);
  const updateMail = useMailStore((s) => s.updateMail);
  const setSelectedMail = useMailStore((s) => s.setSelectedMail);
  const selectedMail = useMailStore((s) => s.selectedMail);
  // const [mail1, setMail] = useState<mail | null>(null);

  const getMailData = async () => {
    const mailData = mails?.find((i) => i.id == mail.id);
    if (!mailData?.receivedDateTime) {
      const res = await axios.get(API_URL + `/mailData/${mail.id}`);
      updateMail({
        id: mail.id,
        receivedDateTime: res.data.date,
        threadId: mail.threadId,
        fromName: res.data.from.value[0].name,
        mailBodyHtml: res.data.html,
        mailBodyText: res.data.snippet,
        subject: res.data.subject,
        historyId: res.data.historyId,
      });
    }
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
        if (mail) setSelectedMail(mail);
      }}
    >
      {/* <div>{mail1?.id}</div> */}
      <div className="flex justify-between overflow-hidden whitespace-nowrap items-end">
        <div className="">{mail?.fromName}</div>
        <div className="text-xs">{formatDate(mail?.receivedDateTime)}</div>
      </div>
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {mail?.subject}
      </div>
      <div className="text-ellipsis overflow-hidden whitespace-nowrap font-light">
        {mail?.mailBodyText?.slice(0, 100)}
      </div>
    </div>
  );
};
