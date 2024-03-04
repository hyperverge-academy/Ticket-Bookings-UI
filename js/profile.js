// document.addEventListener('DOMContentLoaded', function () {
//     const listOfBuses = document.getElementById('listOfBuses');
//     const busContentDiv = document.createElement('busContentDiv');

//     document.getElementById('selectBusButton').addEventListener("click", async function (event) {
//         event.preventDefault();
//         listOfBuses.innerHTML = '';

//         try {
//             const res = await fetch(
//                 `http://localhost:3000/buses`,
//                 {
//                     method: 'GET',
//                 }
//             );

//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }

//             const resData = await res.json();
//             console.log("Response Data:", resData);

//             let c = 1;
//             resData.forEach(bus => {
//                 listOfBuses.innerHTML += `
//                     <div class="busContentDiv">
//                         <strong>Bus Name:</strong> ${bus.bus_name}<br>
//                         <strong>From:</strong> ${bus.from}<br>
//                         <strong>To:</strong> ${bus.to}<br>
//                         <strong>Total Seats:</strong> ${bus.total_seats}<br>
//                         <strong>Total Time:</strong> ${bus.total_time}<br>
//                         <strong>Days:</strong> ${bus.days.join(', ')}<br>
//                         <strong>Bus Stops:</strong>
//                         <ul>
//                             ${bus.bus_stops.map(stop => `
//                                 <li>
//                                     <strong>From:</strong> ${stop.from}<br>
//                                     <strong>To:</strong> ${stop.to}<br>
//                                     <strong>Price:</strong> ${stop.price}<br>
//                                     <strong>Arrival:</strong> ${stop.arrival}<br>
//                                     <strong>Departure:</strong> ${stop.departure}<br>
//                                 </li>
//                             `).join('')}
//                         </ul>
//                     </div>
//                 `;
//                 c++;
//             });
//         } catch (error) {
//             console.error("Error:", error.message);
//         }
//     });
// });


const character = document.getElementById('character');
const role = localStorage.getItem('roleData');

if (role === 'user') {
    character.innerText = `You are Normal ${role}`;
} else {
    character.innerText = `You are a  ${role}`;
}

document.addEventListener('DOMContentLoaded', async function () {
    const listOfBuses = document.getElementById('listOfBuses');

    document.getElementById('selectBusButton').addEventListener("click", async function (event) {
        event.preventDefault();
        listOfBuses.innerHTML = '';

        try {
            const res = await fetch(
                `http://localhost:3000/buses`,
                {
                    method: 'GET',
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const resData = await res.json();
            console.log("Response Data:", resData);

            let c = 1;
            resData.forEach(bus => {
                const busContentDiv = document.createElement("div");
                busContentDiv.setAttribute("class", "busContentDiv");

                const busDetailsDiv = document.createElement("div");
                busDetailsDiv.innerHTML = `<strong>${c}. Bus Name:</strong> ${bus.bus_name}<br>
                                          <strong>Starting Destination:</strong> ${bus.from}<br>
                                          <strong>Ending Destination:</strong> ${bus.to}<br>
                                          <strong> Days:</strong> ${bus.days.join(', ')}<br>
                                          <strong>Total Seat :</strong> ${bus.total_seats}<br>
                                          <strong>Total Time:</strong> ${bus.total_time}<br>
                                          <strong>Bus Stops:</strong><br>`;

                const stopsList = document.createElement("ul");
                bus.bus_stops.forEach(stop => {
                    const stopItem = document.createElement("li");
                    stopItem.innerHTML = `
                        <strong>From:</strong> ${stop.from}<br>
                        <strong>To:</strong> ${stop.to}<br>
                        <strong>Price:</strong> ${stop.price}<br>
                        <strong>Arrival:</strong> ${stop.arrival}<br>
                        <strong>Departure:</strong> ${stop.departure}<br>
                    `;
                    stopsList.appendChild(stopItem);
                });

                busDetailsDiv.appendChild(stopsList);
                busContentDiv.appendChild(busDetailsDiv);

                listOfBuses.appendChild(busContentDiv);
                c++;
            });

            const busData = document.getElementsByClassName("busContentDiv");

            for (let i = 0; i < busData.length; i++) {
                busData[i].addEventListener("click", function () {
                    const list = document.getElementById("listOfBuses");
                    const inputsContent = document.createElement("div");
                    inputsContent.setAttribute("class", "fromTo");
                    list.innerHTML = "";

                    const label = document.createElement("label");
                    label.setAttribute("class", "from");
                    label.innerText = "From: ";
                    inputsContent.appendChild(label);

                    const fromInput = document.createElement("input");
                    fromInput.setAttribute("id", "fromIn");
                    fromInput.setAttribute("type", "text");
                    fromInput.setAttribute("placeholder", "From");
                    inputsContent.appendChild(fromInput);

                    list.appendChild(inputsContent);

                    document.getElementById("fromIn").addEventListener("click", function handleClick() {
                        const list = document.getElementById("listOfBuses");

                        const fromvalue = document.getElementById("fromIn").value;

                        if (fromvalue) {
                            const toContent = document.createElement("div");
                            toContent.setAttribute("class", "fromTo");

                            const toLabel = document.createElement("label");
                            toLabel.setAttribute("class", "from");
                            toLabel.innerText = " To: ";
                            toContent.appendChild(toLabel);

                            const toInput = document.createElement("input");
                            toInput.setAttribute("id", "toIn");
                            toInput.setAttribute("type", "text");
                            toInput.setAttribute("placeholder", "To");
                            toContent.appendChild(toInput);

                            list.appendChild(toContent);

                            document.getElementById("fromIn").removeEventListener("click", handleClick);
                        }
                    });
                });
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
});
