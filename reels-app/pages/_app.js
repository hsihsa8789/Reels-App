import '@/styles/globals.css'
import './signup/signup.css';
import './login/login.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import '../components/Feed.css';
import AuthWrapper from '../context/auth';

export default function App({ Component, pageProps }) {

  return(
    <AuthWrapper>
       <Component {...pageProps} />
    </AuthWrapper>
  )
  
}
