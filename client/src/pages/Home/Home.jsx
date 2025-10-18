import './Home.css'
import homeImg from '../../assets/logo5.png'

function Home(){
    return(
        <div className='Home_container'>
             <h1>Home Page</h1>
             <img src={homeImg} alt="" />
        </div>
    )
}

export default Home;