import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./components/users/Login";
import UserList from "./components/users/UserList";
import { useState,useEffect } from "react";
import ReqList from "./components/users/ReqList";
import MeetSchedule from "./components/users/MeetSchedule";
import Board from "./components/users/Board";
import DistanceReq from "./components/pages/DistanceReq";
import Complete from "./components/pages/Complete";
import CreateUser from "./components/pages/CreateUser";
import ConditionsOfUse from "./components/FooterDescription/ConditionsOfUse";
import LocationServicePolicy from "./components/FooterDescription/LocationServicePolicy";
import PrivacyPolicy from "./components/FooterDescription/PrivacyPolicy";
import YouthProtectionPolicy from "./components/FooterDescription/YouthProtectionPolicy";
import Footer from "./components/Footer";
import address from './API_KEY'
import axios from 'axios';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, [setUser]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${address.backendaddress}/logout`, null, { withCredentials: true });
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


  return (
    <div style={{ minHeight: '100vh' }}> 
      <Header user={user} handleLogout={handleLogout}/>
      <Container style={{ minHeight: 'calc(100vh - 280px)' }}>
        <Route path="/users" exact render={() => <UserList loggedInUser={loggedInUser} />} />
        <Route path="/login" exact render={() => <Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/req_list" component={ReqList} />
        <Route path="/schedule" component={MeetSchedule} />
        <Route path="/board" component={Board} />
        <Route path="/distanceReq" exact render={() => <DistanceReq user={user} />} />
        <Route path="/createUser" exact component={CreateUser}/>
        <Route path="/complete" exact component={Complete}/>
        <Route path="/ConditionsOfUse" exact component={ConditionsOfUse}/>
        <Route path="/LocationServicePolicy" exact component={LocationServicePolicy}/>
        <Route path="/PrivacyPolicy" exact component={PrivacyPolicy}/>
        <Route path="/YouthProtectionPolicy" exact component={YouthProtectionPolicy}/>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
