import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constant";

//Thunk aksiyonu yazalım...


export const getLanguages = createAsyncThunk(
  "translate/getlanguages",
  async () => {
    //apiden dil verileri al

    const res = await axios.request(options);

    // aksiyonun payload'ı olacak veriyi return etme

    return res.data.data.languages;
  }
);

// Çeviri işlemini yapıp sonucunu store a aktaran bir işlem yapıcaz..

export const translatetext = createAsyncThunk(
  "translate/text",
  async  ({ text, sourcelang, targetlang }) => {
    // İstek için gerekli ayarlar..
    const params = new URLSearchParams();
    params.set("source_language", sourcelang.value);
    params.set("target_language", targetlang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '00c01c81c8msh99707fadaabd207p15a588jsna8338100acdd',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: params,
    };

    // Yukaridaki ayarlara göre api isteği atar.
    const res = await axios.request(options);

    // aksiyonun  payloadını belirleme
    return res.data.data.translatetext;
  }
);
