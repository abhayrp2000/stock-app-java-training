import React,{useState,useEffect} from 'react';
import Navbar from '../layout/Navbar';
import './company.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

export default function EditCompany(props) {

    const [company,setCompany]=useState({
        name:'',
        boardOfDirectors:'',
        description:'',
        turnover:'',
        id:'',
        stockCode:'',
        ceo:''
    })
    const id = props.match.params.id;

    const [loading,setLoading]=useState(true);
    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${id}`,config).then((res)=>{
            setCompany(res.data);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    },[])

    const onChange = e => setCompany({ ...company, [e.target.name]: e.target.value });

    const submit = async (e)=>{
        e.preventDefault();
        try{
            const {name,description,turnover,boardOfDirectors,stockCode,ceo}=company;
            if(name === '' || description === '' || turnover==='' || boardOfDirectors ==='' || stockCode ==='' || ceo===''){
                toast.error('Please fill in all the details', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }
              setLoading(true);
            const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/company/${id}`,{
                name,
                description,
                boardOfDirectors,
                turnover,
                ceo,
                stockCode
            },config)
            setLoading(false);
            toast.success('Company updated', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                props.history.push('/manage/companies');
        }catch(err){
            setLoading(false);
            console.log(err);
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }


    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>): (
        <div>
            <Navbar/>
            
            <section id="form-page">
        
        
        
        <div className="container form-page" >
        
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Edit Stock Exchange</h1>
          </div>
          <div class="form-content">
            <form>
            <div class="form-group"><label for="name">Name</label><input onChange={onChange} value={company.name} type="text" id="name" name="name" required="required" /></div>
            <div class="form-group"><label for="stockCode">Stock Code</label><input value={company.stockCode} onChange={onChange} type="text" id="stockCode" name="stockCode" required="required" /></div>
              <div class="form-group"><label for="ceo">CEO</label><input value={company.ceo} onChange={onChange} type="text" id="ceo" name="ceo" required="required" /></div>
            <div class="form-group"><label for="turnover">Turnover</label><input value={company.turnover} onChange={onChange} type="text" id="turnover" name="turnover" required="required" /></div>
            <div class="form-group"><label for="boardOfDirectors">Board Of Directors</label><textarea value={company.boardOfDirectors} className="form-control" rows="3" onChange={onChange} type="text" id="boardOfDirectors" name="boardOfDirectors" required="required" /></div>
            <div class="form-group"><label for="description">Description</label><textarea value={company.description} rows="5" className="form-control" onChange={onChange} type="text" id="description" name="description" required="required" /></div>
              
              <div class="form-group"><button onClick={submit}>Submit</button></div>
              
            </form>
          </div>
        </div>
        <div class="form-panel two">
          
        </div>
        </div>
        
      </div>
        
       
        
        </div>
        </section>  
             
        </div>
    )
}
