import React from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Countdown({ item, isLoading }) {
  // Timer
  let startTime = Date.now();
  let countdown = item.expiryDate - startTime;

  const [clas, setClas] = useState(true);

  const [secondsText, setSecondsText] = useState(countdown);
  const [minutesText, setMinutesText] = useState(countdown);
  const [hoursText, setHoursText] = useState(countdown);

  function updateTime() {
    let startTime = Date.now();
    let countdown = item.expiryDate - startTime;

    if (item.expiryDate === null) {
      setClas(false);
    }

    let secondsLeft = countdown / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 24;

    let secondsText = Math.floor(secondsLeft) % 60;
    let minutesText = Math.floor(minutesLeft) % 60;
    let hoursText = Math.floor(hoursLeft);

    if (secondsText.toString().length < 2) {
      secondsText = secondsText.toString().padStart(2, "0");
    }
    if (minutesText.toString().length < 2) {
      minutesText = minutesText.toString().padStart(2, "0");
    }
    if (hoursText.toString().length < 1) {
      hoursText = hoursText.toString().padStart(1, "0");
    }

    setSecondsText(secondsText);
    setMinutesText(minutesText);
    setHoursText(hoursText);
  }
  setInterval(updateTime, 1000);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {clas ? (
            <div className="de_countdown">
              {hoursText}h <span> </span>
              {minutesText}m<span> </span>
              {secondsText}s <span> </span>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}