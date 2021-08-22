import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FlashcardList from "./Components/FlashCardList";

function App() {
  const [flashCard, setFlashCard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryEl = useRef();
  const queryRef = useRef();

  const fetchCategory = () => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  };
  const fetchQuestions = () => {
    setLoading(true);
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: queryRef.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashCard(
          res.data.results.map((questionItem, index) => {
            const answer = questionItem.correct_answer;
            const options = [...questionItem.incorrect_answers, answer];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
              answerPressed: false,
            };
          })
        );
      });
    setLoading(false);
  };

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  useEffect(() => {
    fetchCategory(); // eslint-disable-next-line
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    fetchQuestions();
  };
  useEffect(() => {
    fetchQuestions(); // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* Input form here */}
      <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 w-11/12 max-w-xl sm:mx-auto">
          <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
            <form className="w-full">
              <div className="mb-5 relative">
                <label className="text-2xl">Quiz App</label>
                <div className="relative flex justify-between self-center">
                  <svg
                    className="text-white bg-purple-700 absolute top-0 right-0 m-2 pointer-events-none p-2 rounded"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="40px"
                    height="40px"
                    viewBox="0 0 38 22"
                    version="1.1"
                  >
                    <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
                    <g
                      id="ZahnhelferDE—Design"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="ZahnhelferDE–Icon&amp;Asset-Download"
                        transform="translate(-539.000000, -199.000000)"
                        fill="#ffffff"
                        fillRule="nonzero"
                      >
                        <g
                          id="Icon-/-ArrowRight-Copy-2"
                          transform="translate(538.000000, 183.521208)"
                        >
                          <polygon
                            id="Path-Copy"
                            transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) "
                            points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <select
                    className="text-2xl font-bold rounded border-2 border-purple-700 text-gray-600 justify-center h-16 w-full pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    ref={categoryEl}
                  >
                    {categories.map(({ id, name }) => {
                      return (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-5 relative">
                <input
                  type="number"
                  id="queries"
                  min="1"
                  step="1"
                  className="peer pt-8 border-2 border-purple-700 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent"
                  defaultValue={10}
                  ref={queryRef}
                />
                <label
                  htmlFor="Query"
                  className="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                >
                  Number Of Questions
                </label>
              </div>
              <button
                onClick={onSubmit}
                className="w-full bg-indigo-600 text-white p-3 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FlashCard List Component Here */}

      {!loading ? (
        <FlashcardList flashcards={flashCard} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
