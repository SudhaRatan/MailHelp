import { create } from "zustand";

export interface mail {
  id: string;
  threadId?: string;
  historyId?: string;
  fromName?: string;
  fromAddress?: string;
  to?: string;
  receivedDateTime?: string;
  subject?: string;
  mailBodyText?: string;
  mailBodyHtml?: string;
  mailText?: string;
  repliedText?: string;
  resolved?: number
}

export interface mailStore {
  mails: mail[] | null;
  addMail: (val: mail) => void;
  setMails: (mails: mail[] | null) => void;
  nextPageToken: string | null;
  setNextPageToken: (val: string | null) => void;
  selectedMail: mail | null;
  setSelectedMail: (mail: mail | null) => void;
  page: number;
  setPage: (n: number) => void;
  mailsPerPage: number;
  setMailsPerPage: (n: number) => void;
  updateMail: (mail: mail) => void;
  deleteMail: (mailId: string) => void;
  addNewMails: (mails: mail[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateReply: (reply: any) => void;
}

export const useMailStore = create<mailStore>()((set, get) => ({
  mails: null,
  addMail: (val: mail) => {
    const prevMails = get().mails;
    if (prevMails != null) set({ mails: [val, ...prevMails] });
    else set({ mails: [val] });
  },
  nextPageToken: null,
  setNextPageToken: (val) => set({ nextPageToken: val }),
  setMails: (mails: mail[] | null) => set({ mails: mails }),
  selectedMail: null,
  setSelectedMail(mail) {
    set({ selectedMail: mail });
  },
  page: 0,
  setPage: (n) => set({ page: n }),
  mailsPerPage: 10,
  setMailsPerPage(n) {
    set({ mailsPerPage: n });
  },
  updateMail: (mail) => {
    const mails = get().mails;
    set({
      mails: mails?.map((i) => {
        if (i.id === mail.id) return mail;
        else return i;
      }),
    });
  },
  deleteMail(mailId) {
      const mails = get().mails
      set({mails: mails?.filter(mail => mail.id != mailId)})
  },
  addNewMails(mails) {
    const oldMails = get().mails;
    if (oldMails)
      set({
        mails: [...mails, ...oldMails.slice(0, oldMails.length - mails.length)],
      });
    else set({ mails: mails });
  },
  updateReply(reply) {
    const mail = get().selectedMail;
    set({ selectedMail: { ...mail, repliedText: reply.sentReply, resolved: reply.resolved } as mail });
  },
}));
