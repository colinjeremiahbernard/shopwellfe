import React,
{
    useState,
    useEffect 
}
from 'react';
import { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled'
import { PageContainer } from "../../components/MainComponents";

import useApi from '../../helpers/shopAPI'


const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]); 
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    },[]);
    useEffect(() => {
        const getCategories = async () => {
            const cat = await api.getCategories();
            setCategories(cat);
        }
        getCategories();
    },[])
    return (
       <>
         <SearchArea>
           <PageContainer>
              <div className='searchbox'>
                  <form method='GET' action='/ads'> 
                      <input 
                         type='text' 
                          name='q' 
                          placeholder='What are you looking for?'
                      />
                    <select name='state'>
                        {stateList.map((i, k) => 
                        <option key = {k} value= {i.name}>
                           {i.name}
                        </option>
                        )}  
                    </select> 
                    <button> Pesquisar </button> 
                  </form>
              </div>
              <div className='categoryList'>
                ... 
              </div>
           </PageContainer>
         </SearchArea>
         <PageContainer>
            <PageArea>
              ...
            </PageArea>
         </PageContainer>
       </>
    )
}
export default Page