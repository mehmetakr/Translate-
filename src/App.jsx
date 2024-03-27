import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translatetext } from "./redux/actions/translateActions";
//import store from "./redux/store";
import Select from "react-select";
import { useState } from "react";
import { setansver } from "./redux/slices/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice);

  const [text, settext] = useState("");
  const [sourcelang, setsourcelang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetlang, settargetlang] = useState({
    value: "en",
    label: "English",
  });
  // apiden dil verileri al ve store'a aktar.

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // burada apiden dönen her i verisi için boş bir dizi oluşturduk..
  // diziyi bizden istenen formata çevirdik.
  // objelerin  {code,name} keylerini {value,label}
  // Burdaki map  top-level tekrardan yapılıyordu .Gereksiz hesaplamalar projeni hızını yavaşlatabiliceğinden useMemo kullanıp bu sorunun önüne geçtik.
  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),

    [languageSlice.languages]
  );

  const handleswap = () => {
    // selecleri değiş
    settargetlang(sourcelang);
    setsourcelang(targetlang);

    // cevap textaresında veriyi diğer textaresına aktar
    settext(translateSlice.answer);
    dispatch(setansver(text));

    //  soru textaresındakı veriyi cevap textareasına aktar.
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri +</h1>

        {/*  Üst kısım  */}
        <div className="upper">
          <Select
            value={sourcelang}
            onChange={setsourcelang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />

          <button onClick={handleswap}>Değiş</button>
          <Select
            value={targetlang}
            onChange={(e) => settargetlang(e)}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>

        {/*  Orta kısım */}

        <div className="middle">
          <textarea value={text} onChange={(e) => settext(e.target.value)} />
        </div>
        <div className="middle">
          <textarea disabled value={translateSlice.answer} />
          {translateSlice.isLoading && (
            <div className="typewriter">
              <div className="slide">
                <i></i>
              </div>
              <div className="paper"></div>
              <div className="keyboard"></div>
            </div>
          )}
        </div>

        {/* alt kısım  */}
        <div className="çevirbutonu">
          <button
            onClick={() =>
              dispatch(translatetext({ text, sourcelang, targetlang }))
            }
            className="btn"
          >
            Çevir
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
