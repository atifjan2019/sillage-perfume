"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    name?: string;
    disabled?: boolean;
    className?: string;
}

export default function Select({
    value,
    onChange,
    options,
    placeholder = "Select…",
    required,
    name,
    disabled,
    className = "",
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [highlight, setHighlight] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, [open]);

    useEffect(() => {
        if (open) {
            const idx = options.findIndex((o) => o.value === value);
            setHighlight(idx >= 0 ? idx : 0);
        }
    }, [open, value, options]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) {
                setOpen(true);
                return;
            }
            setHighlight((h) => Math.min(h + 1, options.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) {
                setOpen(true);
                return;
            }
            setHighlight((h) => Math.max(h - 1, 0));
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) {
                setOpen(true);
            } else {
                const opt = options[highlight];
                if (opt && !opt.disabled) {
                    onChange(opt.value);
                    setOpen(false);
                    buttonRef.current?.focus();
                }
            }
        }
    };

    const borderColor = focused || open ? "var(--gold)" : "rgba(255,255,255,0.08)";
    const ringShadow = focused || open
        ? "0 0 0 3px rgba(201,169,110,0.1), inset 0 1px 2px rgba(0,0,0,0.3)"
        : "inset 0 1px 2px rgba(0,0,0,0.3)";

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            {required && (
                <input
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    required
                    name={name}
                    value={value}
                    onChange={() => { /* controlled by Select */ }}
                    className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                />
            )}
            <button
                ref={buttonRef}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => !disabled && setOpen((o) => !o)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKey}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none flex items-center justify-between transition-all duration-200 disabled:opacity-50"
                style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: selected ? "var(--cream)" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${borderColor}`,
                    boxShadow: ringShadow,
                    textAlign: "left",
                }}
            >
                <span className="truncate">{selected?.label ?? placeholder}</span>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        color: "var(--gold)",
                        transform: open ? "rotate(180deg)" : "none",
                        transition: "transform 200ms",
                        flexShrink: 0,
                        marginLeft: "0.5rem",
                    }}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {open && (
                <div
                    role="listbox"
                    className="absolute left-0 right-0 mt-2 rounded-lg overflow-hidden z-50 max-h-72 overflow-y-auto"
                    style={{
                        backgroundColor: "var(--charcoal)",
                        border: "1px solid rgba(201,169,110,0.2)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {options.length === 0 ? (
                        <div className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            No options
                        </div>
                    ) : (
                        options.map((opt, idx) => {
                            const isSelected = opt.value === value;
                            const isHighlighted = idx === highlight;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    disabled={opt.disabled}
                                    onMouseEnter={() => setHighlight(idx)}
                                    onClick={() => {
                                        if (opt.disabled) return;
                                        onChange(opt.value);
                                        setOpen(false);
                                        buttonRef.current?.focus();
                                    }}
                                    className="w-full px-4 py-3 text-sm text-left flex items-center justify-between transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: isHighlighted
                                            ? "rgba(201,169,110,0.1)"
                                            : "transparent",
                                        color: isSelected ? "var(--gold)" : "rgba(255,255,255,0.7)",
                                        borderLeft: isSelected
                                            ? "2px solid var(--gold)"
                                            : "2px solid transparent",
                                    }}
                                >
                                    <span className="truncate">{opt.label}</span>
                                    {isSelected && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold)", flexShrink: 0 }}>
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
