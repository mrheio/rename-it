const MS_IN_S = 1000;
const S_IN_MIN = 60;
const MIN_IN_H = 60;
const H_IN_DAY = 24;
const DAYS_IN_MONTH = 30;
const MONTHS_IN_YEAR = 12;

const S_IN_H = S_IN_MIN * MIN_IN_H;
const S_IN_DAY = S_IN_H * H_IN_DAY;
const S_IN_MONTH = S_IN_DAY * DAYS_IN_MONTH;
const S_IN_YEAR = S_IN_MONTH * MONTHS_IN_YEAR;

export const getElapsedTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);

    const elapsedMs = now.getTime() - then.getTime();
    const elapsedS = elapsedMs / MS_IN_S;

    const seconds = Math.floor(elapsedS % S_IN_MIN);
    const minutes = Math.floor((elapsedS / S_IN_MIN) % MIN_IN_H);
    const hours = Math.floor((elapsedS / S_IN_H) % H_IN_DAY);
    const days = Math.floor((elapsedS / S_IN_DAY) % DAYS_IN_MONTH);
    const months = Math.floor((elapsedS / S_IN_MONTH) % MONTHS_IN_YEAR);

    return { months, days, hours, minutes, seconds };
};

export const formatElapsedTime = ({
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
} = {}) => {
    if (months) {
        return `${months} months ago`;
    }
    if (days) {
        return `${days} days ago`;
    }
    if (hours) {
        return `${hours} hours ago`;
    }
    if (minutes) {
        return `${minutes} minutes ago`;
    }
    if (seconds) {
        return `${seconds} seconds ago`;
    }

    throw Error('No time provided');
};
