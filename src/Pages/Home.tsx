/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { googleLogout } from "@react-oauth/google";
import { CiLogout } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useAuthStore } from "../Stores/authStore";
import { RefObject, useEffect, useRef, useState } from "react";
import { CiInboxIn } from "react-icons/ci";
import { useMailStore } from "../Stores/mailStore";
import { EmailPreview } from "../Components/EmailPreview";
import { MailShow } from "../Components/MailShow";
import { Pagination } from "../Components/Pagination";
import socket from "../Utils/Socket";
import axios from "axios";
import { API_URL } from "../Constants/config";
import { CategoryItem } from "../Components/CategoryItem";
import { useCategoryStore } from "../Stores/categoryStore";
import { FaPlus } from "react-icons/fa";
import { getCategories } from "../Utils/CategoryUtils";
import Dashboard from "../Components/Dashboard";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

export const Home = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setTokenInfo = useAuthStore((state) => state.setTokenInfo);
  const tokenInfo = useAuthStore((state) => state.tokenInfo);

  const mails = useMailStore((state) => state.mails);
  const addNewMails = useMailStore((state) => state.addNewMails);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setNextPageToken = useMailStore((state) => state.setNextPageToken);
  const setPage = useMailStore((s) => s.setPage);
  const setMails = useMailStore((state) => state.setMails);
  const page = useMailStore((s) => s.page);
  const mailsPerPage = useMailStore((s) => s.mailsPerPage);

  const categories = useCategoryStore((s) => s.categories);

  const [listWidth, setListWidth] = useState<number | null | undefined>(null);
  const [categoryLabel, setCategoryLabel] = useState<string>("");
  const [labelId, setLabelId] = useState<number | null>(null);
  const [edit, setEdit] = useState(false);
  const selectedCategory = useCategoryStore((s) => s.selectedCategory);
  const setSelectedCategory = useCategoryStore((s) => s.setSelectedCategory);
  const [search, setSearch] = useState<string>("");
  const [showDashboard, setDash] = useState(false);

  const logout = async () => {
    googleLogout();
    setToken("");
    setTokenInfo(null);
    setSelectedMail(null);
    setMails(null);
    setNextPageToken(null);
    setPage(0);
    await axios.get(`${API_URL}/logout`);
  };

  const mailListRef = useRef<HTMLElement>(null);

  const getHistoryMessages = async () => {
    const ms = useMailStore.getState().mails;
    type h = {
      messagesAdded: string;
      message: string;
    };
    if (ms) {
      const historyId = ms[0].historyId;
      const response = await axios.get(`${API_URL}/getNew/${historyId}`);
      console.log(
        response.data.history
          .flatMap((i: h) => i.messagesAdded)
          .filter((i: h) => i != undefined)
          .flatMap((i: h) => i.message)
          .filter((message: any) => {
            // Check if the message is not from your email
            return !message.labelIds.includes("SENT");
          })
      );
      addNewMails(
        response.data.history
          .flatMap((i: h) => i.messagesAdded)
          .filter((i: h) => i != undefined)
          .flatMap((i: h) => i.message)
          .filter((message: any) => {
            // Check if the message is not from your email
            return !message.labelIds.includes("SENT");
          })
      );
    }
  };

  const addCategory = async () => {
    try {
      if (categoryLabel != "") {
        (document.getElementById("my_modal_2") as HTMLDialogElement).close();
        if (!edit) {
          await axios.post(API_URL + "/categories", {
            label: categoryLabel,
          });
        } else {
          await axios.put(API_URL + "/categories", {
            label: categoryLabel,
            id: labelId,
          });
        }
        setCategoryLabel("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    if (listWidth === null) setListWidth(mailListRef?.current?.offsetWidth);
    socket.connect();

    socket.on("connect", function () {
      console.log("Connected to server");
      socket.emit("join", { email: tokenInfo?.email });
    });

    socket.on("notification", function (data) {
      console.log(data);
      getHistoryMessages();
    });

    socket.on("dataChange", function (data) {
      if (data == "category") {
        getCategories();
      }
    });
  }, []);

  return (
    <div
      className="grid h-[100dvh] overflow-hidden"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      {/* Left side bar */}
      <div className="border flex flex-col max-h-[100dvh]">
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-3 pt-[13%]">
            <div className="flex items-start gap-2">
              <img src="/src/assets/Icon.png" className="h-8 w-8" />
              <p className="text-2xl font-semibold">Mail</p>
            </div>
          </div>
          <div className="divider mx-4 my-0"></div>
          {/* Inbox */}
          <div
            className={`flex justify-between p-2 items-center ${
              selectedCategory === "Inbox" && !showDashboard
                ? "btn text-purple-800"
                : "btn btn-ghost"
            } m-2`}
            onClick={() => {
              setSelectedCategory("Inbox");
              setDash(false);
            }}
          >
            <div className="flex gap-2 items-center text-lg">
              <CiInboxIn size={26} />
              <div className="text-violet-700">Inbox</div>
            </div>
            {/* <div className="text-xs text-violet-700">123</div> */}
          </div>
          <div
            className={`btn flex pl-2 gap-2 items-center m-2 text-lg justify-start font-normal ${
              showDashboard ? "btn text-purple-700" : "btn-ghost "
            }`}
            onClick={() => setDash(!showDashboard)}
          >
            <TbDeviceDesktopAnalytics size={20} />
            Dashboard
          </div>
          <div className="divider mx-4 my-0"></div>
          <div className="flex justify-between p-2 items-center">
            <div className="flex gap-2 items-center text-lg">
              <div className="font-normal opacity-75">Categories</div>
            </div>
            <div
              className="text-2xl font-normal opacity-75 btn btn-square btn-sm border-none bg-transparent"
              onClick={() => {
                setEdit(false);
                (
                  document.getElementById("my_modal_2") as HTMLDialogElement
                )?.showModal();
              }}
            >
              <FaPlus size={14} />
            </div>
          </div>
          <div className="flex flex-col overflow-auto">
            {categories?.map((category) => {
              return (
                <CategoryItem
                  showDashboard={showDashboard}
                  click={() => setDash(false)}
                  category={selectedCategory}
                  setCategory={setSelectedCategory}
                  label={category.label}
                  count={category.count}
                  id={category.id}
                  key={category.id}
                  onEditPress={(label: string, id: number) => {
                    setEdit(true);
                    setCategoryLabel(label);
                    setLabelId(id);
                    (
                      document.getElementById("my_modal_2") as HTMLDialogElement
                    )?.showModal();
                  }}
                  onDeletePress={async (id) => {
                    await axios.delete(API_URL + `/categories/${id}`);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-row gap-2 p-2 border-t">
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
      {showDashboard ? (
        <Dashboard />
      ) : (
        <div className="border flex flex-1">
          {/* Mails */}
          <div
            className={`border-r flex-[3] flex flex-col max-h-[100dvh] ${
              listWidth != null ? `max-w-[${listWidth}] w-[${listWidth}]` : ""
            } overflow-hidden`}
            ref={mailListRef as RefObject<HTMLDivElement>}
          >
            {/* Inbox header */}
            <div className="flex justify-between p-3 border-b-2 items-center pt-[7%] pb-[4%]">
              <div className="text-lg font-semibold">Inbox</div>
              <label className="input input-bordered input-sm flex items-center gap-2">
                <input
                  type="text"
                  className=""
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
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
                  {mails.slice(page * mailsPerPage, (page + 1) * mailsPerPage)
                    .length > 0 ? (
                    mails
                      .filter((i) => {
                        if (
                          i.fromAddress
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                          i.fromName
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                          i.subject
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                          i.mailText
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                          !i.fromAddress ||
                          !i.fromName
                        ) {
                          return true;
                        }
                        return false;
                      })
                      .slice(page * mailsPerPage, (page + 1) * mailsPerPage)
                      // .slice(12,13)
                      .map((mail) => {
                        return <EmailPreview mail={mail} key={mail.id} />;
                      })
                  ) : (
                    <div className="flex w-full h-full justify-center items-center">
                      End of the list
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex w-full h-full justify-center items-center">
                  No mails
                </div>
              )
            ) : (
              <div className="flex w-full h-full justify-center items-center">
                <div className="loading loading-ring loading-lg"></div>
              </div>
            )}
            <Pagination category={selectedCategory} />
          </div>
          <div className="flex-[5] border-l max-h-[100dvh] h-[100dvh] overflow-auto">
            <MailShow />
          </div>
        </div>
      )}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg mb-5">
            {edit ? "Update category" : "Add a category"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCategory();
            }}
          >
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="e.g. claim"
                className="input input-bordered input-sm w-full max-w-xs"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
              />
              <button className="btn btn-primary btn-sm">
                {edit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
