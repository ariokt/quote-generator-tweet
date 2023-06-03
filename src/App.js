import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./index.css";

export default function QuoteApp() {
  const [state, setState] = useState({
    displayed_quote:
      "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
    displayed_author: "- Angelita Lim",
    color: "#141414",
    opacity: 100,
  });

  const newQuote = async (event) => {
    event.preventDefault();
    const config = {
      headers: { "X-Api-Key": "zTC7RE9c2IQpCcNsMu+e+A==pzbNO39XMWZALsTw" },
    };
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    try {
      setState({ ...state, opacity: 0 });
      const data = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=love",
        config
      );

      setState({
        ...state,
        displayed_quote: data.data[0].quote,
        displayed_author: "- " + data.data[0].author,
        color: newColor,
        opacity: 100,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-100 h-screen flex flex-col justify-center duration-1000"
      style={{ backgroundColor: `${state.color}` }}
    >
      <div
        className="flex flex-col justify-between mx-auto bg-white w-11/12 lg:w-2/4 h-fit py-4 md:py-12 px-4 md:px-20"
        id="quote-box"
      >
        <h1
          className={
            "text-center mx-auto transition-opacity ease-in duration-1000 " +
            (state.displayed_quote.length > 200
              ? "text-2xl"
              : "text-3xl md:text-4xl lg:text-5xl")
          }
          style={{ color: `${state.color}`, opacity: `${state.opacity}` }}
          id="text"
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
          {" " + state.displayed_quote}
        </h1>
        <p
          className="self-end w-fit transition-opacity ease-in duration-1000 mt-5"
          style={{ color: `${state.color}`, opacity: `${state.opacity}` }}
          id="author"
        >
          {" " + state.displayed_author}
        </p>
        <div className="flex flex-col items-center gap-2 mt-5 md:mt-20">
          <button
            className="block mx-auto bg-white border p-2"
            style={{ borderColor: `${state.color}` }}
            onClick={() => newQuote(event)}
            id="new-quote"
          >
            New Quote
          </button>
          <div className="flex flex-row gap-2">
            <a
              href={
                "https://www.twitter.com/intent/tweet?text=" +
                state.displayed_quote +
                " " +
                state.displayed_author
              }
              target="_blank"
              id="tweet-quote"
            >
              <FontAwesomeIcon
                icon={faSquareTwitter}
                size={"2xl"}
                color="#1DA1F2"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/ario-waskita-318b3a151/?originalSubdomain=id"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size={"2xl"} color="#0077b5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
