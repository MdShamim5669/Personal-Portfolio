'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { cn } from '@/utils/cn';

const PASSWORD_CHAR =
  typeof navigator !== 'undefined' && navigator.userAgent.match(/firefox|fxios/i)
    ? '\u25CF'
    : '\u2022';

export const Input = forwardRef(
  ({ className, wrapperClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 transition-all',
          'focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-inner',
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          className={cn(
            'w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export const SmoothInput = forwardRef(
  (
    {
      className,
      wrapperClassName,
      caretClassName,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onSelect,
      onClick,
      type = 'text',
      placeholder,
      style,
      springConfig = { stiffness: 480, damping: 28, mass: 0.4 },
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const caretX = useMotionValue(0);
    const caretOpacity = useMotionValue(0);

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const measureRef = useRef(null);
    const isFocusedRef = useRef(false);
    const prefersReducedMotion = useReducedMotion();

    useImperativeHandle(ref, () => inputRef.current);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? String(value ?? '') : internalValue;

    const springCaretX = useSpring(
      caretX,
      prefersReducedMotion
        ? { stiffness: 10000, damping: 100, mass: 0.1 }
        : springConfig
    );

    const syncMeasureSpan = () => {
      const input = inputRef.current;
      const measureSpan = measureRef.current;
      if (!input || !measureSpan) return;

      const styles = window.getComputedStyle(input);
      const isPassword = type === 'password';

      let fontSize = styles.fontSize;
      if (
        PASSWORD_CHAR === '\u2022' &&
        isPassword &&
        typeof navigator !== 'undefined' &&
        !navigator.userAgent.match(/chrome|chromium|crios/i)
      ) {
        fontSize = `${parseFloat(fontSize) + 6.25}px`;
      }

      measureSpan.style.font = `${styles.fontStyle} ${styles.fontWeight} ${fontSize} ${styles.fontFamily}`;
      measureSpan.style.letterSpacing = styles.letterSpacing;
      measureSpan.style.fontFeatureSettings = styles.fontFeatureSettings;
      measureSpan.style.fontVariationSettings = styles.fontVariationSettings;
    };

    const measurePrefixWidth = (text) => {
      const input = inputRef.current;
      const measureSpan = measureRef.current;
      if (!input || !measureSpan) return null;

      syncMeasureSpan();
      measureSpan.textContent = text;

      const paddingLeft =
        parseFloat(window.getComputedStyle(input).paddingLeft) || 0;

      return text.length > 0
        ? measureSpan.offsetWidth + paddingLeft
        : paddingLeft;
    };

    const scrollCaretIntoView = (target, absoluteWidth) => {
      const styles = window.getComputedStyle(target);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const visibleRight = target.scrollLeft + target.clientWidth - paddingRight;
      const visibleLeft = target.scrollLeft + paddingLeft;

      if (absoluteWidth > visibleRight) {
        target.scrollLeft = Math.min(
          absoluteWidth - target.clientWidth + paddingRight,
          maxScroll
        );
        return;
      }

      if (absoluteWidth < visibleLeft) {
        target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
      }
    };

    const getCaretIndex = (target) => {
      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;

      if (selectionStart === selectionEnd) {
        return selectionStart;
      }

      return target.selectionDirection === 'backward'
        ? selectionStart
        : selectionEnd;
    };

    const updateCaretFromInput = (target) => {
      if (!target) return;

      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? 0;
      const hasSelection = selectionStart !== selectionEnd;
      const caretIndex = getCaretIndex(target);
      const isPassword = type === 'password';
      const textBeforeCaret = isPassword
        ? PASSWORD_CHAR.repeat(caretIndex)
        : (target.value || '').slice(0, caretIndex);

      const absoluteWidth = measurePrefixWidth(textBeforeCaret);
      if (absoluteWidth === null) return;

      scrollCaretIntoView(target, absoluteWidth);

      const styles = window.getComputedStyle(target);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const caretPosition = absoluteWidth - target.scrollLeft;
      const minX = paddingLeft;
      const maxX = Math.max(minX, target.clientWidth - paddingRight);
      const isCaretVisible = caretPosition >= minX && caretPosition <= maxX + 1;

      caretX.set(Math.min(Math.max(caretPosition, minX), maxX));

      if (!isCaretVisible || hasSelection || !isFocusedRef.current) {
        caretOpacity.set(0);
        return;
      }

      caretOpacity.set(1);
    };

    const updateCaretRef = useRef(updateCaretFromInput);
    updateCaretRef.current = updateCaretFromInput;

    useEffect(() => {
      const input = inputRef.current;
      if (input && document.activeElement === input) {
        updateCaretRef.current(input);
      }
    }, [inputValue, type]);

    useEffect(() => {
      const input = inputRef.current;
      const container = containerRef.current;
      if (!input || !container) return;

      const updateCaretIfFocused = () => {
        if (document.activeElement === input && isFocusedRef.current) {
          updateCaretRef.current(input);
        }
      };

      const handleSelectionChange = () => {
        if (document.activeElement !== input) return;

        requestAnimationFrame(() => {
          if (document.activeElement === input) {
            updateCaretRef.current(input);
          }
        });
      };

      document.addEventListener('selectionchange', handleSelectionChange);
      if (document.fonts) {
        document.fonts.addEventListener('loadingdone', updateCaretIfFocused);
        void document.fonts.ready.then(updateCaretIfFocused);
      }
      input.addEventListener('scroll', updateCaretIfFocused);

      const resizeObserver = new ResizeObserver(updateCaretIfFocused);
      resizeObserver.observe(container);

      return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
        if (document.fonts) {
          document.fonts.removeEventListener('loadingdone', updateCaretIfFocused);
        }
        input.removeEventListener('scroll', updateCaretIfFocused);
        resizeObserver.disconnect();
      };
    }, []);

    const handleFocus = (e) => {
      isFocusedRef.current = true;
      const target = e.target;
      requestAnimationFrame(() => {
        updateCaretRef.current(target);
      });
      onFocus?.(e);
    };

    const handleBlur = (e) => {
      isFocusedRef.current = false;
      caretOpacity.set(0);
      onBlur?.(e);
    };

    const handleChange = (e) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
      const target = e.target;
      requestAnimationFrame(() => {
        updateCaretRef.current(target);
      });
    };

    const handleKeyOrClick = (e, callback) => {
      callback?.(e);
      const target = e.currentTarget;
      requestAnimationFrame(() => {
        updateCaretRef.current(target);
      });
    };

    return (
      <div
        className={cn(
          'relative w-full rounded-2xl bg-slate-900/90 border border-slate-800 transition-all',
          'focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-inner',
          wrapperClassName
        )}
      >
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 items-center p-0 overflow-hidden"
          style={{ caretColor: 'transparent' }}
        >
          <input
            {...props}
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            className={cn(
              'col-start-1 col-end-2 row-start-1 row-end-2 w-full bg-transparent px-4 py-3 text-sm text-white placeholder-slate-500 outline-none',
              className
            )}
            style={{ caretColor: 'transparent', ...style }}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyOrClick(e, onKeyDown)}
            onKeyUp={(e) => handleKeyOrClick(e, onKeyUp)}
            onSelect={(e) => handleKeyOrClick(e, onSelect)}
            onClick={(e) => handleKeyOrClick(e, onClick)}
          />
          <span
            ref={measureRef}
            aria-hidden
            className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
          />
          <motion.div
            aria-hidden
            className={cn(
              'pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 h-[1.25em] w-[2px] self-center rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
              caretClassName
            )}
            style={{ x: springCaretX, opacity: caretOpacity }}
          />
        </div>
      </div>
    );
  }
);

SmoothInput.displayName = 'SmoothInput';

export const Skiper106 = ({
  title = 'Try typing below',
  inputProps,
  normalInputProps,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-muted text-foreground flex h-full w-full flex-col items-center justify-center',
        className
      )}
    >
      <div className="-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:bg-linear-to-b after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:from-transparent after:content-['']">
          {title}
        </span>
      </div>
      <div className="flex w-full flex-col items-center space-y-4">
        <SmoothInput aria-label="Smooth caret input" {...inputProps} />
        <Input
          placeholder="normal input"
          className="caret-primary text-2xl"
          wrapperClassName="max-w-[420px] p-4"
          aria-label="Normal input"
          {...normalInputProps}
        />
      </div>
    </div>
  );
};

export default SmoothInput;
