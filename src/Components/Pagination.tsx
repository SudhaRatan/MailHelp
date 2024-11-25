import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { mail, useMailStore } from "../Stores/mailStore";
import axios from "axios";
import { API_URL } from "../Constants/config";
import { googleLogout } from "@react-oauth/google";
import { useAuthStore } from "../Stores/authStore";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../Stores/categoryStore";

interface PaginationType {
  category: string;
}

export const Pagination = ({ category }: PaginationType) => {
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
  const token = useAuthStore((state) => state.token);

  const [nextLoading, setNextLoading] = useState(false);
  const categories = useCategoryStore((s) => s.categories);
  console.log(mails, nextPageToken)

  const nextPage = async () => {
    setSelectedMail(null);
    if (mails && mails?.length / mailsPerPage > page + 1) {
      setPage(page + 1);
    } else {
      setNextLoading(true);
      if (category === "Inbox") await getMails(true);
      else {
        await getMailsByCategory(page + 1, true);
      }
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

  const getMails = async (pagination: boolean = false) => {
    try {
      setMails(null);
      const res = await axios.get(
        API_URL +
          `/getMails?max=${mailsPerPage}${
            nextPageToken ? `&nextPageToken=${nextPageToken}` : ""
          }`
      );
      console.log(res.data)
      if (res.data.resultSizeEstimate == 0) {
        // setMails([]);
      } else {
        if (mails != null && pagination)
          setMails([...mails, ...res.data.messages]);
        else setMails(res.data.messages);
        setNextPageToken(res.data.nextPageToken);
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const getMailsByCategory = async (
    pg: number = 0,
    pagination: boolean = false
  ) => {
    const categoryId = categories?.find((i) => i.label == category)?.id;
    const res = await axios.get(
      API_URL +
        "/getMailsByCategory/" +
        categoryId +
        `?pageNumber=${pg}&max=${mailsPerPage}`
    );
    type g = {
      mailId: string;
    };
    console.log(res.data.map((i: g) => ({ id: i.mailId })) as mail[]);
    if (mails && pagination)
      setMails([
        ...mails,
        ...(res.data.map((i: g) => ({ id: i.mailId })) as mail[]),
      ]);
    else setMails(res.data.map((i: g) => ({ id: i.mailId })) as mail[]);
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
    setMails(null);
    console.log("asd");
    (async () => {
      if (category == "Inbox") {
        await getMails(false);
      } else {
        await getMailsByCategory();
      }
    })();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [category]);
  console.log(mails)

  return (
    <div className="shadow-inner p-1 flex justify-end items-center gap-4">
      <div className="text-sm font-light">
        {page * mailsPerPage + 1} - {page * mailsPerPage + mailsPerPage}
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
