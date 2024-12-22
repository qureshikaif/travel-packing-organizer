// Calculate time left
export const calculateTimeLeft = (reminderDate) => {
  const now = new Date();
  const reminder = new Date(reminderDate);

  const diffInMilliseconds = reminder - now;

  if (diffInMilliseconds <= 0) {
    return "Time passed";
  }

  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  return `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s) left`;
};
