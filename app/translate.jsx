"use client"
import { useState, useEffect } from "react";
import countries from "./data"

const Translate = () => {

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("");
  const [translateTo, setTranslateTo] = useState("");


  // dilden veya dile değisim
  const translate = async () => {
   
    if (!fromText.trim() || !translateFrom || !translateTo) return;

    try {
      
      const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

     
      setToText(data.matches[0]?.translation || data.responseData.translatedText);
    } catch (error) {
     
      console.error("Translation error:", error);
    }
  };

  //dil değistir
  const exchangeLanguages = () => {
   
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);

   // metni degis
    setFromText(toText);

    // Güncelle
    translate();
  };

  //değistiginnde yakala
  useEffect(() => {
    translate();
  }, [fromText, translateFrom, translateTo]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="controls">
          <div className="row from">
            <select
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
          <div className="exchange" onClick={exchangeLanguages}>
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="row to">
           {/* 'to' seçimi için dil seçenekleri */}
            <select
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
        </div>

       {/* Giriş */}
        <textarea
          spellCheck="false"
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
          placeholder="Enter text"
        ></textarea>

        {/* Çeviri sonucu  */}
        <textarea
          spellCheck="false"
          readOnly
          disabled
          value={toText}
          placeholder="Translation"
        ></textarea>
      </div>
    </div>
  );
};

export default Translate;