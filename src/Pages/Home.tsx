import { googleLogout } from "@react-oauth/google";
import { CiLogout } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useAuthStore } from "../Stores/authStore";
import { useEffect, useRef, useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import colors from "tailwindcss/colors";
import { CiInboxIn } from "react-icons/ci";
import { useMailStore } from "../Stores/mailStore";
import { EmailPreview } from "../Components/EmailPreview";
import { MailShow } from "../Components/MailShow";
import { Pagination } from "../Components/Pagination";

export const Home = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setTokenInfo = useAuthStore((state) => state.setTokenInfo);
  const tokenInfo = useAuthStore((state) => state.tokenInfo);

  const mails = useMailStore((state) => state.mails);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setNextPageToken = useMailStore((state) => state.setNextPageToken);
  const setPage = useMailStore((s) => s.setPage);
  const setMails = useMailStore((state) => state.setMails);
  const page = useMailStore((s) => s.page);
  const mailsPerPage = useMailStore((s) => s.mailsPerPage);

  const [listWidth, setListWidth] = useState<number | null | undefined>(null);

  const logout = () => {
    googleLogout();
    setToken("");
    setTokenInfo(null);
    setSelectedMail(null);
    setMails(null)
    setNextPageToken(null)
    setPage(0)
  };


  
  const mailListRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (listWidth === null) setListWidth(mailListRef?.current?.offsetWidth);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div
      className="grid h-[100dvh] overflow-hidden"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      {/* Left side bar */}
      <div className="border flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-2 ">
            <div className="text-2xl font-semibold">Mail</div>
            <button className="btn btn-square btn-ghost btn-sm">
              <GoSidebarExpand size={24} color={colors.purple[800]} />
            </button>
          </div>
          <div className="divider mx-4 my-0"></div>
          {/* Inbox */}
          <div className="flex justify-between p-2 items-center btn m-2">
            <div className="flex gap-2 items-center text-lg">
              <CiInboxIn size={26} />
              <div>Inbox</div>
            </div>
            <div className="text-xs">123</div>
          </div>
          <div className="divider mx-4 my-0"></div>
        </div>
        <div className="flex flex-row items-center gap-2 p-2 border-t">
          <div>
            <HiOutlineUserCircle size={24} />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold">Insurance company</div>
            {tokenInfo?.email ? (
              <div className="text-xs">{tokenInfo.email}</div>
            ) : (
              <div className="text-sm">Fetching details...</div>
            )}
          </div>
          <button className="btn btn-square btn-sm" onClick={logout}>
            <CiLogout />
          </button>
        </div>
      </div>
      <div className="border flex flex-1">
        {/* Mails */}
        <div
          className={`border-r flex-[3] flex flex-col max-h-[100dvh] ${
            listWidth != null ? `max-w-[${listWidth}] w-[${listWidth}]` : ""
          } overflow-hidden`}
          ref={mailListRef}
        >
          {/* Inbox header */}
          <div className="flex justify-between p-3 border-b-2 items-center">
            <div className="text-lg font-semibold">Inbox</div>
            <label className="input input-bordered input-sm flex items-center gap-2">
              <input type="text" className="" placeholder="Search" />
              {/* Search icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          {mails ? (
            mails.length > 0 ? (
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {mails.slice(page * mailsPerPage,(page + 1) * mailsPerPage  ).map((mail) => {
                  return <EmailPreview mail={mail} key={mail.id} />;
                })}
              </div>
            ) : (
              <div className="flex w-full h-full">No mails</div>
            )
          ) : (
            <div className="flex w-full h-full justify-center items-center"><div className="loading loading-ring loading-lg"></div></div>
          )}
          <Pagination />
        </div>
        <div className="flex-[5] border-l max-h-[100dvh] h-[100dvh] overflow-auto">
          <MailShow />
        </div>
      </div>
    </div>
  );
};
