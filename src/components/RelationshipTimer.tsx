import { useEffect, useState } from "react";
import { intervalToDuration, Duration } from "date-fns";
import { useTranslation } from "react-i18next";

interface RelationshipTimerProps {
  startDate: string;
}

export const RelationshipTimer = ({ startDate }: RelationshipTimerProps) => {
  const { t } = useTranslation();
  const [time, setTime] = useState<Duration>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = intervalToDuration({
        start: new Date(startDate),
        end: new Date(),
      });
      setTime(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="font-mono text-4xl flex gap-3 text-purple-300">
        <span className="bg-purple-900/30 px-3 py-1 rounded-lg">
          {String(time.years || 0).padStart(2, "0")}
        </span>
        <span className="text-purple-400/50 self-center">:</span>
        <span className="bg-purple-900/30 px-3 py-1 rounded-lg">
          {String(time.months || 0).padStart(2, "0")}
        </span>
        <span className="text-purple-400/50 self-center">:</span>
        <span className="bg-purple-900/30 px-3 py-1 rounded-lg">
          {String(time.days || 0).padStart(2, "0")}
        </span>
      </div>
      <div className="flex gap-4 text-lg text-purple-400/80">
        <span>{t("common.years")}</span>
        <span>{t("common.months")}</span>
        <span>{t("common.days")}</span>
      </div>
      <div className="font-mono text-2xl flex gap-2 mt-4 text-pink-300">
        <span>{String(time.hours || 0).padStart(2, "0")}</span>
        <span className="text-purple-400/50">:</span>
        <span>{String(time.minutes || 0).padStart(2, "0")}</span>
        <span className="text-purple-400/50">:</span>
        <span>{String(time.seconds || 0).padStart(2, "0")}</span>
      </div>
    </div>
  );
};