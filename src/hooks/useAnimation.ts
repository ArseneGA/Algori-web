import { useState, useCallback, useEffect, useRef } from 'react';

interface AnimationConfig<T> {
  param: keyof T;
  min: number;
  max: number;
  step: number;
  speed: number; // millisecondes par étape
}

interface AnimationOptions {
  getParameterMin?: (key: string) => number;
  getParameterMax?: (key: string) => number;
}

export function useAnimation<T extends Record<string, number>>(
  params: T,
  setParams: React.Dispatch<React.SetStateAction<T>>,
  options: AnimationOptions = {}
) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [selectedParams, setSelectedParams] = useState<Set<keyof T>>(new Set());
  const [stepSizes, setStepSizes] = useState<Map<keyof T | string, number>>(new Map());
  const [stepsPerSecond, setStepsPerSecond] = useState(1);
  const lastUpdateTime = useRef<number>(0);
  const animationFrameId = useRef<number>();

  const animate = useCallback((currentTime: number) => {
    if (selectedParams.size === 0) return;

    if (lastUpdateTime.current === 0) {
      lastUpdateTime.current = currentTime;
    }

    const deltaTime = currentTime - lastUpdateTime.current;
    const timePerStep = 1000 / stepsPerSecond;

    if (deltaTime >= timePerStep) {
      setParams((prev) => {
        const newParams = { ...prev };
        let shouldChangeDirection = false;

        selectedParams.forEach((param) => {
          const stepSize = stepSizes.get(param as string) || 0.1;
          const currentValue = prev[param];
          let newValue = currentValue + (stepSize * direction);

          const min = options.getParameterMin?.(param as string) ?? 0;

          if (newValue <= min) {
            newValue = min;
            shouldChangeDirection = true;
          }

          newParams[param] = newValue;
        });

        if (shouldChangeDirection) {
          setDirection(prev => -prev);
        }

        return newParams;
      });

      lastUpdateTime.current = currentTime;
    }

    if (isAnimating) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  }, [selectedParams, direction, isAnimating, stepsPerSecond, stepSizes, setParams, options]);

  const toggleAnimation = useCallback(() => {
    setIsAnimating(prev => {
      if (!prev) {
        // Démarrage de l'animation
        lastUpdateTime.current = 0;
        return true;
      } else {
        // Arrêt de l'animation
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = undefined;
        }
        return false;
      }
    });
  }, []);

  const toggleParam = useCallback((param: keyof T) => {
    setSelectedParams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(param)) {
        newSet.delete(param);
      } else {
        newSet.add(param);
      }
      return newSet;
    });
    // Arrêter l'animation lors du changement de paramètre
    if (isAnimating) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
      setIsAnimating(false);
    }
  }, [isAnimating]);

  const setStepSize = useCallback((param: keyof T | string, value: number) => {
    setStepSizes(prev => {
      const newMap = new Map(prev);
      newMap.set(param, value);
      return newMap;
    });
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animationFrameId.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = undefined;
        }
        lastUpdateTime.current = 0;
      };
    }
  }, [isAnimating, animate]);

  return { 
    isAnimating, 
    toggleAnimation, 
    selectedParams,
    toggleParam,
    setStepSize,
    stepSizes,
    stepsPerSecond,
    setStepsPerSecond
  };
} 