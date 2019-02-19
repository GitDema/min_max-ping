import React from "react";

const Result = ({ mean, mode, median, standardDeviation }) => {
  return (
    <div>
      <h1>Result: </h1>
      <ul>
        <li>Среднее значение: {mean}</li>
        <li>Стандартное отклонение: {standardDeviation}</li>
        <li>
          Мода:
          {mode.length > 1 ? (
            <ul>
              {mode.map((i, key) => {
                return <li key={key}>{i}</li>;
              })}
            </ul>
          ) : (
            mode[0]
          )}
        </li>
        <li>Медиана: {median}</li>
      </ul>
    </div>
  );
};

export default Result;
