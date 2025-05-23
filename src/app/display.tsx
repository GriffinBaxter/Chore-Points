import { Reward } from "./page";

export default function Display({
  rewards,
  setRewards,
}: {
  rewards: Reward[];
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>;
}) {
  return (
    <>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        onClick={() => {
          setRewards([]);
        }}
      >
        Go Back
      </button>
      {rewards.map((reward, personIndex) => {
        const isNegative = reward.value.startsWith("-");
        return (
          <p key={personIndex}>
            {reward.name}: {isNegative ? "-" : ""}$
            {reward.value.slice(isNegative ? 1 : 0)}
          </p>
        );
      })}
    </>
  );
}
