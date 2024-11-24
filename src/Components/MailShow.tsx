import { BsMailbox2Flag } from "react-icons/bs";
import { useMailStore } from "../Stores/mailStore";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { formatDateCustom } from "../Utils/DateUtil";
import { useState } from "react";
import {
  useAiResponsesStore,
} from "../Stores/aiResponsesStore";
import { AIResponse } from "./AIResponse";
import { FiRepeat } from "react-icons/fi";
import colors from "tailwindcss/colors";
import axios from "axios";
import { API_URL } from "../Constants/config";

export const MailShow = () => {
  const selectedMail = useMailStore((state) => state.selectedMail);
  const [show, setShow] = useState<boolean>(true);

  const aiResponses = useAiResponsesStore((s) => s.aiResponses);
  const updateAiResponse = useAiResponsesStore((s) => s.updateAiResponse);
  const [replied, setReplied] = useState(false);
  const [regenerating,setR] = useState(false)

  const regenerate = async () => {
    if (selectedMail) {
      try {
        setR(true)
      const aiRes = await axios.post(`${API_URL}/regerateResponse`, {
        mailId: selectedMail.id,
        mailText: `Subject: ${selectedMail.subject}, Body: ${selectedMail.mailText}`,
        categoryId: aiResponses?.find((i) => i.mailId == selectedMail.id)
          ?.categoryId,
      });
      setR(false)
      console.log(aiRes.data);
      updateAiResponse({
        categoryId: aiRes.data.categoryId,
        mailId: aiRes.data.mailId,
        aiResponse: JSON.parse(aiRes.data.aiResponse),
      });
      } catch (error) {
        console.log(error)
        setR(false)
      }
      
    }
  };

  const setRep = (rep: boolean) => {
    setReplied(rep);
  };

  return (
    <>
      {selectedMail?.mailBodyHtml ? (
        <div className="flex flex-col p-4 gap-4 h-full">
          {/* <Accordion
            open={open === 1}
            placeholder={null}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <div className="shadow-md rounded-md p-3 font-semibold w-full">
              <AccordionHeader
                onClick={() => handleOpen(1)}
                placeholder={null}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="flex justify-between w-full items-center">
                  {selectedMail.subject}
                  <IoChevronDown
                    className={`${open === 1 && "rotate-180"} transition-all`}
                    size={18}
                  />
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="shadow-md rounded-md px-3 flex justify-between items-center">
                  <div className="flex px-0 p-2 gap-3">
                    <HiOutlineUserCircle size={24} />
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 items-center">
                        <div className="text-sm font-semibold">
                          {selectedMail?.fromName}
                        </div>
                        <div className="text-sm">
                          {selectedMail.fromAddress}
                        </div>
                      </div>
                      <div className="text-sm font-normal flex gap-2 items-center">
                        <p className="font-semibold">To: </p>
                        <p className="opacity-75">Me</p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {formatDateCustom(selectedMail?.receivedDateTime as string)}
                  </div>
                </div>
              </AccordionBody>
            </div>
          </Accordion>
          <Accordion
            open={open === 2}
            placeholder={null}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="h-full"
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              placeholder={null}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Mail
            </AccordionHeader>
            <AccordionBody>
              <div className="h-full"></div>
            </AccordionBody>
          </Accordion> */}
          <div
            className={`collapse collapse-arrow rounded-md shadow-md ${
              show ? "collapse-open flex-1" : "collapse-close"
            }`}
          >
            <input
              type="radio"
              name="my-accordion-1"
              defaultChecked
              onClick={() => setShow(!show)}
              className="cursor-pointer"
            />
            <div className="collapse-title text-lg font-semibold">
              <div className="flex justify-between w-full items-center">
                {selectedMail.subject}
              </div>
            </div>
            <div className="collapse-content">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <HiOutlineUserCircle size={24} />
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                      <div className="text-sm font-semibold">
                        {selectedMail?.fromName}
                      </div>
                      <div className="text-sm">{selectedMail.fromAddress}</div>
                    </div>
                    <div className="text-sm font-normal flex gap-2 items-center">
                      <p className="font-semibold">To: </p>
                      <p className="opacity-75">Me</p>
                    </div>
                  </div>
                </div>
                <div className="">
                  {formatDateCustom(selectedMail?.receivedDateTime as string)}
                </div>
              </div>
              <iframe
                srcDoc={selectedMail.mailBodyHtml}
                className="p-5"
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>

          {aiResponses?.find((i) => i.mailId == selectedMail.id)?.aiResponse ? (
            <div
              className={`collapse collapse-arrow rounded-md shadow-md ${
                show ? "collapse-close" : "collapse-open flex-1"
              }`}
            >
              <input
                type="radio"
                name="my-accordion-2"
                onClick={() => setShow(!show)}
                className="cursor-pointer"
                style={{ width: "600px" }}
              />
              <div className="flex collapse-title text-lg font-semibold w-full justify-between items-center">
                <div>Assistant response</div>
                <div className="flex items-center gap-2">
                  <div className="text-white btn btn-primary btn-xs">
                    {
                      aiResponses?.find((i) => i.mailId == selectedMail.id)
                        ?.aiResponse?.category
                    }
                  </div>
                  {!replied && (
                    <div
                      className={`tooltip ${
                        show ? "tooltip-left" : "tooltip-bottom"
                      }`}
                      data-tip="Regenerate"
                    >
                      <button
                        className="btn btn-square btn-sm hover:bg-gray-200"
                        onClick={regenerate}
                        disabled={regenerating}
                      >
                       {regenerating ? <div className="loading loading-spinner"></div> :<FiRepeat color={colors.purple[800]} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="collapse-content">
                {aiResponses?.find((i) => i.mailId == selectedMail.id)
                  ?.aiResponse && (
                  <AIResponse
                    setRep={setRep}
                    aiResponse={
                      aiResponses.find((i) => i.mailId == selectedMail.id)!
                    }
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="loading loading-dots flex justify-center items-center"></div>
          )}
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
