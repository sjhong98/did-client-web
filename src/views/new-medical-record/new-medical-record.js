import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewMedicalRecord() {
    const [hospital, setHospital] = useState("");
    const [doctor, setDoctor] = useState("");
    const [dateOfVisit, setDateOfVisit] = useState(new Date());
    const [date, setDate] = useState("");
    const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("");
    const [pastMedicalHistory, setPastMedicalHistory] = useState("");
    const [medications, setMedications] = useState("");
    const [allergies, setAllergies] = useState("");
    const [physicalExamination, setPhysicalExamination] = useState("");
    const [laboratoryResults, setLaboratoryResults] = useState("");
    const [radiologicalFindings, setRadiologicalFindings] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [medicationPrescribed, setMedicationPrescribed] = useState("");
    const [followUp, setFollowUp] = useState("");
    const [additionalComments, setAdditionalComments] = useState("");
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [doctorDid, setDoctorDid] = useState("");
    const [patientDid, setPatientDid] = useState("");
    

    useEffect(() => {
        if(new URL(document.location.toString()).searchParams.get("patient"))
            setName(new URL(document.location.toString()).searchParams.get("patient"));
        
        setDoctorDid(localStorage.getItem("did"));
    }, []);

    useEffect(() => {
        const temp = dateOfVisit.toString().split(" ");
        let month = temp[1];
        if(month === "Jan") month = "1";
        else if(month === "Feb") month = "2";
        else if(month === "Mar") month = "3";
        else if(month === "Apr") month = "4";
        else if(month === "May") month = "5";
        else if(month === "Jun") month = "6";
        else if(month === "Jul") month = "7";
        else if(month === "Aug") month = "8";
        else if(month === "Sep") month = "9";
        else if(month === "Oct") month = "10";
        else if(month === "Nov") month = "11";
        else if(month === "Dec") month = "12";
        let _date = temp[3]+"/"+month+"/"+temp[2];
        setDate(_date);
        _date = "";
    }, [dateOfVisit]);

    const handleClick = async () => {
        const recordData = {
            hospital: hospital,
            doctor: doctor,
            dateOfVisit: date,
            historyOfPresentIllness: historyOfPresentIllness,
            pastMedicalHistory: pastMedicalHistory,
            medications: medications,
            allergies: allergies,
            physicalExamination: physicalExamination,
            laboratoryResults: laboratoryResults,
            radiologicalFindings: radiologicalFindings,
            diagnosis: diagnosis,
            treatment: treatment,
            medicationPrescribed: medicationPrescribed,
            followUp: followUp,
            additionalComments: additionalComments,
        }
        setIsLoading(true);

        // jwt와 did는 유저 회원가입시 또는 진료내용이 업데이트 될 떄마다, 서버에서 프론트로 던져줄예정
        // 이제 그걸 모바일에서 홀드하고 있어야함 // 그래서 현재는 임시로 지정해줄것임

        // 의사 jwt -> local에서.
        // 환자 jwt -> qr 코드에서.

        const serverIP = process.env.REACT_APP_SERVER_IP_ADDRESS;

        await axios.post(`http://${serverIP}:5001/user/new-record`, {recordData, doctorDid, patientDid})
            .then(res => {
                setIsLoading(false);
                console.log(res);
                localStorage.setItem("jwt", res.data.updatedVcJwt);
                // navigate(`/patient-medical-records?patient=${name}`);
            }).catch(err => console.log(err))
    }

    return (
        <div className='root'>
            <Header />
            {
                isLoading ?
                <div className='column-center auth-loading'>
                    <p>진료기록 작성 중</p>
                    <Box sx={{ width: '60%' }}> 
                        <LinearProgress />
                    </Box>
                </div>
                :
                <div className='body column-center'>
                <p style={{ fontSize: '30px' }}>진료기록 작성</p>
                <div className='input-container'>
                    <p className='input-title' 
                        style={{ marginBottom: '3vh' }}>기본 정보</p>
    
                    {/* 진료일자 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료일자</p>
                        </div>
                        <DatePicker 
                            className='date-picker'
                            dateFormat="yyyy/MM/dd"
                            selected={dateOfVisit} 
                            onChange={(date) => 
                                setDateOfVisit(date)}
                            />
                    </div>

                    {/* 환자명 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>환자명</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={name} 
                            onChange={(e) => 
                                setName(e.target.value)} 
                            />
                    </div>
    
                    {/* 진료 병원 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료 병원</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={hospital} 
                                onChange={(e) => 
                                    setHospital(e.target.value)} 
                            />
                    </div>
    
                    {/* 담당 의사명 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>담당 의사명</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={doctor} 
                            onChange={(e) => 
                                setDoctor(e.target.value)} 
                            />
                    </div>
    
                    {/* 현재 병력사 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>현재 병력사</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={historyOfPresentIllness} 
                            onChange={(e) => 
                                setHistoryOfPresentIllness(e.target.value)} 
                            />
                    </div>
    
                    {/* 과거 병력사 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>과거 병력사</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={pastMedicalHistory} 
                            onChange={(e) => 
                                setPastMedicalHistory(e.target.value)} 
                            />
                    </div>
    
                    {/* 약물 처방 내역 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>약물 처방 내역</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={medications} 
                            onChange={(e) => 
                                setMedications(e.target.value)} 
                            />
                    </div>
    
                    {/* 알레르기 정보 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>알레르기 정보</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={allergies} 
                            onChange={(e) => 
                                setAllergies(e.target.value)} 
                            />
                    </div>
    
                    {/* 신체검사 결과 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>신체검사 결과</p>
                        </div>
                        <input className='input-1' 
                            value={physicalExamination} 
                            onChange={(e) => 
                                setPhysicalExamination(e.target.value)} 
                            />
                    </div>
    
                    {/* 실험실 결과 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>실험실 결과</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={laboratoryResults} 
                            onChange={(e) => 
                                setLaboratoryResults(e.target.value)} 
                            />
                    </div>
    
                    {/* 방사선 판독 소견 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>방사선 판독 소견</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={radiologicalFindings} 
                            onChange={(e) => 
                                setRadiologicalFindings(e.target.value)} 
                            />
                    </div>
    
                    {/* 진단 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진단</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={diagnosis} 
                            onChange={(e) => 
                                setDiagnosis(e.target.value)} 
                            />
                    </div>
    
                    {/* 치료 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>치료</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={treatment} 
                            onChange={(e) => 
                                setTreatment(e.target.value)} 
                            />
                    </div>
    
                    {/* 처방된 약물 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>처방된 약물</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={medicationPrescribed} 
                            onChange={(e) => 
                                setMedicationPrescribed(e.target.value)} 
                            />
                    </div>
    
                    {/* 후속 조치 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>후속 조치</p>
                        </div>
                        <input 
                            className='input-1' 
                            value={followUp} 
                            onChange={(e) => 
                                setFollowUp(e.target.value)} 
                            />
                    </div>
    
                    {/* 추가 코멘트 */}
                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>추가 코멘트</p>
                        </div>
                        <textarea 
                            className='input-2' 
                            value={additionalComments} 
                            onChange={(e) => 
                                setAdditionalComments(e.target.value)} 
                            />
                    </div>

                    <div className='row-center'>
                        <button className='submit-button' 
                                onClick={handleClick}>
                            제출
                        </button>
                    </div>
                </div>
            </div>
            }
            <Footer />
        </div>
    );
}    
                    
