import React from 'react'
import styled from 'styled-components'

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
  valueHistory: number[];
  timeStamp: number; // millisecond
  updateCount: number; // 10 millisecond => 0.01 second
  springForce1: SpringForce;
  xPosition: AnimationProp;
  ballMouseDown: boolean;
  mousePosition: Vector;
}

const initSpringForce1: SpringForce = {
	damping: 0.7,
  stiffness: 0.3,
  position: 200,
}

const initXPosition: AnimationProp = {
  value: 30,
  velocity: 0,
  force: 0,
  inversedMass: 1/4,
}

const initState: State = {
  valueHistory: [],
  timeStamp: 0,
  updateCount: 0,
  springForce1: initSpringForce1,
  xPosition: initXPosition,
  ballMouseDown: false,
  mousePosition: {x: 0, y: 0},
}


// ----------------------
// action model
// ----------------------
const tick = (tick: number) => ({
  type: 'TICK' as const,
  payload: {timeStamp: tick},
})

const ballMouseDown = (a: boolean) => ({
  type: 'BALL_MOUSE_DOWN' as const,
  payload: {ballMouseDown: a},
})

const mouseMove = (a: Vector) => ({
  type: 'MOUSE_MOVE' as const,
  payload: {mousePosition: a},
})

const changeDamping = (a: number) => ({
  type: 'CHANGE_DAMPING' as const,
  payload: {damping: a},
})

const changeStiffness = (a: number) => ({
  type: 'CHANGE_STIFFNESS' as const,
  payload: {stiffness: a},
})

type Action = ReturnType<typeof tick> | ReturnType<typeof ballMouseDown> | ReturnType<typeof mouseMove> | ReturnType<typeof changeDamping> | ReturnType<typeof changeStiffness>


// ----------------------
// lib
// ----------------------
const updateAnimationProp = (a: AnimationProp): AnimationProp => ({
  ...a,
  value: a.value + a.velocity + 0.5 * a.force * a.inversedMass,
  velocity: a.velocity + a.force * a.inversedMass,
  force: 0,
})

const applySpringForce = (a: AnimationProp) => (f: SpringForce): AnimationProp => {
  const distance = f.position - a.value
  const friction = -1 * a.velocity * f.damping
  const force = f.stiffness * distance + friction
  return {
    ...a,
    force: force,
  }
}

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case 'TICK':
      if(state.ballMouseDown) return state

      const xPosition = updateAnimationProp(state.xPosition)
      const xPosition2 = applySpringForce(xPosition)(state.springForce1)

      const shouldBeThisVersion: number = state.timeStamp / 10
      const behindVersion: boolean = shouldBeThisVersion > state.updateCount
      const tooFarBehind: boolean = shouldBeThisVersion + 50 > state.updateCount
    
      const finalState: State = {
        ...state,
        timeStamp: action.payload.timeStamp,
        updateCount: state.updateCount + 1,
        xPosition: xPosition2,
      }

      return behindVersion && !tooFarBehind ? reducer(finalState, action) : finalState

    case 'MOUSE_MOVE':
      return {
        ...state,
        valueHistory: [...state.valueHistory, state.xPosition.value],
        mousePosition: action.payload.mousePosition,
        xPosition: {
          ...state.xPosition,
          value: state.ballMouseDown ? action.payload.mousePosition.x : state.xPosition.value
        }
      }
    case 'BALL_MOUSE_DOWN':
      return {
        ...state,
        ballMouseDown: action.payload.ballMouseDown,
      }
    case 'CHANGE_DAMPING':
      return {
        ...state,
        springForce1: {
          ...state.springForce1,
          damping: action.payload.damping,
        }
      }
    case 'CHANGE_STIFFNESS':
      return {
        ...state,
        springForce1: {
          ...state.springForce1,
          stiffness: action.payload.stiffness,
        }
      }
  }
}

// ----------------------
// draw
// ----------------------
const StyledContainer = styled.div`
  width: 60%;
  height: 100vh;
  margin: auto; 
  display: grid;
  grid-gap: 30px;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 300px;
  grid-template-areas: "input1 input2"
                       "graph  graph";
`

const StyledInputDiv = styled.div`
  display: grid;
  justify-content: center;
`

const StyledCanvas = styled.canvas`
  grid-area: graph;
  width: 100%;
  height: 100%;
`

const App: React.FC = () => {

  const [state, dispatch] = React.useReducer(reducer, initState)

  const animationRef = React.useRef(0)
  const circleRef = React.useRef<SVGCircleElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null)

  const step = (t1: number) => (t2: number) => {
      if (t2 - t1 > 10) {
          dispatch(tick(t2))
          animationRef.current = requestAnimationFrame(step(t2))
      } else {
          animationRef.current = requestAnimationFrame(step(t1))
      }
  }

  React.useEffect(() => {
    animationRef.current = requestAnimationFrame(step(0))
    return () => cancelAnimationFrame(animationRef.current)
  }, [])

  React.useEffect(() => {
    if(circleRef.current){
      circleRef.current.addEventListener('mousedown', () => {
        dispatch(ballMouseDown(true))
      })
    
      circleRef.current.addEventListener('mouseup', () => {
        dispatch(ballMouseDown(false))
      })
    }
  }, [circleRef])

  React.useEffect(() => {
    window.addEventListener('mousemove', e => {
      dispatch(mouseMove({x: e.clientX, y: e.clientY}))
    })
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if(canvas){
      ctxRef.current = canvas.getContext('2d')
      if(ctxRef.current){
        //ctxRef.current.fillStyle = "black";
        //ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [])

  React.useEffect(() => {
    if(ctxRef.current){
      const ctx = ctxRef.current
      ctx.beginPath();
      ctx.lineTo(state.updateCount, state.xPosition.value);
      ctx.stroke();
    }
  }, [state])

  return (
    <StyledContainer>
      <StyledInputDiv>
        <p>Damping {state.springForce1.damping}</p>
        <input type='range' min='0' max='1000' onChange={e => dispatch(changeDamping(parseInt(e.target.value) / 1000))}/>
      </StyledInputDiv>
      <StyledInputDiv>
        <p>Stiffness {state.springForce1.stiffness}</p>
        <input type='range' min='0' max='100' onChange={e => dispatch(changeStiffness(parseInt(e.target.value)))}/>
      </StyledInputDiv>
      <StyledCanvas  ref={canvasRef}/>
    </StyledContainer>
  )
}

export default App