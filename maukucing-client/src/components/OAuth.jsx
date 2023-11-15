import axios from 'axios';
import { GoogleOAuthProvider, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const OAuthButton = () => {
    
    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                console.log(codeResponse);
                // Memanggil backend dengan token ID Google
                const {data} = await axios.post('http://localhost:3000/auth/google/callback', {
                    code: codeResponse.access_token, // Send code, not access token
                });
                // Simpan token dari server ke local storage atau state management
                localStorage.setItem('access_token', data.token);
                // navigate('/posts')
            } catch (error) {
                console.error('Login failed:', error.message);
            }
        },
        onError: (error) => {
            console.log(error)
            // console.error('Login failed:', error);
        },
        flow: 'implicit'
    });
    
    return (<><button className='flex items-center px-2'  onClick={() =>googleLogin()}><span><img  src="src/assets/google.png" className='w-14 ' alt="" /></span>Continue With Google</button></>)
}

export const GoogleButton = () => {
    const navigate = useNavigate()
    return (
    <>
    <div className='border border-black font-semibold bg-cyan-100 text-blue-400 rounded-lg w-5/6 my-4 mx-auto'>
        <GoogleOAuthProvider clientId='289498511556-10kqmsngcufrce86dlh215ogs83g7mbl.apps.googleusercontent.com'>
        <GoogleLogin
            onSuccess={ async credentialResponse => {
                
                try {
                    // console.log(credentialResponse.credential);
                    // Memanggil backend dengan token ID Google
                    const {data} = await axios.post('http://localhost:3000/auth/google/callback', {
                        code: credentialResponse.credential, // Send code, not access token
                    });
                    // Simpan token dari server ke local storage atau state management
                    console.log(data, 'kredensial');
                    localStorage.setItem('access_token', data);
                    navigate('/posts')
                } catch (error) {
                    console.error('Login failed:', error.message);
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
  useOneTap
/>;
        </GoogleOAuthProvider>
    </div>
    </>
    )
}