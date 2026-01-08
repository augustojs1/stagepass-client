"use client";

import React from "react";

import { Input } from "./input";

type MoneyInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "onChange"
> & {
  value?: number;
  onChange?: (valueInCents: number) => void;
  locale?: string;
  currency?: string;
};

export function MoneyInput({
  value,
  onChange,
  locale = "en-US",
  currency = "USD",
  ...props
}: MoneyInputProps) {
  const formatCurrencyFromCents = (
    cents: number | null | undefined,
    locale = "en-US",
    currency = "USD"
  ): string => {
    const value = typeof cents === "number" ? cents : 0;

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value / 100);
  };

  const parseToCents = (value: string): number => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return 0;

    return Number(digits);
  };

  const displayedValue = formatCurrencyFromCents(value ?? 0, locale, currency);

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      value={displayedValue}
      onChange={(e) => {
        const cents = parseToCents(e.target.value);

        onChange?.(cents);
      }}
    />
  );
}
