<script>
    import {patient2} from './SmartOnFhirStore.js';
    import {fhir} from './SmartOnFhirStore.js';
    import {currentPatientId} from './SmartOnFhirStore.js';
    import {allergies} from './SmartOnFhirStore.js';
    import {changeableAllergy} from './SmartOnFhirStore.js';
    import {currentAllergyDescription} from './SmartOnFhirStore.js';
    import allergyBody from "./body.json";

    let newAllergyText;

    function changePatient() {
        if ($currentPatientId == "14019800513")
            currentPatientId.set("13116900216");
        else
            currentPatientId.set("14019800513")
    }


    //Adding a new allergy with the user input
    async function addAllergy() {
        allergyBody.reaction[0].description = newAllergyText;

        if(confirm("Are you sure you want to add a new allergy?")) {
            console.log("Adding new allergy");
            const newRequest = await fetch("https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4/AllergyIntolerance?_profile=DIPSAdverseDrugReaction", {
                method: "POST",
                body: JSON.stringify(allergyBody),
                headers: {
                    "Content-Type": "application/json",
                    "Auth-ticket": "fad3f55a-b3a3-455f-80b0-bd4f82c29bf6"
                },
            });    
        }
        else 
            console.log("Did not add new allergy");
    }

    

    //Edits the description text of the changeableAllergy's reaction
    async function editAllergy() {
        allergyBody.reaction[0].description = newAllergyText;
        
        const newRequest2 = await fetch("https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4/AllergyIntolerance/eeeaabeee0000001011611?_profile=DIPSAdverseDrugReaction", {
            method: "PUT",
            body: JSON.stringify(allergyBody),
            headers: {
                "Content-Type": "application/json",
                "Auth-ticket": "fad3f55a-b3a3-455f-80b0-bd4f82c29bf6"   //Er dette riktig eller skal vi gjøre request gjennom fhir?
            },
        });  
        currentAllergyDescription.set(newAllergyText);
    }

</script>


<div id="mainDiv">
    {#if $patient2}
        <h3>Patient:</h3> 
        <p> Name: {$patient2?.name[0]?.text}</p>
        <p> Patient-id: {$patient2?.identifier[1]?.value}</p>
        <p> Address: {$patient2?.address[0]?.line[0]} , {$patient2?.address[0]?.city}</p>
    {:else}
        Loading Patient2...
    {/if}

    <button on:click="{changePatient}">Change patient</button>


    {#if $changeableAllergy}
        <h3>Allergy:</h3> 
        <p> Name: {$changeableAllergy?.code?.text} </p>
        <p> Description: {$changeableAllergy?.reaction[0]?.description} </p>

    {:else}
        Loading Allergy...
    {/if}

    <div>
        <input type="text" bind:value="{newAllergyText}"/>
        <button on:click="{editAllergy}">Edit allergy description</button>
        <button on:click="{addAllergy}">Add allergy</button>
    </div>


</div>

<style>

    #buttonDiv button {
        display: block;
    }

    #inputDiv input {
        display: inline-block;
    }

    #inputDiv button {
        display: inline-block;
    }


    #mainDiv {
        margin-left: 2%;
    }


</style>
