import { create } from "zustand";

export interface response {
  action: string;
  category: string;
  summary: string;
  suggestedReply: string;
}

export interface aiResp {
  mailId: string | null;
  categoryId: string | null;
  aiResponse: response | null;
}

export interface aiStore {
  aiResponses: aiResp[] | null;
  addResponse: (aiResp: aiResp) => void;
  updateAiResponse: (aiResp: aiResp) => void
}

export const useAiResponsesStore = create<aiStore>((set, get) => ({
  aiResponses: null,
  addResponse(aiResp) {
    const responses = get().aiResponses;
    if (responses) set({ aiResponses: [...responses, aiResp] });
    else set({ aiResponses: [aiResp] });
  },
  updateAiResponse(aiResp) {
      const aireps = get().aiResponses
      const filtered = aireps?.filter(i => i.mailId != aiResp.mailId)
      if(filtered){
        set({aiResponses: [...filtered, aiResp]})
      }
  },
}));
