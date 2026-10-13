import { useState, useEffect } from "react";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const idWaktu = setInterval(() => {
      setDetik((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(idWaktu);
    };
  }, []);

  const menit = String(Math.floor(detik / 60)).padStart(2, "0");
  const sisaDetik = String(detik % 60).padStart(2, "0");

  return (
    <p>
      Lama sesi: {menit}:{sisaDetik}
    </p>
  );
}