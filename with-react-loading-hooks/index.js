import React from 'react';
import { useRef, useState, useEffect } from 'react';

function useDelayHint(loading, delay) {
  const [delayed, setDelayed] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (loading) {
      timer.current = setTimeout(() => setDelayed(true), delay);
    } else {
      setDelayed(false);
    }
    return () => clearTimeout(timer.current);
  }, [loading]);

  return delayed;
}

function Render(props) {
  const isDelayed = useDelayHint(props.isLoading, 2000);
  return <PureDisplay {...props} isDelayed={isDelayed} />;
}

const PureDisplay = ({ isLoading, isDelayed, data = '完成' }) => {
  if (isDelayed) {
    return <div>'Please wait a little more...'</div>;
  }

  if (isLoading) {
    return <div>'Loading...'</div>;
  }

  return <div>{data}</div>;
};

const DemoCom = () => {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 3000);
  return <Render isLoading={isLoading} />;
};
export default DemoCom;
