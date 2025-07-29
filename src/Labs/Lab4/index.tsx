// import ClickEvent from "./ClickEvent";
// import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <div id="wd-passing-functions">
            <h2>Lab 4</h2>
            ...
            <PassingFunctions theFunction={sayHello} />

            {/* <PassingFunctions theFunction={ClickEvent} />
            <PassingFunctions theFunction={PassingDataOnEvent} /> */}
        </div>
    );
}

