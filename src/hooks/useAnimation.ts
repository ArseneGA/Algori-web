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
  const [stepSize, setStepSize] = useState(1);
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
          let newValue = currentArray[index] + (stepSize * direction);
          
          const min = getParameterMin(paramType);
          const max = getParameterMax(paramType);
          
          if (newValue >= max) {
            newValue = max;
            shouldChangeDirection = true;
          } else if (newValue <= min) {
            newValue = min;
            shouldChangeDirection = true;
          }
          
          newArray[index] = newValue;
          newParams[paramType] = newArray;
        } else {
          // Pour les paramètres simples
          const currentValue = prev[param];
          let newValue = currentValue + (stepSize * direction);
          
          const min = getParameterMin(param as string);
          const max = getParameterMax(param as string);
          
          if (newValue >= max) {
            newValue = max;
            shouldChangeDirection = true;
          } else if (newValue <= min) {
            newValue = min;
            shouldChangeDirection = true;
          }
          
          newParams[param] = newValue;
        }
      });

      if (shouldChangeDirection) {
        setDirection(prev => -prev);
      }

      return newParams;
    });

    animationRef.current = window.setTimeout(animate, 1000 / stepsPerSecond);
  }, [selectedParams, direction, setParams, stepSize, stepsPerSecond]);

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
    stepSize,
    setStepSize,
    stepsPerSecond,
    setStepsPerSecond
  };
}

// Fonctions utilitaires pour obtenir les limites des paramètres
function getParameterMin(key: string): number {
  const mins: Record<string, number> = {
    n: 1,
    d: 0,
    k: 1,
    points: 100,
    // Ajoutez d'autres paramètres selon vos besoins
  };
  return mins[key] || 0;
}

function getParameterMax(key: string): number {
  const maxs: Record<string, number> = {
    n: 10,
    d: 360,
    k: 10,
    points: 10000,
    // Ajoutez d'autres paramètres selon vos besoins
  };
  return maxs[key] || 100;
} 