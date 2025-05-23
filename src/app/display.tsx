export default function Display({
  rewards,
  setRewards,
}: {
  rewards: string[];
  setRewards: React.Dispatch<React.SetStateAction<string[]>>;
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
        const isNegative = reward.startsWith("-");
        return (
          <p key={personIndex}>
            Person {personIndex + 1}: {isNegative ? "-" : ""}$
            {reward.slice(isNegative ? 1 : 0)}
          </p>
        );
      })}
    </>
  );
}
