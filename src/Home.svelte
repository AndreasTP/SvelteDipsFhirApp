<script>
    import { text } from 'svelte/internal';
    import {patient2} from './SmartOnFhirStore.js';
    import {fhir} from './SmartOnFhirStore.js';
    import {currentPatientId} from './SmartOnFhirStore.js';
    import {allergies} from './SmartOnFhirStore.js';


    let newAddress = "";

    function changeAddress() {
        let patient = $patient2;
        patient.address[0].line[0] = newAddress;
        updatePatient();
    }

    function changePatient() {
        if ($currentPatientId == "14019800513")
            currentPatientId.set("13116900216");
        else
            currentPatientId.set("14019800513")
    }

    function updatePatient() {
        const newPatient = {
                method: "PUT",
                body: $patient2,
                headers: {"Content-Type": "application/json",},
                url:    "patient/cdp1000813"
                //url: "Patient/"+ $currentPatientId
            }      
        newPatient.body.address[0].line[0] = newAddress;

        let p = $patient2;
        p.address[0].line[0] = "Nygata 3";    
        //$fhir.client.request(newPatient).then(console.log);
    }

    function addAllergy() {
        let newAllergy = $allergies.entry[0].resource;
        newAllergy.asserter.display="Andreas, Testsykehuset Hf";
        console.log(newAllergy);

        newAllergy = JSON.stringify(newAllergy);
        const newRequest = {
                method: "POST",
                body: newAllergy,
                headers: {"Content-Type": "application/json",},
                url:    "AllergyIntolerance"
            }    
        
        $fhir.client.request(newRequest).then(console.log);
    }


    //Medikinet Kaps modif frisetting 60 mg (Medice Arzneimittel Pütter GmbH & Co KG)
    function editAllergy() {
        let newAllergy = $allergies.entry[0].resource;
        newAllergy.code.text="iBux22";
        console.log(newAllergy);

        newAllergy = JSON.stringify(newAllergy);
        const newRequest = {
                method: "PUT",
                body: newAllergy,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0QzZFOThGMkIwNjRFMDI0N0UyQTA0NkNDMjRDNkYxQjM5ODJEMzAiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJGTWJwanlzR1RnSkg0cUJHekNURzhiT1lMVEEifQ.eyJuYmYiOjE2MjYzNTQwODcsImV4cCI6MTYyNjM1NzY4NywiaXNzIjoiaHR0cHM6Ly92dC1zZWxlY3RhLWIuZGlwcy5sb2NhbC9kaXBzLm9hdXRoIiwiYXVkIjpbImh0dHBzOi8vdnQtc2VsZWN0YS1iLmRpcHMubG9jYWwvZGlwcy5vYXV0aC9yZXNvdXJjZXMiLCJhbGxlcmd5aW50b2xlcmFuY2UvKi5yZWFkIiwib2ZmbGluZV9hY2Nlc3MiLCJwYXRpZW50LyoucmVhZCIsImxhdW5jaCIsImZoaXJVc2VyIiwicGF0aWVudC8qLndyaXRlIiwiYWxsZXJneWludG9sZXJhbmNlLyoud3JpdGUiXSwiY2xpZW50X2lkIjoic3lrZXBlbmdlcl9kb2t1bWVudCIsInN1YiI6IjNmNDJkMmNhLTM5NDQtYWQ0ZC1hMjQ4LTljZDcwMjJjMjhiNiIsImF1dGhfdGltZSI6MTYyNjMzMTE4OSwiaWRwIjoibG9jYWwiLCJuYW1lIjoiTUxJIiwiZGlwcy10aWNrZXQiOiI2ZjVkYTQzMy04ODMxLTQxNzYtYjYyYy01Yzg0Yzk2MTNmNWUiLCJkaXBzOi8vdGlja2V0IjoiNmY1ZGE0MzMtODgzMS00MTc2LWI2MmMtNWM4NGM5NjEzZjVlIiwiZGlwcy1maXJzdG5hbWUiOiJNQVgiLCJkaXBzLWxhc3RuYW1lIjoiTElOS0RJUFMgKFRFU1RQTEFOIEJBUy1URUFNKSIsImRpcHMtdXNlcmlkIjoiMTc5IiwiZGlwcy11c2VybmFtZSI6Ik1MSSIsImRpcHMtdXNlcmludXNlIjoiVHJ1ZSIsImRpcHMtdXNlcnBhc3N3b3JkY2hhbmdlZHRpbWUiOiI0NzUxLTA5LTIwVDExOjQyOjUyLjAwMDAwMDAiLCJkaXBzLXVzZXJpc3N5c3RlbXVzZXIiOiJGYWxzZSIsImRpcHMtdXNlcmxhc3Rsb2dpbnRpbWUiOiIyMDA4LTEwLTIwVDE1OjI2OjQ3LjAwMDAwMDAiLCJkaXBzLXVzZXJwZXJzb25wcm94eWlkIjoiM2Y0MmQyY2EtMzk0NC1hZDRkLWEyNDgtOWNkNzAyMmMyOGI2IiwiZGlwcy11c2Vycm9sZWlkIjoiMTAwMjQyMCIsImRpcHMtdXNlcnJvbGVuYW1lIjoiTUxJIEZ1bGwgdGlsZ2FuZyIsImRpcHMtdXNlcnJvbGVob3NwaXRhbCI6IjEwMDAwMjIiLCJkaXBzLWhjcGlkIjoiMCIsImRpcHMtdXNlcnJvbGVkZXBhcnRtZW50IjoiMTAwMDM5NyIsImRpcHMtdXNlcnJvbGVndWlkIjoiMDE0ZmE4ODUtMDBkNi0xOTRmLWIyZjYtMTk5OGU0ODNlNzM3IiwiZGlwcy1hdWRpdC1jb3JyLWlkIjoiNmJjZWU1YjUtZTMyOC00YjdjLWJkNDAtNmYwOWE2ODcyMGM5Iiwic2NvcGUiOlsib3BlbmlkIiwiYWxsZXJneWludG9sZXJhbmNlLyoucmVhZCIsIm9mZmxpbmVfYWNjZXNzIiwicGF0aWVudC8qLnJlYWQiLCJsYXVuY2giLCJmaGlyVXNlciIsInBhdGllbnQvKi53cml0ZSIsImFsbGVyZ3lpbnRvbGVyYW5jZS8qLndyaXRlIl0sImFtciI6WyJwd2QiXX0.EwDJsnQ5hG0ro5uhXSYWIhrOVKlfTjKcA5KfRWVJOvnruoyV62zUzNqcQtTmE4MLdScIBIQf-rjNidkJj3aVL76zLDIvKL-A_5kMGddTTRIPlaI_K-5Xqg_yuoPyfo0pm44C1ejtVIAVORWu3O2j8OB58zoCbp9Z3pBNHLrW3GTlKb278bxMABg0HmbUWA4AyzgoIeit-RduBClcOK22YfNApfxHNLMM2FLGjw36XHmYCMoJa36NlhDKHVvm7zzHiqLMLuBKFRb1iPHaSFVYTFEyPzZ4zBl6bjH_Ar6tP_F8xtKTbks8YWNvkY4djqsoKA0Fk6cWMkdWOswJiySoCQ"
                },
                url:    "AllergyIntolerance/aabeee0000001011165"
            }    
        
        $fhir.client.request(newRequest).then(console.log);
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
    

    {#if $allergies}
        <p> Name: {$allergies.entry[0].resource.code.text} </p>
        <p> Criticality: {$allergies.entry[0].resource.criticality} </p>

    {:else}
        Loading Allergies...
    {/if}

    <button on:click="{addAllergy}">Add allergy</button>
    <button on:click="{editAllergy}">Edit allergy</button>

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
