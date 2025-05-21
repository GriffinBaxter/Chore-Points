"use client";

const numberOfPeople = 4;

const calculateRewards = () => {
  const pointsArray = [...Array(numberOfPeople).keys()].map((i) => {
    const points = document.getElementById(
      `points-${i.toString()}`,
    ) as HTMLInputElement;
    return points.value ? Number(points.value) : 0;
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
        ((40 / (positiveDeviationsSum + 0.001)) * (points - avgPoints)).toFixed(
          2,
        ),
      );
    } else if (points < avgPoints) {
      rewards.push(
        (
          -(15 / (negativeDeviationsSumAbs + 0.001)) *
          Math.abs(points - avgPoints)
        ).toFixed(2),
      );
    } else {
      rewards.push((0).toFixed(2));
    }
  }
  console.log(rewards);
};

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        {[...Array(numberOfPeople).keys()].map((i) => (
          <div className="flex" key={i}>
            <label className="w-24" htmlFor={`points-${i.toString()}`}>
              Points ({i + 1}):
            </label>
            <input
              className="w-12 border-2 border-solid border-black"
              id={`points-${i.toString()}`}
              type="number"
            />
          </div>
        ))}
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={calculateRewards}
        >
          Calculate
        </button>
      </main>
    </div>
  );
}
