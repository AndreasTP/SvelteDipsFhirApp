<script>
    import {oauth2 as Smart} from 'fhirclient';
	import {onMount} from 'svelte';

    onMount(async () => {
		// Smart.authorize({
		// 	clientId: 'dips-ehr-images',
		// 	scope: 'launch launch/patient patient/DocumentReference.write patient/DocumentReference.read patient/Patient.read patient/encounter patient/resource online_access openid fhirUser',			
		// 	redirectUri: './app',			
		// 	iss:			'https://dev-tst.dips.fhir.service.api.dips.no',
		// 	launch:			'6c5d9ca9-54d7-42f5-bfae-a7c19cd217f2::DocumentReference/c1c5fdad-eda4-4e9d-89b0-2a7d8eed45cb',
			

			// iss:		  'https://launch.smarthealthit.org/v/r3/sim/'
			//   			+ 'eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYT'
			//   			+ 'EtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQt'
			//   			+ 'UHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir',	

			// iss:			'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4',
			// launch:			'b20c7c80-49ac-4926-8b03-e9c69b40e1e2',

			// iss:			'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4',
			// launch:			'b20c7c80-49ac-4926-8b03-e9c69b40e1e2',

			// iss: 		'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4/&launch=b20c7c80-49ac-4926-8b03-e9c69b40e1e2',
			
			// https://dev-tst.dips-ehr-pdf.api.dips.no/?iss=https://dev-tst.dips.fhir.service.api.dips.no&launch=6c5d9ca9-54d7-42f5-bfae-a7c19cd217f2::DocumentReference/c1c5fdad-eda4-4e9d-89b0-2a7d8eed45cb
		//});
		Smart.authorize({
			clientId: 'sykepenger_dokument',
			//scope: 'launch openid fhirUser patient/*.read patient/*.write offline_access',
			scope: 'launch openid fhirUser patient/*.read patient/*.write allergyintolerance/*.read allergyintolerance/*.write offline_access',
            launch:	'https://localhost:9000',			
			redirectUri: './app',			
            iss:'https://vt-selecta-b.dips.local/DIPS-WebAPI/HL7/FHIR-R4',
			
	
		});
	});

	// https://dev-tst.dips-ehr-pdf.api.dips.no/?iss=
</script>        