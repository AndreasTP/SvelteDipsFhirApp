<script>
    import { text } from 'svelte/internal';
    import {patient2} from './SmartOnFhirStore.js';
    import {fhir} from './SmartOnFhirStore.js';
    import currentPatientId from './SmartOnFhirStore.js';


    let newAddress = "";

    function changeAddress() {
        alert("changed address to: "+ newAddress);

    }

    function changePatient() {
        alert("changed patient");
        currentPatientId = "14019800513";
        console.log(currentPatientId);
        //$fhir.client.request("Patient/14019800513").then(data => {console.log(data)});
    }

</script>


<div>
    {#if $patient2}
        <h3>Patient:</h3> 
        <p> Name: {$patient2?.name[0]?.text}</p>
        <p> Patient-id: {$patient2?.identifier[1]?.value}</p>
        <p> Address: {$patient2?.address[0]?.line[0]} , {$patient2?.address[0]?.city}</p>
    {:else}
        Loading Patient2...
    {/if}

    <button on:click="{changeAddress}">Change address</button>
    <input type="text" placeholder="New address" bind:value={newAddress}/>
    <br>
    <button on:click="{changePatient}">Change patient</button>
    

    {#if $fhir}
        <p>Fhir is initialized</p>
    {:else}
        Loading FHIR...
    {/if}
   

</div>

<style>
    .pdf-frame {
        height: 100%;
        width: 100%;
    }

    div {
        margin-left: 2%;
    }


</style>
