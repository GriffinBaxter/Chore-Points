"use client";

import { ChangeEvent, useState } from "react";

const NUMBER_OF_PEOPLE_DEFAULT = 4;
const NUMBER_OF_PEOPLE_MIN = 1;
const NUMBER_OF_PEOPLE_MAX = 20;
const POINTS_DEFAULT = 0;
const EPSILON = 0.001;

const getPointsId = (personIndex: number) => {
  return `points-${personIndex.toString()}`;
};

const calculateRewards = (numberOfPeople: number) => {
  const pointsArray = [...Array(numberOfPeople).keys()].map((personIndex) => {
    const points = document.getElementById(
      getPointsId(personIndex),
    ) as HTMLInputElement;
    return points.value ? Number(points.value) : POINTS_DEFAULT;
  });
  const avgPoints = pointsArray.reduce((a, b) => a + b, 0) / pointsArray.length;
  const deviations = pointsArray.map((points) => points - avgPoints);
  const positiveDeviationsSum = deviations
    .filter((dev) => dev > 0)
    .reduce((a, b) => a + b, 0);
  const negativeDeviationsSumAbs = Math.abs(
    deviations.filter((dev) => dev < 0).reduce((a, b) => a + b, 0),
  );
  const rewards = [];
  for (const points of pointsArray) {
    if (points > avgPoints) {
      rewards.push(
        (
          (40 / (positiveDeviationsSum + EPSILON)) *
          (points - avgPoints)
        ).toFixed(2),
      );
    } else if (points < avgPoints) {
      rewards.push(
        (
          -(15 / (negativeDeviationsSumAbs + EPSILON)) *
          Math.abs(points - avgPoints)
        ).toFixed(2),
      );
    } else {
      rewards.push(POINTS_DEFAULT.toFixed(2));
    }
  }
  alert(
    `Rewards:\n\n${rewards
      .map((reward, personIndex) => {
        const isNegative = reward.startsWith("-");
        return `Person ${(personIndex + 1).toString()}: ${isNegative ? "-" : ""}$${reward.slice(isNegative ? 1 : 0)}`;
      })
      .join("\n")}`,
  );
};

export default function Home() {
  const [numberOfPeople, setNumberOfPeople] = useState(
    NUMBER_OF_PEOPLE_DEFAULT,
  );

  const handleNumberOfPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const value = Number(e.target.value);
      if (value >= NUMBER_OF_PEOPLE_MIN && value <= NUMBER_OF_PEOPLE_MAX) {
        setNumberOfPeople(value);
      } else if (value < NUMBER_OF_PEOPLE_MIN) {
        setNumberOfPeople(NUMBER_OF_PEOPLE_MIN);
      } else if (value > NUMBER_OF_PEOPLE_MAX) {
        setNumberOfPeople(NUMBER_OF_PEOPLE_MAX);
      }
    }
  };

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => {
            calculateRewards(numberOfPeople);
          }}
        >
          Calculate Points
        </button>
        <div className="flex">
          <label className="w-40" htmlFor={"numberOfPeople"}>
            Number of People:
          </label>
          <input
            className="w-12 border-2 border-solid border-black text-center"
            id={"numberOfPeople"}
            type="number"
            defaultValue={NUMBER_OF_PEOPLE_DEFAULT}
            min={NUMBER_OF_PEOPLE_MIN}
            max={NUMBER_OF_PEOPLE_MAX}
            onChange={(e) => {
              handleNumberOfPeopleChange(e);
            }}
          />
        </div>
        {[...Array(numberOfPeople).keys()].map((personIndex) => (
          <div className="flex" key={personIndex}>
            <label className="w-40" htmlFor={getPointsId(personIndex)}>
              Points (Person {personIndex + 1}):
            </label>
            <input
              className="w-12 border-2 border-solid border-black text-center"
              id={getPointsId(personIndex)}
              type="number"
              defaultValue={POINTS_DEFAULT}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
