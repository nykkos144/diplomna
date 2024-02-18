const getTimeElapsed = (date: Date): string => {

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()}`;
  } else if (months > 0) {
    return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  }

}

const padZero = (num: number): string => {

  return num < 10 ? `0${num}` : `${num}`;

}


export { getTimeElapsed };
