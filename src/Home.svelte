<script>
    import {patient2} from './SmartOnFhirStore.js';
    import {fhir} from './SmartOnFhirStore.js';
    import {currentPatientId} from './SmartOnFhirStore.js';
    import {allergies} from './SmartOnFhirStore.js';
    import {changeableAllergy} from './SmartOnFhirStore.js';
    import {currentAllergyDescription} from './SmartOnFhirStore.js';
    import allergyBody from "./body.json";


    let editAllergyText;
    let newAllergyText;

    function changePatient() {
        if ($currentPatientId == "14019800513")
            currentPatientId.set("13116900216");
        else
            currentPatientId.set("14019800513")
    }


    function addAllergy() {
        let newAllergy = $allergies.entry[0].resource;
        newAllergy.asserter.display="Andreas, Testsykehuset Hf";
        console.log(newAllergy);

        newAllergy = JSON.stringify(newAllergy);
        const newRequest = {
                method: "POST",
                body: newAllergy,
                //headers: {"Content-Type": "application/json",},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0QzZFOThGMkIwNjRFMDI0N0UyQTA0NkNDMjRDNkYxQjM5ODJEMzAiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJGTWJwanlzR1RnSkg0cUJHekNURzhiT1lMVEEifQ.eyJuYmYiOjE2MjYzNTQwODcsImV4cCI6MTYyNjM1NzY4NywiaXNzIjoiaHR0cHM6Ly92dC1zZWxlY3RhLWIuZGlwcy5sb2NhbC9kaXBzLm9hdXRoIiwiYXVkIjpbImh0dHBzOi8vdnQtc2VsZWN0YS1iLmRpcHMubG9jYWwvZGlwcy5vYXV0aC9yZXNvdXJjZXMiLCJhbGxlcmd5aW50b2xlcmFuY2UvKi5yZWFkIiwib2ZmbGluZV9hY2Nlc3MiLCJwYXRpZW50LyoucmVhZCIsImxhdW5jaCIsImZoaXJVc2VyIiwicGF0aWVudC8qLndyaXRlIiwiYWxsZXJneWludG9sZXJhbmNlLyoud3JpdGUiXSwiY2xpZW50X2lkIjoic3lrZXBlbmdlcl9kb2t1bWVudCIsInN1YiI6IjNmNDJkMmNhLTM5NDQtYWQ0ZC1hMjQ4LTljZDcwMjJjMjhiNiIsImF1dGhfdGltZSI6MTYyNjMzMTE4OSwiaWRwIjoibG9jYWwiLCJuYW1lIjoiTUxJIiwiZGlwcy10aWNrZXQiOiI2ZjVkYTQzMy04ODMxLTQxNzYtYjYyYy01Yzg0Yzk2MTNmNWUiLCJkaXBzOi8vdGlja2V0IjoiNmY1ZGE0MzMtODgzMS00MTc2LWI2MmMtNWM4NGM5NjEzZjVlIiwiZGlwcy1maXJzdG5hbWUiOiJNQVgiLCJkaXBzLWxhc3RuYW1lIjoiTElOS0RJUFMgKFRFU1RQTEFOIEJBUy1URUFNKSIsImRpcHMtdXNlcmlkIjoiMTc5IiwiZGlwcy11c2VybmFtZSI6Ik1MSSIsImRpcHMtdXNlcmludXNlIjoiVHJ1ZSIsImRpcHMtdXNlcnBhc3N3b3JkY2hhbmdlZHRpbWUiOiI0NzUxLTA5LTIwVDExOjQyOjUyLjAwMDAwMDAiLCJkaXBzLXVzZXJpc3N5c3RlbXVzZXIiOiJGYWxzZSIsImRpcHMtdXNlcmxhc3Rsb2dpbnRpbWUiOiIyMDA4LTEwLTIwVDE1OjI2OjQ3LjAwMDAwMDAiLCJkaXBzLXVzZXJwZXJzb25wcm94eWlkIjoiM2Y0MmQyY2EtMzk0NC1hZDRkLWEyNDgtOWNkNzAyMmMyOGI2IiwiZGlwcy11c2Vycm9sZWlkIjoiMTAwMjQyMCIsImRpcHMtdXNlcnJvbGVuYW1lIjoiTUxJIEZ1bGwgdGlsZ2FuZyIsImRpcHMtdXNlcnJvbGVob3NwaXRhbCI6IjEwMDAwMjIiLCJkaXBzLWhjcGlkIjoiMCIsImRpcHMtdXNlcnJvbGVkZXBhcnRtZW50IjoiMTAwMDM5NyIsImRpcHMtdXNlcnJvbGVndWlkIjoiMDE0ZmE4ODUtMDBkNi0xOTRmLWIyZjYtMTk5OGU0ODNlNzM3IiwiZGlwcy1hdWRpdC1jb3JyLWlkIjoiNmJjZWU1YjUtZTMyOC00YjdjLWJkNDAtNmYwOWE2ODcyMGM5Iiwic2NvcGUiOlsib3BlbmlkIiwiYWxsZXJneWludG9sZXJhbmNlLyoucmVhZCIsIm9mZmxpbmVfYWNjZXNzIiwicGF0aWVudC8qLnJlYWQiLCJsYXVuY2giLCJmaGlyVXNlciIsInBhdGllbnQvKi53cml0ZSIsImFsbGVyZ3lpbnRvbGVyYW5jZS8qLndyaXRlIl0sImFtciI6WyJwd2QiXX0.EwDJsnQ5hG0ro5uhXSYWIhrOVKlfTjKcA5KfRWVJOvnruoyV62zUzNqcQtTmE4MLdScIBIQf-rjNidkJj3aVL76zLDIvKL-A_5kMGddTTRIPlaI_K-5Xqg_yuoPyfo0pm44C1ejtVIAVORWu3O2j8OB58zoCbp9Z3pBNHLrW3GTlKb278bxMABg0HmbUWA4AyzgoIeit-RduBClcOK22YfNApfxHNLMM2FLGjw36XHmYCMoJa36NlhDKHVvm7zzHiqLMLuBKFRb1iPHaSFVYTFEyPzZ4zBl6bjH_Ar6tP_F8xtKTbks8YWNvkY4djqsoKA0Fk6cWMkdWOswJiySoCQ"
                },
                url:    "AllergyIntolerance"
            }    
        
        $fhir.client.request(newRequest).then(console.log);
    }

    //Edits the description text of the changeableAllergy's reaction
    async function editAllergy() {
        allergyBody.reaction[0].description = editAllergyText;
        
        const newRequest2 = await fetch("https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4/AllergyIntolerance/eeeaabeee0000001011611?_profile=DIPSAdverseDrugReaction", {
            method: "PUT",
            body: JSON.stringify(allergyBody),
            headers: {
                "Content-Type": "application/json",
                "Auth-ticket": "fad3f55a-b3a3-455f-80b0-bd4f82c29bf6"
            },
        });  
        currentAllergyDescription.set(editAllergyText);
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

    <div id="buttonDiv">
        <div id="inputDiv">
            <input type="text"/>
            <button on:click="{addAllergy}" disabled>Add allergy</button>       
            <br>          
            <input type="text" bind:value="{editAllergyText}"/>
            <button on:click="{editAllergy}">Edit allergy description</button>
        </div>
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
