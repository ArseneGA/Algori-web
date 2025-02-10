import { useState, useCallback, useEffect, useRef } from 'react';

interface AnimationConfig<T> {
  param: keyof T;
  min: number;
  max: number;
  step: number;
  speed: number; // millisecondes par étape
}

export function useAnimation<T extends Record<string, number>>(
  params: T,
  setParams: React.Dispatch<React.SetStateAction<T>>,
  defaultConfig: Partial<AnimationConfig<T>> = {}
) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [selectedParams, setSelectedParams] = useState<Set<keyof T>>(new Set());
  const [stepSizes, setStepSizes] = useState<Map<keyof T | string, number>>(new Map());
  const [stepsPerSecond, setStepsPerSecond] = useState(1);
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    if (selectedParams.size === 0) return;

    setParams((prev) => {
      const newParams = { ...prev };
      let shouldChangeDirection = false;

      selectedParams.forEach((param) => {
        // Si le paramètre contient un index (ex: "a0", "b1")
        if (/^[ab]\d+$/.test(param as string)) {
          const paramType = (param as string)[0];
          const index = parseInt((param as string).slice(1));
          const currentArray = prev[paramType];
          
          if (!Array.isArray(currentArray)) return;
          
          const newArray = [...currentArray];
          const currentStepSize = stepSizes.get(param as string) || 1;
          let newValue = currentArray[index] + (currentStepSize * direction);
          
          newArray[index] = newValue;
          newParams[paramType] = newArray;
        } else {
          // Pour les paramètres simples
          const currentValue = prev[param];
          const currentStepSize = stepSizes.get(param) || 1;
          let newValue = currentValue + (currentStepSize * direction);
          
          newParams[param] = newValue;
        }
      });

      return newParams;
    });

    animationRef.current = window.setTimeout(animate, 1000 / stepsPerSecond);
  }, [selectedParams, direction, setParams, stepSizes, stepsPerSecond]);

  const toggleAnimation = useCallback(() => {
    if (selectedParams.size === 0) return;
    setIsAnimating((prev) => !prev);
  }, [selectedParams]);

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
    setIsAnimating(false);
  }, []);

  const setStepSize = useCallback((param: keyof T | string, value: number) => {
    setStepSizes(prev => {
      const newMap = new Map(prev);
      newMap.set(param, value);
      return newMap;
    });
  }, []);

  const getStepSize = useCallback((param: keyof T | string) => {
    return stepSizes.get(param) || 1;
  }, [stepSizes]);

  const setAnimationSpeed = useCallback((newSpeed: number) => {
    setStepsPerSecond(newSpeed);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animate();
    }
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isAnimating, animate]);

  return { 
    isAnimating, 
    toggleAnimation, 
    selectedParams,
    toggleParam,
    setStepSize,
    getStepSize,
    stepsPerSecond,
    setStepsPerSecond
  };
} 