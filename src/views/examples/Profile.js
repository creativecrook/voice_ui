/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  return (
    <>
      {/* <UserHeader /> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div className="p-10 mt-30"><br/><br/><br/><br/><br/></div>
       <div className="card bg-primary text-white p-5 mt-10 display-2">Profile</div>
      </Container>
    </>
  );
};

export default Profile;
