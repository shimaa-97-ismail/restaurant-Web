import {useContext} from "react";
import {LangContext} from "../context/Language/LanguageContext"

export const useTranslation = () => {
  return useContext(LangContext);
};