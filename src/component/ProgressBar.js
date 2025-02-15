import ProgressBar from 'react-bootstrap/ProgressBar';

function AnimatedExample({ progress }) {
  let variant;
  if (progress >= 100) {
    variant = "danger";
  } else if (progress >= 70) {
    variant = "warning";
  } else {
    variant = "success";
  }
  return <ProgressBar animated now={progress} variant={variant} />;
}

export default AnimatedExample;