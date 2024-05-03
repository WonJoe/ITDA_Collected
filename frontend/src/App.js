import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./components/users/Login";
import UserList from "./components/users/UserList";
import { useState } from "react";
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

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div> 
      <Header/>
      <Container>
        <Route path="/users" exact render={() => <UserList loggedInUser={loggedInUser} />} />
        <Route path="/login" exact render={() => <Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/req_list" component={ReqList} />
        <Route path="/schedule" component={MeetSchedule} />
        <Route path="/board" component={Board} />
        <Route path="/distanceReq" exact component={DistanceReq}/>
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
