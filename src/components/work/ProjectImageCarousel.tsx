"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent, type TransitionEvent } from "react";
import Image from "next/image";
import styles from "./ProjectImageCarousel.module.css";

export const PROJECT_IMAGE_DISPLAY_DURATION_MS = 2_000;
export const PROJECT_IMAGE_TRANSITION_DURATION_MS = 380;

export type ProjectCardImage = {
  src: string;
  alt: string;
};

type Direction = "next" | "previous";
type SlideTransition = {
  index: number;
  direction: Direction;
  phase: "prepare" | "sliding";
  manual: boolean;
};

function getTransform(direction: Direction, position: "current" | "incoming", phase: SlideTransition["phase"] | undefined) {
  if (!phase) return "translate3d(0, 0, 0)";

  if (direction === "next") {
    return position === "current" && phase === "sliding"
      ? "translate3d(-100%, 0, 0)"
      : position === "incoming" && phase === "prepare"
        ? "translate3d(100%, 0, 0)"
        : "translate3d(0, 0, 0)";
  }

  return position === "current" && phase === "sliding"
    ? "translate3d(100%, 0, 0)"
    : position === "incoming" && phase === "prepare"
      ? "translate3d(-100%, 0, 0)"
      : "translate3d(0, 0, 0)";
}

