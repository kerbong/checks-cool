import { useEffect, useRef } from "react";

const useTimeout = (callback, delay) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    const timerId = setTimeout(executeCallback, delay);

    return () => clearTimeout(timerId);
  }, []);
};

export default useTimeout;
