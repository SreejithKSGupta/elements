<script lang="ts">
    export let element: any;
    export let property: any;
  
    function gotoelement(element: string) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      window.location.href = `${baseUrl}/${element}`;
    }
  </script>
  
  <div class="card">
    <div class="card-image">
      <img
        src={element.image?.url || element.bohr_model_image}
        alt={element.name}
      />
    </div>
  
    <div class="card-content">
      <div class="card-header">
        <h2 class="elementname">{element.name} ({element.symbol})</h2>
        <span class="badge">{element.category}</span>
      </div>
  
      <div class="card-info">
       <div class="propertyitem">  <div class="propertyname"> Discovered by</div> <div class="propertyvalue"> {element.discovered_by || "Unknown"}</div> </div>
       <div class="propertyitem">  <div class="propertyname">{property} </div> <div class="propertyvalue">{element[property]} </div> </div>
       <div class="propertyitem">  <div class="propertyname">Atomic Mass </div> <div class="propertyvalue"> {element.atomic_mass} u</div> </div>
       <div class="propertyitem">  <div class="propertyname"> Density</div> <div class="propertyvalue"> {element.density} g/cm³ </div> </div>
       <div class="propertyitem">  <div class="propertyname">Phase at STP </div> <div class="propertyvalue">{element.phase} </div> </div> 
      </div>
  
      <button class="details-button" on:click={() => gotoelement(element.name)}>
        Details
      </button>
    </div>
  </div>
  
  <style>
    .card {
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: box-shadow 0.3s ease;
      background-color: #0000006b;
      color: white;
      height: 50vh;
    }
  
  
    .card-image img {
      width: 100%;
      height: 25vh;
      object-fit: cover;
    }
  

    .card-content {
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .elementname {
        font-weight: 900;
        font-size: 120%;
    }
  
    .card-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
  
    .badge {
      background-color: #1e90ff;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.9em;
    }
  
    .card-info {
      width: 100%;
    }
  
    .details-button {
      padding: 10px 20px;
      width: 90%;
      border: none;
      border-radius: 5px;
      background-color: #1e90ff;
      color: white;
      font-size: 1em;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .details-button:hover {
      background-color: #0073e6;
    }

    .propertyitem{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 5px;
    }

    .propertyitem:nth-child(even){
        background-color: rgba(0, 0, 0, 0.301);
    }

    .propertyname {
        width: 40%;
        font-weight: bolder;
    }
    .propertyvalue {
        width: 50%;
    }
  </style>