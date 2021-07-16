import { writable, derived } from "svelte/store";
import { oauth2 as Smart } from 'fhirclient';

export const fhir = writable(null);

export const user = derived(
    fhir, 
    ($fhir, set) => {
        if ($fhir != null && $fhir.client != null)
        {
            $fhir.client.user.read().then(u => set(u));
        }
   });

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
            fhir.set(newContext);
            console.log(newContext.client);
        })
        //.then(data => init(data))
        .catch(console.error);

//export const patient2 = writable(null);
export const currentPatientId = writable("13116900216"); 


//Storing the patiet who belongs to the "currentPatientId"
export const patient2 = derived(
    [fhir, currentPatientId],
    ([$fhir, $currentPatientId], set) => {
        if ($fhir != null && $fhir.client != null)
        {   
            // console.log("Henter line danser");
            // let url = "Patient/"+ $currentPatientId;
            // console.log(url);
            $fhir.client.request("patient/" + $currentPatientId).then(data => {set(data); 
              //  console.log(data)
            });
        }
    }
);


//Storing all allergies to the current patient
export const allergies = derived(
    [fhir, currentPatientId],
    ([$fhir, $currentPatientId], set) => {
        if ($fhir != null && $fhir.client != null)
        {   
            $fhir.client.request("https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4/AllergyIntolerance?patient.identifier=urn%3Aoid%3A2.16.578.1.12.4.1.4.1%7C" + $currentPatientId + "&_profile=DIPSAdverseDrugReaction").then(data => {set(data); 
            console.log(data)
        });
        }
    }
);

export const currentAllergyDescription = writable("13116900216"); 


//Storing "C01EB16: Ibuprofen" with id:eeeaabeee0000001011611 (found in patient line danser-> id:13116900216 )
export const changeableAllergy = derived(
    [fhir,currentAllergyDescription],
    ([$fhir,$currentAllergyDescription], set) => {
        if ($fhir != null && $fhir.client != null)
        {   
            $fhir.client.request("https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4/AllergyIntolerance/eeeaabeee0000001011611?_profile=DIPSAdverseDrugReaction").then(data => {set(data); 
            //console.log(data)
        });
        }
    }
);

