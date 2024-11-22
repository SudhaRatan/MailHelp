import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useMailStore } from "../Stores/mailStore";
import axios from "axios";
import { API_URL } from "../Constants/config";
import { googleLogout } from "@react-oauth/google";
import { useAuthStore } from "../Stores/authStore";
import { useEffect, useState } from "react";

export const Pagination = () => {
  const mails = useMailStore((state) => state.mails);
  const setMails = useMailStore((state) => state.setMails);
  const nextPageToken = useMailStore((state) => state.nextPageToken);
  const setNextPageToken = useMailStore((state) => state.setNextPageToken);
  const page = useMailStore((s) => s.page);
  const setPage = useMailStore((s) => s.setPage);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const mailsPerPage = useMailStore((state) => state.mailsPerPage);

  const setToken = useAuthStore((state) => state.setToken);
  const setTokenInfo = useAuthStore((state) => state.setTokenInfo);
  // const tokenInfo = useAuthStore((state) => state.tokenInfo);
  const token = useAuthStore((state) => state.token);

  const [nextLoading, setNextLoading] = useState(false);

  const nextPage = async () => {
    setSelectedMail(null);
    if (mails && mails?.length / mailsPerPage > page + 1) {
      setPage(page + 1);
    } else {
      setNextLoading(true);
      await getMails();
      setNextLoading(false);
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    setSelectedMail(null);
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const getMails = async () => {
    try {
      const res = await axios.get(
        API_URL +
          `/getMails?max=${mailsPerPage}${
            nextPageToken ? `&nextPageToken=${nextPageToken}` : ""
          }`
      );
      if (mails == null) setMails(res.data.messages);
      else setMails([...mails, ...res.data.messages]);
      setNextPageToken(res.data.nextPageToken);
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  const logout = () => {
    googleLogout();
    setToken("");
    setTokenInfo(null);
    setSelectedMail(null);
    setMails(null);
    setNextPageToken(null);
    setPage(0);
  };

  useEffect(() => {
    axios.defaults.headers.get["x-access-token"] = token;
    getMails();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="shadow-inner p-1 flex justify-end items-center gap-4">
      <div className="text-sm font-light">
        {page * 20 + 1} - {page * 20 + 20}
      </div>
      <div className="flex gap-2">
        <div
          className="hover:bg-gray-200 p-2 transition-all duration-300 rounded-full cursor-pointer"
          onClick={prevPage}
        >
          <GoChevronLeft className="" />
        </div>
        {nextLoading ? (
          <div className="loading loading-sm loading-spinner"></div>
        ) : (
          <div
            className="hover:bg-gray-200 p-2 transition-[background-color] duration-300 rounded-full cursor-pointer"
            onClick={nextPage}
          >
            <GoChevronRight className="" />
          </div>
        )}
      </div>
    </div>
  );
};
