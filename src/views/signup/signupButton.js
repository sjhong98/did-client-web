import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignUpButton(props) {
    const navigate = useNavigate();
    const serverIP = process.env.REACT_APP_SERVER_IP_ADDRESS;

    const handleClick = () => {
        if(!props.name)
          props.setNull('name');
        else if(props.email === '@')
          props.setNull('email');
        else if(!props.birthday)
          props.setNull('birthday');
        else if(!props.phoneNumber)
          props.setNull('phoneNumber');
        else {
          props.setIsLoading(true);
          const userInfo = {
              name: props.name,
              email: props.email,
              birthday: props.birthday,
              phoneNumber: props.phoneNumber,
              isDoctor: props.isDoctor
            }
            axios.post(`http://${serverIP}:5001/user/signup`, userInfo)
              .then(res => {
                console.log(res);
                localStorage.setItem("dmrs-did", res.data.did);
                localStorage.setItem("dmrs-jwt", res.data.jwt);   // jwt 로컬스토리지에 저장
                sessionStorage.setItem("dmrs-login", true);
                props.setIsLoading(false);
                navigate('/');
              })
              .catch(err => console.log(err));
        }
    }

  return (
      <Button variant="outlined"  
        sx={{width: '20vw'}}
        onClick={() => {
        handleClick();
      }}>가입</Button>
  );
}