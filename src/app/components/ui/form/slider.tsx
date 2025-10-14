"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SliderProps = {
  label?: string;
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
  suffix?: string;
  prefix?: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
};

export function Slider({
  label,
  min,
  max,
  step = 1,
  initialValue,
  suffix,
  prefix,
  onChange,
  disabled = false,
  id,
  className = "",
}: SliderProps) {
  const startValue = useMemo(() => {
    const base = initialValue ?? min;
    const clamped = Math.min(Math.max(base, min), max);
    return roundToStep(clamped, min, step);
  }, [initialValue, min, max, step]);

  const [value, setValue] = useState<number>(startValue);
  const [dragging, setDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(startValue);
  }, [startValue]);

  const percent = useMemo(() => {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const emitChange = useCallback(
    (v: number) => {
      onChange?.(v);
    },
    [onChange]
  );

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const ratio = clamp(x / rect.width, 0, 1);
      const raw = min + ratio * (max - min);
      const stepped = roundToStep(raw, min, step);
      const clamped = clamp(stepped, min, max);
      setValue(clamped);
      emitChange(clamped);
    },
    [min, max, step, emitChange]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setDragging(true);
      updateFromClientX(e.clientX);
    },
    [disabled, updateFromClientX]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging || disabled) return;
      updateFromClientX(e.clientX);
    },
    [dragging, disabled, updateFromClientX]
  );

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: PointerEvent) => onPointerMove(e);
    const handleUp = () => onPointerUp();

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragging, onPointerMove, onPointerUp]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      let delta = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
      if (e.key === "Home") {
        setValue(min);
        emitChange(min);
        e.preventDefault();
        return;
      }
      if (e.key === "End") {
        setValue(max);
        emitChange(max);
        e.preventDefault();
        return;
      }
      if (delta !== 0) {
        const next = clamp(roundToStep(value + delta, min, step), min, max);
        setValue(next);
        emitChange(next);
        e.preventDefault();
      }
    },
    [disabled, step, value, min, max, emitChange]
  );

  const valueLabel = `${prefix ?? ""}${formatNumber(value)}${suffix ?? ""}`;

  return (
    <div
      className={`w-full select-none ${
        disabled ? "opacity-60" : ""
      } ${className}`}
    >
      {label && (
        <div className="mb-2">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-800"
          >
            {label}
          </label>
        </div>
      )}

      <div className="relative">
        <div
          ref={trackRef}
          className="relative h-2 w-full rounded-full bg-gray-200"
          onPointerDown={onPointerDown}
          role="presentation"
        >
          <div
            className="absolute left-0 top-0 h-2 rounded-full bg-primary"
            style={{ width: `${percent}%` }}
          />

          <div
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={onKeyDown}
            className={[
              "absolute top-1/2 -translate-y-1/2",
              "h-5 w-5 rounded-full border border-gray-300 bg-white",
              "shadow-sm",
              disabled
                ? "cursor-not-allowed"
                : "cursor-grab active:cursor-grabbing",
              "outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              "transition-shadow",
            ].join(" ")}
            style={{ left: `calc(${percent}% - 10px)` }}
            onPointerDown={onPointerDown}
          />

          <div
            className="absolute -top-7 text-xs font-medium text-gray-900 whitespace-nowrap"
            style={{
              left: `${percent}%`,
              transform: "translateX(-50%)",
            }}
          >
            {valueLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function roundToStep(n: number, min: number, step: number) {
  const k = Math.round((n - min) / step);
  return min + k * step;
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
