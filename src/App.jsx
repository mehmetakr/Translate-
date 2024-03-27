import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translatetext } from "./redux/actions/translateActions";
//import store from "./redux/store";
import Select from "react-select";
import { useState } from "react";

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
  
  console.log(data);
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
          />

          <button>Değiş</button>
          <Select
            value={targetlang}
            onChange={(e) => settargetlang(e)}
            className="select"
            options={data}
          />
        </div>

        {/*  Orta kısım */}

        <div className="middle">
          <textarea onChange={(e) => settext(e.target.value)} />
        </div>
        <div className="middle">
          <textarea disabled value={translateSlice.answer} />
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
