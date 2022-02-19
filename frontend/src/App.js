import logo from './logo.svg';
import './App.css';
import MapWrapped from './components/Map';
import Sidebar from './components/Sidebar'
import Cards from './components/Cards'
import Geocode from "react-geocode";
import { useState, useEffect } from 'react';
import setup from './setup.json'

function App() {
  const defaultCenter = {
    lat: 42.36,
    lng: -71.093889,
  }
  const [center, setCenter] = useState({
    lat: 42.36,
    lng: -71.093889,
  })
  const [zoom, setZoom] = useState(15)
  const [locStr, setLocStr] = useState("")

  useEffect(async ()=>{
    Geocode.setApiKey(setup.GCP_MAPS_KEY);
    Geocode.setLocationType("ROOFTOP");

  }, [])
  
  const searchLoc = () => {
    // Get latitude & longitude from address.
    console.log("searchLoc")
    Geocode.fromAddress(locStr).then(
      (response) => {
        const newCenter = response.results[0].geometry.location;

        setCenter(newCenter)
        console.log(newCenter.lat, newCenter.lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div className='max-h-full'>

      <div className="bg-blue-500 text-2xl font-bold text-white py-2 px-10">
        AccCity
      </div>

      <div className="grid grid-cols-6">
        <div className='h-screen col-span-3 py-6 px-10'>
          <div className="grid-cols-3 pb-4">
            <form className="flex" onSubmit={(e)=>{
              e.preventDefault();
              searchLoc()
            }}>
            <input 
              type="text"
              id="search"
              className="col-span-2 w-10/12 shadow focus:ring-blue-500 border-gray-300 px-4 rounded-sm py-2" 
              placeholder="Search for a city, street, or address..."
              onChange={(e)=>setLocStr(e.target.value)}
              value={locStr}
              />
            <select class="px-4 py-3 w-2/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
              <option value="">Filter By...</option>
              <option value="Traffic">Traffic</option>
              <option value="Walkability">Walkability</option>
              <option value="Accessbility">Accessbility</option>
              <option value="Parking">Parking</option>
            </select>
              
            </form >
          </div>
          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
              setup.GCP_MAPS_KEY
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={defaultCenter} center={center} zoom={zoom}
          />
        </div>
        

        <div className='h-screen col-span-2 py-6'>
          <Cards />
        </div>
          
        <div className='h-screen col-span-1 py-6 px-10'>
            <Sidebar/>
        </div>
                  
      </div>
    
    </div>
  );
}

export default App;
