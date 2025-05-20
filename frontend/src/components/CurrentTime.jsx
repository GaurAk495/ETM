import { useEffect, useState } from "react";

function CurrentTime() {
  const [time, setTime] = useState();

  function settingTime() {
    const time = new Date().toLocaleString("en-In", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    setTime(time);
  }

  useEffect(() => {
    const intervalId = setInterval(settingTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <>{time}</>;
}

export default CurrentTime;
