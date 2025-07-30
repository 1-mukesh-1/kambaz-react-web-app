import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div className="container" id="wd-lab4">
      <h2>Lab 4</h2>

      <h3>Component State and Event Handling</h3>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />

      <h3>useState Examples</h3>
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />

      <ReduxExamples />
    </div>
  );
}

// import ReduxExamples from "./ReduxExamples";
// // import ClickEvent from "./ClickEvent";
// // import PassingDataOnEvent from "./PassingDataOnEvent";
// import PassingFunctions from "./PassingFunctions";

// export default function Lab4() {
//     function sayHello() {
//         alert("Hello");
//     }
//     return (
//         <div id="wd-passing-functions">
//             <h2>Lab 4</h2>
//             ...
//             <PassingFunctions theFunction={sayHello} />

//             <ReduxExamples />

//             {/* <PassingFunctions theFunction={ClickEvent} />
//             <PassingFunctions theFunction={PassingDataOnEvent} /> */}
//         </div>
//     );
// }

