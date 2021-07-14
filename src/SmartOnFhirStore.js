import { writable, derived } from "svelte/store";
import { oauth2 as Smart } from 'fhirclient';

export const fhir = writable(null);

// export const user = derived(
//     fhir, 
//     ($fhir, set) => {
//         if ($fhir != null && $fhir.client != null)
//         {
//             $fhir.client.user.read().then(u => set(u));
//         }
//    });

// export const patient = derived(
//     fhir,
//     ($fhir, set) => {
//         if ($fhir != null && $fhir.client != null)
//         {           
//             $fhir.client.patient.read().then(p => set(p));  
//         }
//     }
// );

// export const encounter = derived(
//     fhir,
//     ($fhir, set) => {
//         if ($fhir != null && $fhir.client != null)
//         {
//             $fhir.client.encounter.read().then(e => set(e));
//         }
//     }
// )

// export const resource = derived(
//     fhir, 
//     ($fhir, set) => {
//         if ($fhir != null && $fhir.client != null)
//         {
//             var resourceId = $fhir.client.getState("tokenResponse.resource");
//             $fhir.client.request(resourceId).then(
//                 resource => {
//                     console.log(resource);
//                     set(resource);
//                 });                       
//         }
//     }
// )

// Smart.ready()
//     .then(console.log("hei"))
//     .then(client => {
//         var newContext = {
//             client: client,
//             error: null
//         };
//         console.log("hei")
//         fhir.set(newContext)})
//     .catch(error => {
//         var newContext = {
//             client: null,
//             error: error
//         };
//         console.log("hei")
//         fhir.set(newContext)});
    
// Smart.ready()
//         .then(client => {
//             var newContext = {
//                 client: client,
//                 //patient: client.request("Patient/13116900216"),
//                 error: null
//             };
            
//         fhir.set(newContext)})
//         .then(console.log);
//         //.then(data => init(data))



// Smart.ready()
//         .then(client => {
//             client.request("Patient/13116900216");
//             var newContext = {
//                 client: client,
//                 error: null
//             };
//             fhir.set(newContext);})
//         //.then(data => init(data))
//         .then(data => {
//             patient2.set(data);
//             console.log(data);
//             })
//         .catch(console.error);

Smart.ready()
        .then(client => {
            var newContext = {
                client: client,
                error: null
            };
            fhir.set(newContext);})
        //.then(data => init(data))
        .catch(console.error);

//export const patient2 = writable(null);
export const currentPatientId = "13116900216";  //Make this as store

export const patient2 = derived(
    fhir,
    ($fhir, set) => {
        if ($fhir != null && $fhir.client != null)
        {   
            console.log("Henter line danser");
            let url = "Patient/"+ currentPatientId;
            //currentPatientId.set("13116900216")
            //console.log(currentPatientId);
            console.log(url);
            $fhir.client.request(url).then(data => {set(data); console.log(data)});
        }
    }
);

// export const patient2 = derived(
//     fhir,
//     ($fhir, set) => {
//         if ($fhir != null && $fhir.client != null)
//         {   
//             console.log("Henter line danser");
//             $fhir.client.request("Patient/13116900216").then(data => {set(data); console.log(data)});
//         }
//     }
// );

// function init(client) {
//     let p = client;
//     patient2.set(client);
//     gender.set(client?.gender);
//     familyName.set(client?.name[0]?.family);
//     console.log("h: ", p);
//     console.log("gender: ", gender);
// }
