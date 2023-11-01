"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion, LayoutGroup } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const id = React.useId();

  React.useEffect(() => {
    if (!playing) return;
    const intervalId = window.setInterval(() => {
      setTimeElapsed((currentValue) => currentValue + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [playing]);

  function handlePlayPause() {
    if (playing) {
      setPlaying((prev) => !prev);
    } else {
      setPlaying((prev) => !prev);
      setTimeElapsed(timeElapsed + 1);
    }
  }

  function handleReset() {
    setTimeElapsed(0);
    setPlaying(false);
  }

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layout={true}
                    transition={{
                      type: "tween",
                    }}
                    layoutId={`${id}-selected-color`}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={handlePlayPause}>
              {playing ? <Pause /> : <Play />}
              <VisuallyHidden>{playing ? "Pause" : "Play"}</VisuallyHidden>
            </button>
            <button onClick={handleReset}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

export default CircularColorsDemo;
