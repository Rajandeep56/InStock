import {useParams} from 'react-router-dom';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';


function WarehouseDetails ({props}) {

    const {id} = useParams();
    const [warehouse, setWarehouse] = useState(null);

    useEffect(() =>{

        const fetchWarehouseDetails = async () => {
            try{
                const response = await Axios.get(`/api/warehouse/${id}`);
                setWarehouse(response.data)
            }
            catch(error){
                console.error('Oops! Error encountered when fetching warehouse details:', error)
            }
        };

        fetchWarehouseDetails();

    }, [id])

    return(
        <div className="container--title">
            
        </div>
    )
}

export default WarehouseDetails;