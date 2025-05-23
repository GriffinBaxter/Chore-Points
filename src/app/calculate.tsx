"use client";

import {
  ChangeEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";

const NUMBER_OF_PEOPLE_DEFAULT = 4;
const NUMBER_OF_PEOPLE_MIN = 1;
const NUMBER_OF_PEOPLE_MAX = 20;
const POINTS_DEFAULT = 0;
const EPSILON = 0.001;
const COOKIE_POINTS = "points";

const getPointsId = (personIndex: number) => {
  return `points-${personIndex.toString()}`;
};

export default function Calculate({
  setRewards,
}: {
  setRewards: Dispatch<SetStateAction<string[]>>;
}) {
  const [cookies, setCookie, removeCookie] = useCookies<
    typeof COOKIE_POINTS,
    { points?: number[] }
  >([COOKIE_POINTS]);

  const [numberOfPeople, setNumberOfPeople] = useState(
    NUMBER_OF_PEOPLE_DEFAULT,
  );

  useEffect(() => {
    if (cookies.points) {
      setNumberOfPeople(cookies.points.length);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handlePointsChange();
  }, [numberOfPeople]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNumberOfPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const value = Number(e.target.value);
      if (value >= NUMBER_OF_PEOPLE_MIN && value <= NUMBER_OF_PEOPLE_MAX) {
        setNumberOfPeople(value);
      }
    }
  };

  const handlePointsChange = () => {
    setCookie(
      COOKIE_POINTS,
      [...Array(numberOfPeople).keys()].map((personIndex) => {
        const points = document.getElementById(
          getPointsId(personIndex),
        ) as HTMLInputElement;
        return points.value ? Number(points.value) : POINTS_DEFAULT;
      }),
    );
  };

  const calculateRewards = () => {
    const pointsArray =
      cookies.points ??
      (Array(NUMBER_OF_PEOPLE_DEFAULT).fill(POINTS_DEFAULT) as number[]);
    const avgPoints =
      pointsArray.reduce((a, b) => a + b, 0) / pointsArray.length;
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
    setRewards(rewards);
  };

  const reset = () => {
    setNumberOfPeople(NUMBER_OF_PEOPLE_DEFAULT);
    removeCookie(COOKIE_POINTS);
  };

  return (
    <>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={calculateRewards}
      >
        Calculate Points
      </button>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        onClick={reset}
      >
        Reset
      </button>
      <div className="flex">
        <label className="w-40" htmlFor={"numberOfPeople"}>
          Number of People:
        </label>
        <input
          className="w-12 border-2 border-solid border-black text-center"
          id={"numberOfPeople"}
          type="number"
          defaultValue={numberOfPeople}
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
            defaultValue={cookies.points?.[personIndex] ?? POINTS_DEFAULT}
            onChange={handlePointsChange}
          />
        </div>
      ))}
    </>
  );
}
