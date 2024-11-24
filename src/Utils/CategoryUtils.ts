import axios from "axios";
import { useCategoryStore } from "../Stores/categoryStore";
import { API_URL } from "../Constants/config";

const setCategories = useCategoryStore.getState().setCategories

export const getCategories = async () => {
  try {
    const res = await axios.get(API_URL + "/categories");
    setCategories(res.data);
  } catch (error) {
    console.log(error);
  }
};