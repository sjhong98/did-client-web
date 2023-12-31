import axios from 'axios';
import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import './list.css';
import InputField from '../../modules/inputField.js';
import SearchButton from './searchButton.js';
import { useDispatch } from 'react-redux';
import { setIsDiagnosis, setPatientInfo, setPatientVc, setPatientDid } from '../../redux/actions';

export default function PatientList() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [patientList, setPatientList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doctorDid = JSON.parse(localStorage.getItem("dmrs-did"));

    // const jwt = process.env.REACT_APP_JWT;
    const serverIP = process.env.REACT_APP_SERVER_IP_ADDRESS;

    const handleMouseOver = (index => {
        setActiveIndex(index);
    });

    const handleMouseOut = (() => {
        setActiveIndex(null);
    })

    useEffect(() => {
        if (!sessionStorage.getItem("dmrs-login")) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        console.log(doctorDid);
        axios.post(`https://${serverIP}:5001/doctor/get-patients-list`,   // 환자 목록 가져오기
            {
                doctorDID: doctorDid
            })   
            .then((res) => {
                console.log("===== 환자 정보 =====", res.data);
                setPatientList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        dispatch(setPatientVc([]));
            // eslint-disable-next-line
    }, []);

    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <div className='toolbar'>
                    <InputField type='text' setData={setKeyword} label='검색' width='10vw' />
                    <SearchButton keyword={keyword} patientList={patientList} setPatientList={setPatientList} />
                </div>
                <p style={{fontSize:'30px'}}>환자 목록</p>
                <div className='records-box'>
                    <div className='records-index'>
                        <p className='records-index-name-pl'>이름</p>
                        <p className='records-index-email-pl'>이메일</p>
                        <p className='records-index-date-pl'>생년월일</p>
                    </div>
                    { patientList.map((item, index) => {
                        if(item != null) {
                            return (
                                <div className={`records-list pointer ${activeIndex === index ? "records-mouseover" : ""}`} 
                                    key={index}
                                    onMouseOver={() => {handleMouseOver(index)}}
                                    onMouseOut={handleMouseOut} 
                                    onClick={() => {
                                        dispatch(setPatientInfo(item));
                                        dispatch(setPatientDid(item.did))
                                        dispatch(setIsDiagnosis(false));
                                        navigate(`/patient-medical-records`);
                                    }} 
                                >
                                    <div className='records-list-name-pl'>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='records-list-email-pl'>
                                        <p>{item.email}</p>
                                    </div>
                                    <div className='records-list-date-pl'>
                                        <p>{item.birthday}</p>
                                    </div>
                                </div>
                            )
                        }
                        else    
                            return (
                                <></>
                                )
                    }) }

                </div>
            </div>
            <Footer />
        </div>
    )
}
