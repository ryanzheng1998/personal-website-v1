import React from 'react'

// ----------------------
// state model
// ----------------------
interface Vector {
	x: number;
	y: number;
}

interface SpringForce {
	damping: number;
  stiffness: number;
  position: number;
}

interface AnimationProp {
  value: number;
  velocity: number;
  force: number;
  inversedMass: number;
}

interface State {
  timeStamp: number; // millisecond
  updateCount: number; // 10 millisecond => 0.01 second
  springForces: SpringForce;
  xPosition: AnimationProp;
  ballMouseDown: boolean;
  mousePosition: Vector;
}

const JumpingText: React.FC = () => {


    return (
        <>
        </>
    )
}

export default JumpingText