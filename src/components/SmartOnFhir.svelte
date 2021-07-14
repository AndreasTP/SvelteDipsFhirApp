<script>
    import { user, patient, encounter, resource } from '../SmartOnFhirStore.js';
</script>

<ul>    
    {#if $patient != null}
        {#if $user != null}           
            <li>
                User: 
                {#each $user?.name[0].given as given, i}
                    {given + " "}
                {/each}
                {$user?.name[0].family}    
            </li>
        {/if}    
        {#if $patient != null}
            <li>
                Patient: 
                {#each $patient?.name[0].given as given, i}
                    {given}
                {/each}
                {$patient?.name[0].family}    
            </li>        
        {/if}
        {#if $encounter != null}
            <li>
                Encounter: 
                {$encounter.id}        
            </li>            
        {/if}    
        {#if $resource != null}
            <li>
                Resource: 
                {$resource}        
            </li>            
        {/if}    
    {:else}
        <p>Loading SMART on Fhir context...</p> 
    {/if}
</ul>

<style>
    p {
        font-size: 12px;
    }
    img {
        padding: 4px;        
    }
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        margin: 1px;
        display: inline-block;
        padding: 0 20px 0 0;        
        font-size: 12px;
    }
</style>