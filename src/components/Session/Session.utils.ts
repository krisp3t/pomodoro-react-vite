export const formatTime = (input : number) => input.toString().padStart(2, '0');
export const formatHours = (input: Date) => input.getHours().toString().padStart(2, '0');
export const formatMinutes = (input: Date) => input.getMinutes().toString().padStart(2, '0');
export const calculateMinSec = (t: number) => {
  let timestamp = t;
  if (t < 0) {
    timestamp = 0;
  }
  const minutes = Math.floor(timestamp / 60);
  const seconds = timestamp % 60;
  return `${formatTime(minutes)}:${formatTime(seconds)}`;
};
export const timestampToOutput = (timestamp: number) => calculateMinSec(
  Math.round(timestamp / 1000),
);

export default function interval(timestamp: number) {
  return (timestampToOutput(timestamp));
}