export default function ProjectImageCarousel({
  images,
  projectTitle,
}: {
  images: ProjectCardImage[];
  projectTitle: string;
}) {
  const frameId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState<SlideTransition | null>(null);
  const [failedIndexes, setFailedIndexes] = useState<ReadonlySet<number>>(() => new Set());
  const [announcement, setAnnouncement] = useState("");
  const [supportsFineHover, setSupportsFineHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeIndexRef = useRef(activeIndex);
  const transitionRef = useRef(transition);
  const failedIndexesRef = useRef(new Set<number>());
  const imageLoadsRef = useRef(new Map<number, Promise<boolean>>());
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTokenRef = useRef(0);
  const hoverSessionRef = useRef(0);
  const navigationRequestRef = useRef(0);
  const hoverActiveRef = useRef(false);
  const resetOnExitRef = useRef(false);
  const isMountedRef = useRef(true);
  const scheduleAutoAdvanceRef = useRef<(fromIndex: number, session: number, visibleSince: number) => void>(() => undefined);

  activeIndexRef.current = activeIndex;
  transitionRef.current = transition;

  const cancelCycle = useCallback(() => {
    if (cycleTimerRef.current !== null) {
      clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    cycleTokenRef.current += 1;
  }, []);

  const markImageFailed = useCallback((index: number) => {
    if (failedIndexesRef.current.has(index)) return;
    failedIndexesRef.current.add(index);
    if (isMountedRef.current) setFailedIndexes(new Set(failedIndexesRef.current));
  }, []);

  const loadImage = useCallback((index: number): Promise<boolean> => {
    if (failedIndexesRef.current.has(index)) return Promise.resolve(false);

    const cached = imageLoadsRef.current.get(index);
    if (cached) return cached;

    const promise = new Promise<boolean>((resolve) => {
      const image = new window.Image();
      let settled = false;
      const finish = (loaded: boolean) => {
        if (settled) return;
        settled = true;
        if (!loaded) markImageFailed(index);
        resolve(loaded);
      };
      image.onload = () => finish(image.naturalWidth > 0);
      image.onerror = () => finish(false);
      image.decoding = "async";
      image.src = images[index].src;
      if (image.complete) queueMicrotask(() => finish(image.naturalWidth > 0));
    });

    imageLoadsRef.current.set(index, promise);
    return promise;
  }, [images, markImageFailed]);

  const findLoadedImage = useCallback(async (
    fromIndex: number,
    direction: Direction,
    includeStart = false,
  ): Promise<number | null> => {
    const count = images.length;
    const firstStep = includeStart ? 0 : 1;
    const lastStep = count - 1;

    for (let step = firstStep; step <= lastStep; step += 1) {
      const index = (fromIndex + (step * (direction === "next" ? 1 : -1)) + (count * 2)) % count;
      if (failedIndexesRef.current.has(index)) continue;
      if (await loadImage(index)) return index;
    }

    return null;
  }, [images.length, loadImage]);

  const beginTransition = useCallback((index: number, direction: Direction, manual = false) => {
    if (index === activeIndexRef.current) return;
    cancelCycle();
    navigationRequestRef.current += 1;

    if (reducedMotion) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      setTransition(null);
      transitionRef.current = null;
      if (manual) {
        const visiblePosition = [...Array(images.length).keys()].filter((item) => !failedIndexesRef.current.has(item)).indexOf(index) + 1;
        const visibleCount = images.length - failedIndexesRef.current.size;
        setAnnouncement(`Image ${visiblePosition} of ${visibleCount}`);
      }
      return;
    }

    const nextTransition: SlideTransition = { index, direction, phase: "prepare", manual };
    transitionRef.current = nextTransition;
    setTransition(nextTransition);
  }, [cancelCycle, images.length, reducedMotion]);

  const scheduleAutoAdvance = useCallback((fromIndex: number, session: number, visibleSince: number) => {
    cancelCycle();
    if (!hoverActiveRef.current || reducedMotion || images.length < 2) return;

    const token = cycleTokenRef.current;
    const nextImage = findLoadedImage(fromIndex, "next");
    const remaining = Math.max(0, PROJECT_IMAGE_DISPLAY_DURATION_MS - (performance.now() - visibleSince));

    cycleTimerRef.current = setTimeout(() => {
      cycleTimerRef.current = null;
      void nextImage.then((nextIndex) => {
        if (
          nextIndex === null
          || token !== cycleTokenRef.current
          || session !== hoverSessionRef.current
          || !hoverActiveRef.current
          || transitionRef.current !== null
        ) return;
        beginTransition(nextIndex, "next");
      });
    }, remaining);
  }, [beginTransition, cancelCycle, findLoadedImage, images.length, reducedMotion]);
  scheduleAutoAdvanceRef.current = scheduleAutoAdvance;

  const resetToPrimary = useCallback(async (fromIndex: number) => {
    const request = ++navigationRequestRef.current;
    const primaryIndex = await findLoadedImage(0, "next", true);
    if (
      primaryIndex === null
      || request !== navigationRequestRef.current
      || hoverActiveRef.current
      || transitionRef.current !== null
    ) return;
    if (primaryIndex === fromIndex) return;
    beginTransition(primaryIndex, primaryIndex < fromIndex ? "previous" : "next");
  }, [beginTransition, findLoadedImage]);

  const completeTransition = useCallback((completed: SlideTransition) => {
    activeIndexRef.current = completed.index;
    transitionRef.current = null;
    setActiveIndex(completed.index);
    setTransition(null);

    if (completed.manual) {
      const visiblePosition = [...Array(images.length).keys()].filter((item) => !failedIndexesRef.current.has(item)).indexOf(completed.index) + 1;
      const visibleCount = images.length - failedIndexesRef.current.size;
      setAnnouncement(`Image ${visiblePosition} of ${visibleCount}`);
    }

    if (resetOnExitRef.current) {
      resetOnExitRef.current = false;
      void resetToPrimary(completed.index);
      return;
    }

    if (hoverActiveRef.current) {
      scheduleAutoAdvanceRef.current(completed.index, hoverSessionRef.current, performance.now());
    }
  }, [images.length, resetToPrimary]);

  const handleImageFailure = useCallback((index: number) => {
    markImageFailed(index);
    const pending = transitionRef.current;

    if (pending?.index === index) {
      cancelCycle();
      transitionRef.current = null;
      setTransition(null);
      if (hoverActiveRef.current) {
        scheduleAutoAdvanceRef.current(activeIndexRef.current, hoverSessionRef.current, performance.now());
      } else if (resetOnExitRef.current) {
        resetOnExitRef.current = false;
        void resetToPrimary(activeIndexRef.current);
      }
      return;
    }

    if (activeIndexRef.current !== index) return;
    cancelCycle();
    const sourceIndex = activeIndexRef.current;
    const request = ++navigationRequestRef.current;
    void findLoadedImage(index, "next").then((nextIndex) => {
      if (
        nextIndex === null
        || request !== navigationRequestRef.current
        || activeIndexRef.current !== sourceIndex
        || transitionRef.current !== null
      ) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      if (hoverActiveRef.current) {
        scheduleAutoAdvanceRef.current(nextIndex, hoverSessionRef.current, performance.now());
      } else if (resetOnExitRef.current) {
        resetOnExitRef.current = false;
        void resetToPrimary(nextIndex);
      }
    });
  }, [cancelCycle, findLoadedImage, markImageFailed, resetToPrimary]);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateHover = () => setSupportsFineHover(hoverQuery.matches);
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateHover();
    updateMotion();
    hoverQuery.addEventListener("change", updateHover);
    motionQuery.addEventListener("change", updateMotion);
    return () => {
      hoverQuery.removeEventListener("change", updateHover);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    if (transition?.phase !== "prepare") return;
    const frame = window.requestAnimationFrame(() => {
      const current = transitionRef.current;
      if (!current || current.index !== transition.index || current.phase !== "prepare") return;
      const sliding = { ...current, phase: "sliding" as const };
      transitionRef.current = sliding;
      setTransition(sliding);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [transition]);

  useEffect(() => {
    isMountedRef.current = true;
    const imageLoads = imageLoadsRef.current;
    return () => {
      isMountedRef.current = false;
      cancelCycle();
      navigationRequestRef.current += 1;
      imageLoads.clear();
    };
  }, [cancelCycle]);

  useEffect(() => {
    if (!reducedMotion || !hoverActiveRef.current) return;
    hoverActiveRef.current = false;
    hoverSessionRef.current += 1;
    cancelCycle();
    const pending = transitionRef.current;
    if (pending) completeTransition(pending);
  }, [cancelCycle, completeTransition, reducedMotion]);

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (images.length < 2) return;
    hoverActiveRef.current = false;
    hoverSessionRef.current += 1;
    navigationRequestRef.current += 1;
    cancelCycle();
    resetOnExitRef.current = false;
    if (!supportsFineHover || reducedMotion) return;
    hoverActiveRef.current = true;
    const session = hoverSessionRef.current;
    const currentIndex = activeIndexRef.current;
    void loadImage(currentIndex).then((loaded) => {
      if (!loaded) {
        handleImageFailure(currentIndex);
        return;
      }
      if (
        session !== hoverSessionRef.current
        || !hoverActiveRef.current
        || activeIndexRef.current !== currentIndex
        || transitionRef.current !== null
      ) return;
      scheduleAutoAdvanceRef.current(currentIndex, session, performance.now());
    });
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    hoverActiveRef.current = false;
    hoverSessionRef.current += 1;
    navigationRequestRef.current += 1;
    cancelCycle();
    resetOnExitRef.current = true;
    if (transitionRef.current !== null) return;
    resetOnExitRef.current = false;
    void resetToPrimary(activeIndexRef.current);
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLImageElement>) => {
    if (event.propertyName !== "transform" || event.target !== event.currentTarget) return;
    const completed = transitionRef.current;
    if (!completed || completed.phase !== "sliding") return;
    completeTransition(completed);
  };

  const handleManualNavigation = async (direction: Direction) => {
    if (transitionRef.current !== null || images.length < 2) return;
    cancelCycle();
    const request = ++navigationRequestRef.current;
    const fromIndex = activeIndexRef.current;
    const nextIndex = await findLoadedImage(fromIndex, direction);
    if (
      nextIndex === null
      || request !== navigationRequestRef.current
      || transitionRef.current !== null
    ) return;
    beginTransition(nextIndex, direction, true);
  };

  const validImageCount = images.length - failedIndexes.size;
  const currentTransform = transition
    ? getTransform(transition.direction, "current", transition.phase)
    : "translate3d(0, 0, 0)";
  const incomingTransform = transition
    ? getTransform(transition.direction, "incoming", transition.phase)
    : "translate3d(0, 0, 0)";
  const imageStyle = { "--carousel-transition-duration": `${PROJECT_IMAGE_TRANSITION_DURATION_MS}ms` } as CSSProperties;

  return (
    <div
      className={styles.frame}
      style={imageStyle}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.viewport} id={frameId}>
        <Image
          className={styles.slide}
          data-moving={transition?.phase === "sliding" ? "true" : undefined}
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ transform: currentTransform }}
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
            handleImageFailure(activeIndex);
          }}
          onTransitionEnd={handleTransitionEnd}
        />
        {transition && (
          <Image
            className={styles.slide}
            data-moving={transition.phase === "sliding" ? "true" : undefined}
            src={images[transition.index].src}
            alt={images[transition.index].alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            aria-hidden="true"
            loading="eager"
            decoding="async"
            draggable={false}
            style={{ transform: incomingTransform }}
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
              handleImageFailure(transition.index);
            }}
          />
        )}
      </div>

      {images.length > 1 && validImageCount > 1 && (
        <>
          <div className={styles.controls} role="group" aria-label={`${projectTitle} image controls`}>
            <button
              className={styles.control}
              type="button"
              aria-label={`Previous ${projectTitle} image`}
              aria-controls={frameId}
              disabled={transition !== null}
              onClick={() => void handleManualNavigation("previous")}
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
                <path d="m12.5 4.5-5.5 5.5 5.5 5.5" />
              </svg>
            </button>
            <div className={styles.indicators} aria-hidden="true">
              {[...Array(images.length).keys()].filter((index) => !failedIndexes.has(index)).map((index) => (
                <span className={styles.indicator} data-active={index === activeIndex ? "true" : undefined} key={index} />
              ))}
            </div>
            <button
              className={styles.control}
              type="button"
              aria-label={`Next ${projectTitle} image`}
              aria-controls={frameId}
              disabled={transition !== null}
              onClick={() => void handleManualNavigation("next")}
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
                <path d="m7.5 4.5 5.5 5.5-5.5 5.5" />
              </svg>
            </button>
          </div>
          <span className={styles.announcement} aria-live="polite" aria-atomic="true">{announcement}</span>
        </>
      )}
    </div>
  );
}
