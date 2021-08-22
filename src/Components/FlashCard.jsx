import { useState } from "react";

const FlashCard = ({ flashcard }) => {
  const [answerPressed, setAnswerPressed] = useState(false);
  const onClickHandle = () => {
    setAnswerPressed(!answerPressed);
  };
  return (
    <>
      <main className="w-full flex justify-center pt-5">
        <div className="flex flex-col md:w-2/5 p-3 space-y-5 rounded-xl border border-black bg-white shadow-md">
          <section className="text-sm font-thin text-orange-400">
            {/* September 20, 10:30 AM */}
          </section>
          <section className="text-3xl font-bold">{flashcard.question}</section>
          {flashcard.options.map((option) => {
            return (
              <div key={option}>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-grey-dark">&bull;</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="hover:text-blue-dark">{option}</p>
                  </div>
                  {option === flashcard.answer && answerPressed && (
                    <div className="w-8 h-10 text-center py-1">
                      <img
                        alt="tick"
                        src="https://img.icons8.com/color/48/000000/checked-2.png"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <section className="flex justify-end">
            <button
              onClick={onClickHandle}
              type="button"
              className="bg-yellow-600 text-white px-3 py-1 rounded-md"
            >
              Answer
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

export default FlashCard;
