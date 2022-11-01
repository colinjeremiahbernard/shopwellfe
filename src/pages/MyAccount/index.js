import React,
{
    useState,
    useEffect,
    useRef
}
from 'react';

import {
     PageArea,
     ModalAll
 } from './styled'
import { 
    PageContainer,
    PageTitle,
    ErrorMessage
 } from "../../components/MainComponents";
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/shopAPI';
import Modal from '../../components/partials/ModalItem';
import MaskedImput from 'react-text-mask';
import { createNumberMask} from 'text-mask-addons';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";

const Page = () => {
    const api = useApi();
    const fileField = useRef();
    const [stateList, setStateList] = useState([]); 
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [error, setError] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [stateUser, setStateUser] = useState('');
    const [password, setPassword] = useState('');

    const [visibleModal, setVisibleModal] = useState(false);
    const [adStatusModal, setAdStatusModal] = useState(false);
    const [adTitleModal, setAdTitleModal] = useState('');

    const [categoryModal, setCategoryModal] = useState('');
    const [priceModal, setPriceModal] = useState('');
    const [priceNegotiableModal, setPriceNegotiableModal] = useState(false);
    const [discription, setDiscription] = useState('');
    const [imagesModal, setImagesModal] = useState([]);
    const [getIdAddModal, setGetIdAddModal] = useState('');

    useEffect(() => {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
        
    },[]);
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
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
                {categories.map((i, k) =>
                    <link
                       key = {k}
                       to = {`/ads?cat = ${i.slug}`}
                       className='categoryItem'
                       >
                        <img src={i.img} alt={`Logo da categoria ${i.name}`}/>
                        <span> {i.name}</span>
                    </link>
                )} 
              </div>
           </PageContainer>
         </SearchArea>
         <PageContainer>
            <PageArea>
              <h2> Anuncios Recentes </h2>
              <div className='List'>
                {adList.map((i, k) =>
                <AdItem key={k} data={i} />
                )}
              </div>
              <Link to= '/ads' className='seeAllLinks'> Ver Todos </Link>
              <hr/>
              Lorem Ipsum é simplesmente uma simulação de texto da indústria <br/>
              tipográfica e de impressos, e vem sendo utilizado desde o século XVI,<br/>
              quando um impressor desconhecido pegou uma bandeja de tipos e os<br/>
              embaralhou para fazer um livro de modelos de tipos.
            </PageArea>
         </PageContainer>
       </>
    )
}
export default Page