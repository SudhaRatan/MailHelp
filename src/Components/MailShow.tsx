import { BsMailbox2Flag } from "react-icons/bs";
import { useMailStore } from "../Stores/mailStore";

export const MailShow = () => {
  const selectedMail = useMailStore((state) => state.selectedMail);
  return (
    <>
      {selectedMail?.mailBodyHtml ? (
        <div className="flex flex-col p-4 gap-4 h-full">
          <div className="shadow-md rounded-md p-3 font-semibold">{selectedMail.subject}</div>
          <div className="shadow-md rounded-md p-3 h-full">
            {/* <HTMLContentRenderer htmlContent={selectedMail.mailBodyHtml} /> */}
            <iframe srcDoc={selectedMail.mailBodyHtml} width={'100%'} height={'100%'} />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <BsMailbox2Flag size={40} color="gray" />
          <div className="font-semibold">Select an item to read</div>
          <div className="font-light">Nothing is selected</div>
        </div>
      )}
    </>
  );
};
