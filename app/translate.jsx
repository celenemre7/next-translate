"use client"
import { useState, useEffect } from "react";
import countries from "./data";
import styles from "./translate.module.css";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("");
  const [translateTo, setTranslateTo] = useState("");

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

  const exchangeLanguages = () => {
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);
    setFromText(toText);
    translate();
  };

  useEffect(() => {
    translate();
  }, [fromText, translateFrom, translateTo]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <div className={styles.row}>
            <select
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.exchange} onClick={exchangeLanguages}>
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className={styles.row}>
            <select
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
              className={styles.select}
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

        <textarea
          className={styles.textarea}
          spellCheck="false"
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
          placeholder="Enter text"
        ></textarea>

        <textarea
          className={styles.textarea}
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