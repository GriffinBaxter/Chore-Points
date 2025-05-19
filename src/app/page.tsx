'use client';

const numberOfPeople = 4;

const calculateRewards = () => {
  const hardcodedPoints = [10, 20, 30, 40];
  const avgPoints = hardcodedPoints.reduce((a, b) => a + b, 0) / hardcodedPoints.length;
  const deviations = hardcodedPoints.map(points => points - avgPoints);
  const positiveDeviationsSum = deviations.filter(dev => dev > 0).reduce((a, b) => a + b, 0);
  const negativeDeviationsSum = deviations.filter(dev => dev < 0).reduce((a, b) => a + b, 0);
  const rewards = []
  for (const points of hardcodedPoints) {
    if (points > avgPoints) {
      rewards.push(((40 / (positiveDeviationsSum + 0.001)) * (points - avgPoints)).toFixed(2));
    } else if (points < avgPoints) {
      rewards.push((-(15 / (negativeDeviationsSum + 0.001)) * Math.abs(points - avgPoints)).toFixed(2));
    } else {
      rewards.push(0..toFixed(2));
    }
  }
  console.log(rewards);
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {[...Array(numberOfPeople).keys()].map(i => (
          <div className="flex" key={i}>
            <label className="w-24" htmlFor={`points-${i}`}>Points ({i + 1}):</label>
            <input className="w-12 border-solid border-2 border-black" id={`points-${i}`} type="number"/>
          </div>
        ))}
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={calculateRewards}>Calculate</button>
      </main>
    </div>
  );
}
