import './style.css';
import { createMachine, State } from 'xstate';

// Define your XState machine
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

// Initialize the current state
let currentState = toggleMachine.initialState;

// Function to transition to the next state
function transition(event: string) {
  const nextState = toggleMachine.transition(currentState, event);
  currentState = nextState;
  updateUI();
}

// Function to update the UI based on the current state
function updateUI() {
  const stateElement = document.querySelector<HTMLHeadingElement>('#state')!;
  stateElement.textContent = currentState.matches('inactive') ? 'Inactive' : 'Active';
}

// Set up a simple UI to interact with the machine
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1 id="state">Inactive</h1>
    <button id="toggle">Toggle</button>
  </div>
`;

const toggleButton = document.querySelector<HTMLButtonElement>('#toggle')!;

toggleButton.addEventListener('click', () => {
  transition('TOGGLE');
});

// Initial UI update
updateUI();