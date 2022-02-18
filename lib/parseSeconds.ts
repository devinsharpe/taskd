const parseSeconds = (seconds: number) => {
  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor(seconds % 60),
  };
};

const formatSeconds = (duration: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return `${duration.hours.toString()}:${duration.minutes
    .toString()
    .padStart(2, "0")}:${duration.seconds.toString().padStart(2, "0")}`;
};

export default parseSeconds;

export { formatSeconds };
