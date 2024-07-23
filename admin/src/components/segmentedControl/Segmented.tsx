import {useState, useEffect, MutableRefObject } from "react";
import "../../css/segmented.css";

interface Segment {
  value: string;
  label: string;
  ref: MutableRefObject<HTMLDivElement | null>;
}

interface SegmentedControlProps {
  name: string;
  segments: Segment[];
  callback: (value: string, index: number) => void;
  defaultIndex?: number;
  controlRef: MutableRefObject<HTMLDivElement | null>;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  name,
  segments,
  callback,
  defaultIndex = 0,
  controlRef,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    const updateSegmentStyle = () => {
      const activeSegmentRef = segments[activeIndex].ref.current;
      if (activeSegmentRef && controlRef.current) {
        const { offsetWidth, offsetLeft } = activeSegmentRef;
        const { style } = controlRef.current;

        style.setProperty("--highlight-width", `${offsetWidth}px`);
        style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
      }
    };

    updateSegmentStyle();
    window.addEventListener("resize", updateSegmentStyle);

    return () => {
      window.removeEventListener("resize", updateSegmentStyle);
    };
  }, [activeIndex, controlRef, segments]);

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index);
    callback(value, index);
  };

  return (
    <div className="controls-container" ref={controlRef}>
      <div className={`controls ready`}>
        {segments?.map((item, i) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? "active" : "inactive"}`}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
